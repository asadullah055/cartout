// OrderSummary.jsx

import { IoLocationOutline } from "react-icons/io5";

const OrderSummary = () => (
  <div className="bg-white rounded p-2">
    <div className="mb-4">
      <div className="text-sm text-gray-500 font-medium">Location</div>
      <div className="font-semibold flex gap-x-3 mt-2 text-[12px] text-gray-600">
        <IoLocationOutline size={22} className="text-gray-700" /> Gomastapur,
        Chapai Nawabganj, Rajshahi
      </div>
    </div>
    <div className="mb-4">
      <div className="font-medium text-lg mb-2">Order Summary</div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">Subtotal (0 items)</span>
        <span>৳ 0</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">Shipping Fee</span>
        <span>৳ 0</span>
      </div>
      <div className="flex justify-between gap-2 mt-2">
        <input
          type="text"
          placeholder="Enter Voucher Code"
          className="border rounded px-2 py-1 w-full "
        />
        <button className="bg-orange-500 text-white px-4 rounded">APPLY</button>
      </div>
    </div>
    <div className="flex justify-between text-md mb-4">
      <span>Total</span>
      <span className="text-orange-500">৳ 1237 </span>
    </div>
    <button className="w-full bg-orange-500 text-white py-2 rounded">
      Process Checkout (2)
    </button>
  </div>
);

export default OrderSummary;
