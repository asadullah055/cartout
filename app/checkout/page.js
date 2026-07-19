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

const ADDRESS_STORAGE_KEY = "pinwheel_delivery_addresses";

const isDhakaAddress = (address) =>
  String(address?.shippingAddress?.district || address?.shippingAddress?.city || "")
    .trim()
    .toLowerCase() === "dhaka";

const CheckOutPage = () => {
  const router = useRouter();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [editingAddressId, setEditingAddressId] = useState("");
  const [isBuyNowCheckout, setIsBuyNowCheckout] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderFeedback, setOrderFeedback] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const shouldUseBuyNow = searchParams.get("buyNow") === "1";
    const buyNowItem = shouldUseBuyNow ? readBuyNowItem() : null;

    setIsBuyNowCheckout(Boolean(buyNowItem));
    setCartItems(buyNowItem ? [buyNowItem] : readCart());

    try {
      const savedAddresses = JSON.parse(
        window.localStorage.getItem(ADDRESS_STORAGE_KEY) || "[]"
      );

      if (Array.isArray(savedAddresses)) {
        setAddresses(savedAddresses);
        setSelectedAddressId(
          savedAddresses.find((address) => address.isDefault)?.id ||
            savedAddresses[0]?.id ||
            ""
        );
      }
    } catch {
      setAddresses([]);
      setSelectedAddressId("");
    }

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
  const selectedAddress = useMemo(
    () => addresses.find((address) => address.id === selectedAddressId),
    [addresses, selectedAddressId]
  );
  const shippingFee = useMemo(() => {
    if (totalItems === 0) return 0;

    const chargeKey = isDhakaAddress(selectedAddress)
      ? "insideDhaka"
      : "outsideDhaka";
    const fallback = chargeKey === "insideDhaka" ? 80 : 120;

    return cartItems.reduce((highestCharge, item) => {
      const itemCharge = Number(item.shippingCharge?.[chargeKey] ?? fallback);
      return Number.isFinite(itemCharge)
        ? Math.max(highestCharge, itemCharge)
        : highestCharge;
    }, 0);
  }, [cartItems, selectedAddress, totalItems]);
  const editingAddress = useMemo(
    () => addresses.find((address) => address.id === editingAddressId) || null,
    [addresses, editingAddressId]
  );

  const persistAddresses = (nextAddresses) => {
    window.localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(nextAddresses));
  };

  const handleSaveAddress = (address) => {
    setAddresses((currentAddresses) => {
      const isExistingAddress = currentAddresses.some(
        (currentAddress) => currentAddress.id === address.id
      );
      const shouldSetDefault = address.isDefault || currentAddresses.length === 0;
      let nextAddresses = isExistingAddress
        ? currentAddresses.map((currentAddress) => {
            if (currentAddress.id === address.id) {
              return {
                ...address,
                isDefault: shouldSetDefault,
              };
            }

            return {
              ...currentAddress,
              isDefault: shouldSetDefault ? false : currentAddress.isDefault,
            };
          })
        : [
            ...currentAddresses.map((currentAddress) => ({
              ...currentAddress,
              isDefault: shouldSetDefault ? false : currentAddress.isDefault,
            })),
            {
              ...address,
              isDefault: shouldSetDefault,
            },
          ];

      if (nextAddresses.length && !nextAddresses.some((nextAddress) => nextAddress.isDefault)) {
        nextAddresses = nextAddresses.map((nextAddress, index) => ({
          ...nextAddress,
          isDefault: index === 0,
        }));
      }

      persistAddresses(nextAddresses);
      return nextAddresses;
    });
    setSelectedAddressId(address.id);
    setEditingAddressId("");
    setIsAddressModalOpen(false);
  };

  const handleAddAddressClick = () => {
    setEditingAddressId("");
    setIsAddressModalOpen(true);
  };

  const handleEditAddress = (addressId) => {
    setEditingAddressId(addressId);
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setEditingAddressId("");
    setIsAddressModalOpen(false);
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses((currentAddresses) => {
      const nextAddresses = currentAddresses.filter((address) => address.id !== addressId);
      const normalizedAddresses =
        nextAddresses.length && !nextAddresses.some((address) => address.isDefault)
          ? nextAddresses.map((address, index) => ({
              ...address,
              isDefault: index === 0,
            }))
          : nextAddresses;

      persistAddresses(normalizedAddresses);

      if (selectedAddressId === addressId) {
        setSelectedAddressId(normalizedAddresses[0]?.id || "");
      }

      return normalizedAddresses;
    });
  };

  const handlePlaceOrder = async () => {
    if (!cartItems.length || isPlacingOrder) return;

    if (!selectedAddress) {
      setOrderFeedback("Please add and select a delivery address.");
      return;
    }

    const hasInvalidItems = cartItems.some((item) => !item.productId);
    if (hasInvalidItems) {
      setOrderFeedback("Some cart items are invalid. Please add products again.");
      return;
    }

    setIsPlacingOrder(true);
    setOrderFeedback("");

    try {
      const customerPhone = selectedAddress.mobileNumber.startsWith("0")
        ? selectedAddress.mobileNumber
        : `0${selectedAddress.mobileNumber}`;
      const payload = {
        items: cartItems.map((item) => ({
          product: item.productId,
          variant: item.variantId,
          quantity: item.quantity,
        })),
        shippingFee,
        shippingAddress: selectedAddress.shippingAddress,
        paymentMethod: "Cash on Delivery",
        customer: {
          name: selectedAddress.contactName,
          phone: customerPhone,
          email: selectedAddress.email || null,
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
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col p-0 lg:flex-row xl:gap-[16px]">
          <div className="w-full">
            <DeliveryAddressSection
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onAddAddressClick={handleAddAddressClick}
              onSelectAddress={setSelectedAddressId}
              onDeleteAddress={handleDeleteAddress}
              onEditAddress={handleEditAddress}
            />
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
      <AddAddress
        isOpen={isAddressModalOpen}
        onClose={handleCloseAddressModal}
        onSave={handleSaveAddress}
        editingAddress={editingAddress}
      />
    </div>
  );
};

export default CheckOutPage;
