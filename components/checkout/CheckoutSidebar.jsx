import Link from "next/link";
import { FaArrowRight, FaGear, FaRegClipboard } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import PaymentOptions from "./PaymentOptions";

const CheckoutSidebar = ({
  subtotal,
  shippingFee,
  totalItems,
  onPlaceOrder,
  isPlacingOrder,
  orderFeedback,
  hasStockIssue = false,
  paymentMethod,
  paymentPlan,
  onMethodChange,
  onPlanChange,
  bkashAvailable,
}) => {
  const totalPayment = subtotal + shippingFee;

  return (
    <aside className="h-fit rounded-xl bg-white px-5 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] lg:sticky lg:top-5">
      <div className="flex items-center gap-2.5 border-b border-[#e5e7eb] pb-4">
        <FaRegClipboard className="text-xl text-[#1f2937]" />
        <h3 className="text-lg font-semibold text-[#111827]">Order Summary</h3>
      </div>

      <div className="space-y-4 py-5">
        <div className="flex items-center justify-between gap-4 text-sm font-medium text-[#1f2937]">
          <span>Product Price:</span>
          <span>Tk {subtotal}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm font-medium text-[#1f2937]">
          <span>Delivery Charge:</span>
          <span>Tk {shippingFee}</span>
        </div>
      </div>

      <div className="border-b border-dashed border-[#cfd4dc]"></div>

      <div className="flex items-center justify-between gap-4 py-5 text-sm font-semibold">
        <span className="text-[#1f2937]">Total Payment:</span>
        <span className="text-lg text-[#ff3300]">Tk {totalPayment}</span>
      </div>

      <div className="mb-3 flex items-center gap-2.5">
        <FaGear className="text-lg text-[#111827]" />
        <p className="text-sm font-semibold text-[#1f2937]">Have a Cartout Coupon?</p>
      </div>

      <form className="mb-5 flex items-center gap-2.5">
        <input
          className="h-10 min-w-0 flex-1 rounded-md border border-[#d0d5dd] bg-white px-3 text-[13px] font-medium text-[#475467] outline-none placeholder:text-[#b7bec8]"
          required
          placeholder="Promo / Coupon Code"
          type="text"
          defaultValue=""
        />
        <button
          aria-label="Apply"
          className="h-10 w-20 rounded-md bg-[#ff3300] text-[13px] font-semibold text-white hover:bg-orange-600"
          type="button"
        >
          Apply
        </button>
      </form>

      <PaymentOptions
        paymentMethod={paymentMethod} paymentPlan={paymentPlan}
        onMethodChange={onMethodChange} onPlanChange={onPlanChange}
        total={totalPayment} bkashAvailable={bkashAvailable} disabled={isPlacingOrder}
      />

      <div className="flex items-start gap-2.5">
        <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#8b5cf6] bg-[#ede9fe] text-[#7c3aed]">
          <IoCheckmark size={15} />
        </span>

        <p className="text-xs font-medium leading-[18px] text-[#667085]">
          I agree to the{" "}
          <Link className="font-semibold text-[#175cd3] no-underline" href="/content/terms-and-conditions">
            Terms &amp; Conditions,
          </Link>{" "}
          <Link className="font-semibold text-[#175cd3] no-underline" href="/content/privacy-policy">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link className="font-semibold text-[#175cd3] no-underline" href="/content/returns-and-refunds">
            Return &amp; Refund Policy
          </Link>{" "}
          of Cartout
        </p>
      </div>

      <button
        aria-label="Place Order"
        className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#ff3300] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(255,51,0,0.18)] hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
        onClick={onPlaceOrder}
        disabled={!totalItems || isPlacingOrder || hasStockIssue || (paymentMethod === "bKash" && (!bkashAvailable || (paymentPlan === "Advance" && totalPayment < 100)))}
      >
        {isPlacingOrder ? "Please wait..." : paymentMethod === "bKash" ? `Pay Tk ${paymentPlan === "Advance" ? 100 : totalPayment} with bKash` : `Place Order (${totalItems})`}
        <FaArrowRight className="shrink-0 text-sm" />
      </button>

      {orderFeedback ? (
        <p className="mt-3 text-center text-xs font-medium text-[#667085]">{orderFeedback}</p>
      ) : null}
    </aside>
  );
};

export default CheckoutSidebar;
