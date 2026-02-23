import Link from "next/link";

const CheckoutSidebar = ({
  subtotal,
  shippingFee,
  totalItems,
  onPlaceOrder,
  isPlacingOrder,
  orderFeedback,
}) => {
  const totalPayment = subtotal + shippingFee;

  return (
    <div className="mt-3 lg:min-w-[312px]">
      <div className="sticky top-36 rounded bg-[#FFFFFF] p-0 md:p-5 lg:p-4">
        <div className="p-3 md:p-0">
          <h3 className="mb-3 text-sm font-bold text-primaryBlackText md:mb-0">Order Summary:</h3>
          <hr className="mb-5 mt-3 hidden md:block" />

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="flex w-full justify-between text-sm font-medium text-primaryBlackText sm:text-base">
                <span>Product Price:</span>
                <span className="font-semibold text-primaryBlackText">Tk {subtotal}</span>
              </p>
            </div>
            <div className="flex justify-between">
              <span className="flex w-full justify-between text-sm font-medium text-primaryBlackText sm:text-base">
                <p>
                  Delivery <span className="inline xl:inline">Charge</span>:
                </p>
                <span className="font-semibold text-primaryBlackText">Tk {shippingFee}</span>
              </span>
            </div>
          </div>

          <div className="my-2 border-b border-dashed sm:text-base md:my-6"></div>

          <div className="mb-5 flex justify-between">
            <div className="flex w-full justify-between text-sm font-bold md:text-base md:font-medium">
              <p className="text-primaryBlackText">
                Total <span className="inline lg:hidden xl:inline">Payment</span>:
              </p>
              <span className="font-semibold text-primaryBlackText">Tk {totalPayment}</span>
            </div>
          </div>

          <div className="rounded-md p-3 sm:p-4">
            <p className="text-[16px] font-medium text-primaryBlackText">Have a Cartup Coupon?</p>

            <form className="mt-3 flex items-center gap-2">
              <input
                className="h-[40px] w-full rounded-md border border-[#D0D5DD] bg-white px-3 text-sm text-[#475467] outline-none"
                required
                placeholder="Promo / Coupon Code"
                type="text"
                defaultValue=""
              />
              <button
                aria-label="Apply"
                className="h-[40px] rounded-md bg-[#C3007A] px-6 text-sm font-semibold text-white"
                type="button"
              >
                Apply
              </button>
            </form>

            <div className="mt-4 flex items-start gap-3">
              <span className="mt-[2px] flex h-5 w-8 items-center justify-center rounded border border-[#7F56D9] bg-[#F4EBFF]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 3.5L4.75 8.25L2.5 6"
                    stroke="#7F56D9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <p className="text-xs font-medium leading-5 text-[#667085]">
                I agree to the{" "}
                <Link className="text-[#175CD3] no-underline" href="/content/terms-and-conditions">
                  Terms &amp; Conditions,
                </Link>{" "}
                <Link className="text-[#175CD3] no-underline" href="/content/privacy-policy">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link className="text-[#175CD3] no-underline" href="/content/returns-and-refunds">
                  Return &amp; Refund Policy
                </Link>{" "}
                of Cartup
              </p>
            </div>

            <button
              aria-label="Place Order"
              className="mt-4 h-[42px] w-full rounded-full bg-gradient-to-r from-[#7A3E97] to-[#E00087] text-base font-semibold text-white"
              type="button"
              onClick={onPlaceOrder}
              disabled={!totalItems || isPlacingOrder}
            >
              {isPlacingOrder ? "Placing..." : `Place Order (${totalItems})`}
            </button>
            {orderFeedback ? (
              <p className="mt-2 text-center text-xs text-[#667085]">{orderFeedback}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSidebar;
