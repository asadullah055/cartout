"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AddAddress from "@/components/checkout/AddAddress";
import CheckoutOrderItems from "@/components/checkout/CheckoutOrderItems";
import CheckoutSidebar from "@/components/checkout/CheckoutSidebar";
import DeliveryAddressSection from "@/components/checkout/DeliveryAddressSection";
import { paymentRequest, startBkashPayment } from "@/utils/payment";
import {
  cartEventName,
  calculateShippingFeeBySeller,
  clearBuyNowItem,
  readBuyNowItem,
  readCart,
  refreshCartShopNames,
  writeCart,
} from "@/utils/cart";

const ADDRESS_STORAGE_KEY = "pinwheel_delivery_addresses";

const isDhakaAddress = (address) =>
  String(
    address?.shippingAddress?.fullAddress ||
      address?.fullAddress ||
      address?.displayAddress ||
      address?.shippingAddress?.district ||
      address?.shippingAddress?.city ||
      ""
  )
    .trim()
    .toLowerCase()
    .includes("dhaka");

const getStockIssue = (items) => {
  const item = items.find((entry) => {
    const maxStock = Number(entry?.maxStock);
    return Number.isFinite(maxStock) && Number(entry.quantity || 0) > maxStock;
  });

  if (!item) return "";

  const maxStock = Number(item.maxStock);
  if (maxStock <= 0) {
    return `${item.name || "This product"} is out of stock.`;
  }

  return `${item.name || "This product"} has only ${maxStock} items in stock.`;
};

const CheckOutPage = () => {
  const router = useRouter();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const hasPlacedOrder = useRef(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [editingAddressId, setEditingAddressId] = useState("");
  const [isBuyNowCheckout, setIsBuyNowCheckout] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderFeedback, setOrderFeedback] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [paymentPlan, setPaymentPlan] = useState("Full");
  const [bkashAvailable, setBkashAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    paymentRequest("payment-options").then((data) => { if (active) setBkashAvailable(Boolean(data.bkash?.enabled)); }).catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    const searchParams = new URLSearchParams(window.location.search);
    const shouldUseBuyNow = searchParams.get("buyNow") === "1";
    const buyNowItem = shouldUseBuyNow ? readBuyNowItem() : null;

    const initialCartItems = buyNowItem ? [buyNowItem] : readCart();

    setIsBuyNowCheckout(Boolean(buyNowItem));
    setCartItems(initialCartItems);
    setIsCartLoaded(true);
    const readCheckoutItems = () => {
      if (!buyNowItem) return readCart();
      const currentBuyNowItem = readBuyNowItem();
      return currentBuyNowItem ? [currentBuyNowItem] : [];
    };
    const initialSnapshot = JSON.stringify(initialCartItems);
    refreshCartShopNames(initialCartItems, {
      persist: false,
    }).then((items) => {
      if (!active || JSON.stringify(readCheckoutItems()) !== initialSnapshot) return;
      if (!buyNowItem && JSON.stringify(items) !== initialSnapshot) writeCart(items);
      setCartItems(items);
    });

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
      setCartItems(readCheckoutItems());
    };
    window.addEventListener(cartEventName, syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      active = false;
      window.removeEventListener(cartEventName, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  useEffect(() => {
    // Successful orders clear the cart before navigating to their confirmation.
    if (isCartLoaded && cartItems.length === 0 && !isPlacingOrder && !hasPlacedOrder.current) {
      router.replace("/");
    }
  }, [isCartLoaded, cartItems.length, isPlacingOrder, router]);

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
    return calculateShippingFeeBySeller(cartItems, chargeKey);
  }, [cartItems, selectedAddress, totalItems]);
  const editingAddress = useMemo(
    () => addresses.find((address) => address.id === editingAddressId) || null,
    [addresses, editingAddressId]
  );
  const stockIssue = useMemo(() => getStockIssue(cartItems), [cartItems]);

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

    if (stockIssue) {
      setOrderFeedback(stockIssue);
      return;
    }

    if (!selectedAddress) {
      setOrderFeedback("Please add and select a delivery address.");
      return;
    }
    if (paymentMethod === "bKash" && (!bkashAvailable || (paymentPlan === "Advance" && subtotal + shippingFee < 100))) {
      setOrderFeedback("Please choose an available payment option.");
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
      const fullDeliveryAddress =
        selectedAddress.fullAddress ||
        selectedAddress.displayAddress ||
        selectedAddress.street ||
        selectedAddress.shippingAddress?.fullAddress ||
        selectedAddress.shippingAddress?.street ||
        "";
      const payload = {
        items: cartItems.map((item) => ({
          product: item.productId,
          variant: item.variantId,
          quantity: item.quantity,
        })),
        shippingFee,
        shippingAddress: {
          fullAddress: fullDeliveryAddress,
        },
        paymentMethod,
        paymentPlan: paymentMethod === "bKash" ? paymentPlan : "COD",
        ...(paymentMethod === "bKash" ? { expectedTotal: subtotal + shippingFee } : {}),
        customer: {
          name: selectedAddress.contactName,
          phone: customerPhone,
          email: selectedAddress.email || null,
        },
      };
      // Reuse this random key if the order response is lost, including after a reload.
      const fingerprint = JSON.stringify(payload);
      let previousRequest;
      try { previousRequest = JSON.parse(window.sessionStorage.getItem("pinwheel_checkout_request") || "null"); } catch { /* New request below. */ }
      const reuse = previousRequest?.fingerprint === fingerprint && /^[a-f\d]{64}$/.test(previousRequest?.secret || "");
      payload.checkoutRequestId = reuse ? previousRequest.id : crypto.randomUUID();
      payload.checkoutAccessToken = reuse ? previousRequest.secret : Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("");
      window.sessionStorage.setItem("pinwheel_checkout_request", JSON.stringify({ fingerprint, id: payload.checkoutRequestId, secret: payload.checkoutAccessToken }));

      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://pinwheel-server.vercel.app/api";
      const response = await fetch(`${apiBaseUrl}/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "Failed to place order");
      }
      if (!data.order?._id || !data.order?.invoiceAccessToken) throw new Error("Unable to confirm the order. Please try again.");

      hasPlacedOrder.current = true;
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
      window.sessionStorage.removeItem("pinwheel_checkout_request");
      if (paymentMethod === "bKash") {
        try {
          const payment = await startBkashPayment(data.order);
          if (payment.checkoutUrl) {
            window.location.assign(payment.checkoutUrl);
            return;
          }
        } catch (error) {
          window.sessionStorage.setItem("pinwheel_payment_feedback", error.message);
        }
      }
      router.push("/order-success");
    } catch (error) {
      setOrderFeedback(error.message || "Failed to place order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!isCartLoaded || cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-[#eef1f5] px-3 py-4 sm:px-5 lg:py-5">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="flex min-w-0 flex-col gap-5">
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
          orderFeedback={orderFeedback || stockIssue}
          hasStockIssue={Boolean(stockIssue)}
          paymentMethod={paymentMethod} paymentPlan={paymentPlan}
          onMethodChange={setPaymentMethod} onPlanChange={setPaymentPlan}
          bkashAvailable={bkashAvailable}
        />
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
