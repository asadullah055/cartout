import AdvancePaymentNotice from "./AdvancePaymentNotice";

export default function PaymentOptions({ onMethodChange, disabled }) {
  /* Online bKash checkout is paused. Restore these helpers and props with the UI below:
  { paymentMethod, paymentPlan, onMethodChange, onPlanChange, total, bkashAvailable, disabled }
  const formatMoney = (value) => Number(value || 0).toLocaleString("en-BD", { maximumFractionDigits: 2 });
  const isBkash = paymentMethod === "bKash";
  const payNow = paymentPlan === "Advance" ? 100 : total;
  const choiceClass = (selected) => `flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[13px] ${selected ? "border-[#e2136e] bg-pink-50" : "border-gray-200"}`;
  */

  return (
    <fieldset className="mb-5 space-y-2.5" disabled={disabled}>
      <legend className="mb-2 text-sm font-semibold text-gray-900">Payment Method</legend>
      <label className="flex min-h-10 cursor-pointer items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[13px]">
        <input className="accent-[#ff3300]" type="radio" name="payment-method" value="Cash on Delivery" checked onChange={() => onMethodChange("Cash on Delivery")} />
        <span className="font-semibold text-gray-900">Cash on Delivery</span>
      </label>
      {/* Online bKash option retained for future use.
      <label className={choiceClass(isBkash)}>
        <input className="accent-[#e2136e]" type="radio" name="payment-method" value="bKash" checked={isBkash} onChange={() => onMethodChange("bKash")} />
        <span className="font-semibold text-[#e2136e]">bKash Payment</span>
      </label>
      {isBkash && (
        <div className="space-y-3 rounded-lg border border-pink-100 bg-pink-50/50 p-3">
          <fieldset className="space-y-3">
            <legend className="mb-2 text-[13px] font-semibold text-gray-900">Choose payment amount</legend>
            <label className="flex cursor-pointer items-start gap-2 text-[13px]">
              <input className="mt-1 accent-[#e2136e]" type="radio" name="payment-plan" checked={paymentPlan === "Full"} onChange={() => onPlanChange("Full")} />
              <span><span className="block font-semibold">Full Payment — Tk {formatMoney(total)}</span><span className="text-xs text-gray-500">Product price and delivery charge included</span></span>
            </label>
            <label className={`flex items-start gap-2 text-[13px] ${total < 100 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
              <input className="mt-1 accent-[#e2136e]" type="radio" name="payment-plan" checked={paymentPlan === "Advance"} disabled={total < 100} onChange={() => onPlanChange("Advance")} />
              <span><span className="block font-semibold">Advance Payment — Tk 100</span><span className="text-xs text-gray-500">Pay the remaining amount on delivery{total < 100 ? " (minimum order Tk 100)" : ""}</span></span>
            </label>
          </fieldset>
          <div className="space-y-2 border-t border-pink-200 pt-3 text-[13px]" aria-live="polite">
            <div className="flex justify-between font-bold text-[#e2136e]"><span>Pay now with bKash</span><span>Tk {formatMoney(payNow)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Cash on delivery</span><span>Tk {formatMoney(Math.max(total - payNow, 0))}</span></div>
          </div>
          <p className="text-xs leading-5 text-gray-600">You will be redirected to bKash to complete your payment securely.</p>
          {!bkashAvailable && <p role="status" className="text-xs font-medium text-red-700">bKash payments are currently unavailable. Please choose Cash on Delivery.</p>}
        </div>
      )}
      */}
      <AdvancePaymentNotice />
    </fieldset>
  );
}
