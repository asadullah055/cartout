"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { paymentRequest, startBkashPayment } from "@/utils/payment";
import AdvancePaymentNotice from "@/components/checkout/AdvancePaymentNotice";

const ORDER_STORAGE_KEY = "pinwheel_last_order";

const formatDate = (value) => {
  if (!value) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const formatDeliveryAddress = (address) => {
  if (!address) return "Address not available";

  if (address.fullAddress) {
    return address.fullAddress;
  }

  if (address.division || address.district || address.upazila || address.area) {
    return [
      address.street,
      address.area,
      address.upazila,
      address.district,
      address.division,
      address.country,
    ]
      .filter(Boolean)
      .join(", ");
  }

  const formattedAddress = [
    address.street,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");

  return formattedAddress || "Address not available";
};

const OrderSuccessPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const rawOrder = window.sessionStorage.getItem(ORDER_STORAGE_KEY);
        const saved = rawOrder ? JSON.parse(rawOrder) : null;
        const id = params.get("orderId") || saved?.order?._id;
        const token = params.get("token") || saved?.order?.invoiceAccessToken;
        if (active) {
          setOrderData(saved);
          setFeedback(window.sessionStorage.getItem("pinwheel_payment_feedback") || "");
        }
        window.sessionStorage.removeItem("pinwheel_payment_feedback");
        if (id && token) {
          // Persist return credentials before clearing the URL so a refresh can recover.
          const pending = saved?.order?._id === id ? saved : { order: { _id: id, invoiceAccessToken: token } };
          if (active) setOrderData(pending);
          window.sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(pending));
          window.history.replaceState(null, "", window.location.pathname);
          const data = await paymentRequest(`${id}/payment-status`, { token });
          const updated = { ...pending, order: data.order };
          window.sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updated));
          if (active) setOrderData(updated);
        }
      } catch (error) { if (active) setFeedback(error.message); }
      finally { if (active) setIsChecking(false); }
    };
    load();
    return () => { active = false; };
  }, []);

  const order = orderData?.order;
  const isBkash = order?.paymentMethod === "bKash";
  const isAwaitingPayment = isBkash && !Number(order?.paidAmount);
  const paidAmount = Number(order?.paidAmount || 0);
  const needsManualAdvance = order?.paymentMethod === "Cash on Delivery" && order?.status === "Pending" && paidAmount < 100;
  const refreshPayment = async () => {
    setIsChecking(true);
    setFeedback("");
    try {
      const data = await paymentRequest(`${order._id}/payment-status`, { token: order.invoiceAccessToken });
      const updated = { ...orderData, order: data.order };
      window.sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updated));
      setOrderData(updated);
      if (!data.order.paidAmount) setFeedback("Payment has not been confirmed yet. You can continue payment or check again.");
    } catch (error) { setFeedback(error.message); }
    finally { setIsChecking(false); }
  };
  const continuePayment = async () => {
    setIsPaying(true);
    setFeedback("");
    try {
      const data = await startBkashPayment(order);
      if (data.checkoutUrl) window.location.assign(data.checkoutUrl);
      else if (data.order) {
        const updated = { ...orderData, order: data.order };
        window.sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updated));
        setOrderData(updated);
      }
    } catch (error) { setFeedback(error.message); }
    finally { setIsPaying(false); }
  };
  const fallbackItems = useMemo(() => orderData?.orderedItems || [], [orderData?.orderedItems]);
  const orderItems = order?.items?.length ? order.items : fallbackItems;

  const subtotal = useMemo(() => {
    if (typeof order?.totalAmount === "number") return order.totalAmount;
    if (typeof orderData?.subtotal === "number") return orderData.subtotal;

    return fallbackItems.reduce(
      (sum, item) => sum + Number(item.unitPrice || 0) * Number(item.quantity || 0),
      0
    );
  }, [fallbackItems, order?.totalAmount, orderData?.subtotal]);

  const shippingFee =
    typeof order?.shippingFee === "number" ? order.shippingFee : orderData?.shippingFee || 0;
  const totalPayment =
    typeof order?.payableAmount === "number" ? order.payableAmount : subtotal + shippingFee;
  const totalItems =
    orderData?.totalItems ||
    orderItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const invoiceUrl = useMemo(() => {
    if (!order?._id || !process.env.NEXT_PUBLIC_API_URL) return "";

    const token = order.invoiceAccessToken
      ? `?token=${encodeURIComponent(order.invoiceAccessToken)}`
      : "";

    return `${process.env.NEXT_PUBLIC_API_URL}/order/${order._id}/invoice${token}`;
  }, [order?._id, order?.invoiceAccessToken]);

  if (!orderData || !order?.paymentMethod) {
    return (
      <main className="bg-gray-100 px-3 py-10">
        <section className="mx-auto max-w-[720px] rounded bg-white p-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900">{isChecking ? "Checking your order..." : order?._id ? "Unable to load your order" : "No recent order found"}</h1>
          <p className="mt-2 text-sm text-gray-600">
            {feedback || "Place an order first to see the order confirmation details."}
          </p>
          {order?._id && !isChecking && <button type="button" onClick={() => window.location.reload()} className="mt-4 rounded border border-gray-300 px-4 py-2 text-sm font-semibold">Check Order Again</button>}
          <Link
            href="/"
            className="mt-5 inline-flex rounded bg-[#ff3300] px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 px-3 py-6">
      <section className="mx-auto max-w-[980px] rounded bg-white p-4 md:p-6">
        <div className="flex flex-col items-center border-b border-gray-200 pb-5 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
            <FaCheck size={24} />
          </span>
          <h1 className="mt-3 text-2xl font-semibold text-gray-900">
            {isAwaitingPayment ? "Complete your bKash payment" : needsManualAdvance ? "Your order has been received" : "Welcome to Cartout"}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {isAwaitingPayment ? "Your order is saved and is awaiting payment confirmation." : needsManualAdvance ? "Please complete the advance payment below to confirm your order." : "Your order has been placed successfully."}
          </p>
        </div>

        <div className="grid gap-4 border-b border-gray-200 py-5 md:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Order Number</p>
            <p className="mt-1 font-semibold text-gray-900">
              #{order?.orderNumber || order?._id?.slice(-8) || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Order Date</p>
            <p className="mt-1 font-semibold text-gray-900">{formatDate(order?.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Payment Method</p>
            <p className="mt-1 font-semibold text-gray-900">
              {order?.paymentMethod || "Cash on Delivery"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Status</p>
            <p className="mt-1 font-semibold text-[#ff3300]">{order?.status || "Pending"}</p>
          </div>
        </div>

        <div className="grid gap-5 py-5 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Order Details</h2>
            <div className="space-y-3">
              {orderItems.map((item, index) => {
                const product = item.product || {};
                const name = product.productName || item.name || "Product";
                const image = product.images?.[0] || item.image || "/images/001.jpg";
                const price = item.price || item.unitPrice || 0;

                return (
                  <div
                    className="flex gap-3 rounded border border-gray-200 p-3"
                    key={item._id || item.id || index}
                  >
                    <Image
                      src={image}
                      alt={name}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold text-gray-900">{name}</p>
                      <p className="mt-1 text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="mt-1 text-xs font-semibold text-[#ff3300]">
                        Status: {item.status || order?.status || "Pending"}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">Tk {price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="rounded border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900">Payment Summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-semibold">Tk {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="font-semibold">Tk {shippingFee}</span>
              </div>
              <div className="border-t border-dashed pt-3">
                <div className="flex justify-between text-base font-semibold">
                  <span>Total Payment</span>
                  <span className="text-[#ff3300]">Tk {totalPayment}</span>
                </div>
              </div>
              <div className="flex justify-between"><span>Payment status</span><span className="font-semibold">{order?.paymentStatus || "Pending"}</span></div>
              {isBkash && <>
                <div className="flex justify-between"><span>Payment plan</span><span>{order.paymentPlan === "Advance" ? "Advance Payment" : "Full Payment"}</span></div>
                <div className="flex justify-between"><span>Paid with bKash</span><span>Tk {paidAmount}</span></div>
                {isAwaitingPayment && <div className="flex justify-between font-semibold text-[#e2136e]"><span>bKash payment required</span><span>Tk {order.paymentAmount}</span></div>}
                <div className="flex justify-between"><span>{isAwaitingPayment ? "On delivery after payment" : "Due on delivery"}</span><span>Tk {Math.max(totalPayment - (isAwaitingPayment ? order.paymentAmount : paidAmount), 0)}</span></div>
                {order.bkash?.transactionId && <p className="break-all text-xs text-gray-600">Transaction ID: {order.bkash.transactionId}</p>}
              </>}
            </div>

            {needsManualAdvance && <div className="mt-4"><AdvancePaymentNotice /></div>}

            {isAwaitingPayment && order.status === "Awaiting Payment" && (
              <div className="mt-4 space-y-2">
                <button type="button" onClick={continuePayment} disabled={isPaying || isChecking} className="w-full rounded bg-[#e2136e] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">{isPaying ? "Opening bKash..." : `Continue bKash Payment — Tk ${order.paymentAmount}`}</button>
                <button type="button" onClick={refreshPayment} disabled={isPaying || isChecking} className="w-full rounded border border-gray-300 px-4 py-2 text-sm font-semibold disabled:opacity-50">{isChecking ? "Checking..." : "Check Payment Status"}</button>
                <p className="text-xs text-gray-500">If money was deducted, check payment status before trying again.</p>
              </div>
            )}
            {feedback && <p role="status" className="mt-3 text-sm text-amber-800">{feedback}</p>}

            <div className="mt-5 rounded bg-gray-50 p-3 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Delivery Address</p>
              <p className="mt-1">{formatDeliveryAddress(order?.shippingAddress)}</p>
            </div>

            <Link
              href="/"
              className="mt-5 block rounded bg-[#ff3300] px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-orange-600"
            >
              Continue Shopping
            </Link>
            {invoiceUrl ? (
              <a
                href={invoiceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block rounded border border-[#ff3300] px-5 py-2.5 text-center text-sm font-semibold text-[#ff3300] hover:bg-orange-50"
              >
                View Invoice
              </a>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
};

export default OrderSuccessPage;
