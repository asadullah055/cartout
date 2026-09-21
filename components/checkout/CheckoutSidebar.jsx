import Link from "next/link";
import { FaArrowRight, FaGear, FaRegClipboard } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";

const CheckoutSidebar = ({
  subtotal,
  shippingFee,
  totalItems,
  onPlaceOrder,
  isPlacingOrder,
  orderFeedback,
  hasStockIssue = false,
}) => {
  const totalPayment = subtotal + shippingFee;

  return (
    <aside className="h-fit rounded-xl bg-white px-5 py-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)] lg:sticky lg:top-5">
      <div className="flex items-center gap-3 border-b border-[#e5e7eb] pb-5">
        <FaRegClipboard className="text-[24px] text-[#1f2937]" />
        <h3 className="text-xl font-bold text-[#111827]">Order Summary</h3>
      </div>

      <div className="space-y-5 py-6">
        <div className="flex items-center justify-between gap-4 text-base font-semibold text-[#1f2937]">
          <span>Product Price:</span>
          <span>Tk {subtotal}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-base font-semibold text-[#1f2937]">
          <span>Delivery Charge:</span>
          <span>Tk {shippingFee}</span>
        </div>
      </div>

      <div className="border-b border-dashed border-[#cfd4dc]"></div>

      <div className="flex items-center justify-between gap-4 py-6 text-base font-bold">
        <span className="text-[#1f2937]">Total Payment:</span>
        <span className="text-xl text-[#ff3300]">Tk {totalPayment}</span>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <FaGear className="text-[22px] text-[#111827]" />
        <p className="text-base font-bold text-[#1f2937]">Have a Cartout Coupon?</p>
      </div>

      <form className="mb-5 flex items-center gap-3">
        <input
          className="h-11 min-w-0 flex-1 rounded-md border border-[#d0d5dd] bg-white px-4 text-sm font-medium text-[#475467] outline-none placeholder:text-[#b7bec8]"
          required
          placeholder="Promo / Coupon Code"
          type="text"
          defaultValue=""
        />
        <button
          aria-label="Apply"
          className="h-11 w-[96px] rounded-md bg-[#ff3300] text-sm font-bold text-white hover:bg-orange-600"
          type="button"
        >
          Apply
        </button>
      </form>

      <div className="flex items-start gap-3">
        <span className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#8b5cf6] bg-[#ede9fe] text-[#7c3aed]">
          <IoCheckmark size={18} />
        </span>

        <p className="text-sm font-medium leading-5 text-[#667085]">
          I agree to the{" "}
          <Link className="font-bold text-[#175cd3] no-underline" href="/content/terms-and-conditions">
            Terms &amp; Conditions,
          </Link>{" "}
          <Link className="font-bold text-[#175cd3] no-underline" href="/content/privacy-policy">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link className="font-bold text-[#175cd3] no-underline" href="/content/returns-and-refunds">
            Return &amp; Refund Policy
          </Link>{" "}
          of Cartout
        </p>
      </div>

      <button
        aria-label="Place Order"
        className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#ff3300] text-lg font-bold text-white shadow-[0_10px_24px_rgba(255,51,0,0.28)] hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
        onClick={onPlaceOrder}
        disabled={!totalItems || isPlacingOrder || hasStockIssue}
      >
        {isPlacingOrder ? "Placing..." : `Place Order (${totalItems})`}
        <FaArrowRight className="text-base" />
      </button>

      {orderFeedback ? (
        <p className="mt-3 text-center text-xs font-medium text-[#667085]">{orderFeedback}</p>
      ) : null}
    </aside>
  );
};

export default CheckoutSidebar;
