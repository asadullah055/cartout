import Image from "next/image";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const CheckoutItem = ({ item }) => {
  const rowTotal = item.unitPrice * item.quantity;
  const shopName = item.shopName || item.sellerName || "Cartout Retailer";
  const maxStock = Number(item.maxStock);
  const hasStockLimit = Number.isFinite(maxStock);
  const isOutOfStock = hasStockLimit && maxStock <= 0;
  const isOverStock =
    hasStockLimit && maxStock > 0 && Number(item.quantity || 0) > maxStock;

  return (
    <div className="grid grid-cols-1 gap-4 border-b border-[#e5e7eb] py-4 last:border-b-0 sm:grid-cols-12 sm:items-center">
      <div className="sm:col-span-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-[#f1f1f1] bg-white sm:h-[72px] sm:w-[72px]">
            <Image
              width={400}
              height={400}
              alt={item.name}
              className="h-full w-full object-contain p-1"
              src={item.image || "/images/001.jpg"}
            />
          </div>
          <div className="min-w-0">
            <Link
              className="line-clamp-2 text-sm font-medium leading-5 text-[#1f2937] hover:text-[#ff3300] sm:text-base"
              href="#"
            >
              {item.name}
            </Link>
            {(item.color || item.size) && (
              <p className="mt-1 text-xs font-medium text-[#98a2b3]">
                {item.color ? `Color: ${item.color}` : ""}{" "}
                {item.size ? `Size: ${item.size}` : ""}
              </p>
            )}
            {isOutOfStock ? (
              <p className="mt-1 text-xs font-semibold text-red-600">Out of stock</p>
            ) : isOverStock ? (
              <p className="mt-1 text-xs font-semibold text-red-600">
                Only {maxStock} left in stock
              </p>
            ) : null}
            <Link
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#344054]"
              href="#"
            >
              {shopName}
              <IoIosArrowForward />
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden text-base font-semibold text-[#1f2937] sm:col-span-2 sm:block">
        Tk {item.unitPrice}
      </div>
      <div className="hidden text-base font-medium text-[#1f2937] sm:col-span-2 sm:block">
        {item.quantity}
      </div>
      <div className="hidden text-right text-base font-bold text-[#111827] sm:col-span-2 sm:block">
        Tk {rowTotal}
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-md bg-[#f9fafb] px-3 py-2 text-sm sm:hidden">
        <div>
          <p className="text-xs font-medium text-[#667085]">Price</p>
          <p className="font-semibold text-[#111827]">Tk {item.unitPrice}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-[#667085]">QTY</p>
          <p className="font-semibold text-[#111827]">{item.quantity}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-[#667085]">Total</p>
          <p className="font-bold text-[#111827]">Tk {rowTotal}</p>
        </div>
      </div>
    </div>
  );
};

const CheckoutOrderItems = ({ cartItems }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="rounded-xl bg-white px-4 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:px-7 sm:py-6">
      <div className="mb-5 flex items-center gap-3">
        <FaCartShopping className="text-[28px] text-[#ff3300]" />
        <h2 className="text-xl font-bold text-[#111827]">
          Order summary - {totalItems} {totalItems === 1 ? "item" : "items"}
        </h2>
      </div>

      <div className="hidden w-full grid-cols-12 rounded-md bg-[#fbf4dc] px-7 py-3 text-base font-bold text-[#2f3440] sm:grid">
        <p className="col-span-6">Product Details</p>
        <p className="col-span-2">Price</p>
        <p className="col-span-2">QTY</p>
        <p className="col-span-2 text-right">Total</p>
      </div>

      <div className="px-0 sm:px-4">
        {cartItems.length ? (
          cartItems.map((item) => <CheckoutItem key={item.id} item={item} />)
        ) : (
          <div className="py-10 text-center text-sm font-medium text-[#667085]">
            No items found in cart
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckoutOrderItems;
