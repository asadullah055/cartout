// OrderSummary.jsx

const OrderSummary = () => (
  <div className="bg-white rounded p-2">
    <div className="mb-4">
      <div className="text-sm text-gray-500">Location</div>
      <div className="font-semibold">
        Gomastapur, Chapai Nawabganj, Rajshahi
      </div>
    </div>
    <div className="mb-4">
      <div className="font-semibold mb-2">Order Summary</div>
      <div className="flex justify-between text-sm mb-1">
        <span>Subtotal (0 items)</span>
        <span>৳ 0</span>
      </div>
      <div className="flex justify-between text-sm mb-1">
        <span>Shipping Fee</span>
        <span>৳ 0</span>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Enter Voucher Code"
          className="border rounded px-2 py-1 flex-1"
        />
        <button className="bg-blue-500 text-white px-4 rounded">APPLY</button>
      </div>
    </div>
    <div className="flex justify-between font-bold text-lg mb-4">
      <span>Total</span>
      <span>৳ 0</span>
    </div>
    <button className="w-full bg-orange-500 text-white py-2 rounded font-semibold">
      PROCEED TO CHECKOUT (0)
    </button>
  </div>
);

export default OrderSummary;
