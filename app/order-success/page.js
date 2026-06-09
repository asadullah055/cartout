"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa6";

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

  return [
    address.street,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
};

const OrderSuccessPage = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    try {
      const rawOrder = window.sessionStorage.getItem(ORDER_STORAGE_KEY);
      setOrderData(rawOrder ? JSON.parse(rawOrder) : null);
    } catch {
      setOrderData(null);
    }
  }, []);

  const order = orderData?.order;
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

  if (!orderData) {
    return (
      <main className="bg-gray-100 px-3 py-10">
        <section className="mx-auto max-w-[720px] rounded bg-white p-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900">No recent order found</h1>
          <p className="mt-2 text-sm text-gray-600">
            Place an order first to see the order confirmation details.
          </p>
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
            Welcome to Cartout
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Your order has been placed successfully.
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
            <p className="mt-1 font-semibold text-[#ff3300]">Product wise</p>
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
            </div>

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
          </aside>
        </div>
      </section>
    </main>
  );
};

export default OrderSuccessPage;
