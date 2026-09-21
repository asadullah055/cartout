import Link from "next/link";

const OrderSummary = ({
  totalItems,
  subtotal,
  shippingFee = 0,
  checkoutDisabled = false,
  message = "",
}) => {
  const grandTotal = subtotal + shippingFee;

  return (
    <div className="rounded bg-white p-2">
      <div className="mb-4">
        <div className="mb-2 text-lg font-medium">Order Summary</div>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span>Tk {subtotal}</span>
        </div>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-600">Shipping Fee</span>
          <span>Tk {shippingFee}</span>
        </div>
      </div>

      <div className="mb-4 flex justify-between text-md">
        <span>Total</span>
        <span className="text-orange-500">Tk {grandTotal}</span>
      </div>

      {checkoutDisabled ? (
        <div
          aria-disabled="true"
          className="block w-full cursor-not-allowed rounded bg-gray-300 py-2 text-center text-gray-600"
        >
          Process Checkout ({totalItems})
        </div>
      ) : (
        <Link
          href="/checkout"
          className="block w-full rounded bg-orange-500 py-2 text-center text-white"
        >
          Process Checkout ({totalItems})
        </Link>
      )}
      {message ? (
        <p className="mt-2 text-center text-xs font-semibold text-red-600">{message}</p>
      ) : null}
    </div>
  );
};

export default OrderSummary;
