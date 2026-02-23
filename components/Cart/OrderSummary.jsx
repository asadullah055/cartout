import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";

const OrderSummary = ({ totalItems, subtotal, shippingFee = 0 }) => {
  const grandTotal = subtotal + shippingFee;

  return (
    <div className="rounded bg-white p-2">
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-500">Location</div>
        <div className="mt-2 flex gap-x-3 text-[12px] font-semibold text-gray-600">
          <IoLocationOutline size={22} className="text-gray-700" /> Gomastapur, Chapai Nawabganj, Rajshahi
        </div>
      </div>

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

      <Link
        href="/checkout"
        className="block w-full rounded bg-orange-500 py-2 text-center text-white"
      >
        Process Checkout ({totalItems})
      </Link>
    </div>
  );
};

export default OrderSummary;
