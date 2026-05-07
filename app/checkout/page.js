"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AddAddress from "@/components/checkout/AddAddress";
import CheckoutOrderItems from "@/components/checkout/CheckoutOrderItems";
import CheckoutSidebar from "@/components/checkout/CheckoutSidebar";
import DeliveryAddressSection from "@/components/checkout/DeliveryAddressSection";
import {
  cartEventName,
  clearBuyNowItem,
  readBuyNowItem,
  readCart,
  writeCart,
} from "@/utils/cart";

const CheckOutPage = () => {
  const router = useRouter();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isBuyNowCheckout, setIsBuyNowCheckout] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderFeedback, setOrderFeedback] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const shouldUseBuyNow = searchParams.get("buyNow") === "1";
    const buyNowItem = shouldUseBuyNow ? readBuyNowItem() : null;

    setIsBuyNowCheckout(Boolean(buyNowItem));
    setCartItems(buyNowItem ? [buyNowItem] : readCart());

    const syncCart = () => {
      if (!shouldUseBuyNow) {
        setCartItems(readCart());
      }
    };
    window.addEventListener(cartEventName, syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener(cartEventName, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cartItems]
  );
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );
  const shippingFee = totalItems > 0 ? 140 : 0;

  const handlePlaceOrder = async () => {
    if (!cartItems.length || isPlacingOrder) return;

    const hasInvalidItems = cartItems.some((item) => !item.productId);
    if (hasInvalidItems) {
      setOrderFeedback("Some cart items are invalid. Please add products again.");
      return;
    }

    setIsPlacingOrder(true);
    setOrderFeedback("");

    try {
      const payload = {
        items: cartItems.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
        shippingFee,
        shippingAddress: {
          street: "Rohanpur",
          city: "Chapainawabganj",
          state: "Rajshahi",
          postalCode: "6320",
          country: "Bangladesh",
        },
        paymentMethod: "Cash on Delivery",
        customer: {
          name: "Guest Customer",
          phone: "01700000000",
          email: null,
        },
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to place order");
      }

      if (isBuyNowCheckout) {
        clearBuyNowItem();
      } else {
        writeCart([]);
      }
      setCartItems([]);
      window.sessionStorage.setItem(
        "pinwheel_last_order",
        JSON.stringify({
          order: data?.order,
          orderedItems: cartItems,
          subtotal,
          shippingFee,
          totalItems,
        })
      );
      router.push("/order-success");
    } catch (error) {
      setOrderFeedback(error.message || "Failed to place order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col p-0 lg:flex-row xl:gap-[16px]">
          <div className="w-full">
            <DeliveryAddressSection onAddAddressClick={() => setIsAddressModalOpen(true)} />
            <CheckoutOrderItems cartItems={cartItems} />
          </div>
          <CheckoutSidebar
            subtotal={subtotal}
            shippingFee={shippingFee}
            totalItems={totalItems}
            onPlaceOrder={handlePlaceOrder}
            isPlacingOrder={isPlacingOrder}
            orderFeedback={orderFeedback}
          />
        </div>
      </div>
      <AddAddress isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} />
    </div>
  );
};

export default CheckOutPage;
