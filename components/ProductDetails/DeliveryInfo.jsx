import {
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
} from "react-icons/fa";

const DeliveryInfo = () => {
  return (
    <div className="p-4 rounded-md text-sm space-y-5 text-gray-700">
      {/* Delivery Options */}
      <div>
        <h2 className="text-gray-500 text-xs font-semibold mb-2">
          Delivery Options
        </h2>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="mt-0.5 text-gray-500" />
            <span>
              <p>Khulna, Jashore, Bagherpara, Bagherpara</p>
            </span>
          </div>
          <button className="text-blue-600 text-xs font-medium">CHANGE</button>
        </div>

        <div className="flex items-start gap-2 mt-3">
          <FaTruck className="mt-1 text-gray-500" />
          <div>
            <p>Standard Delivery</p>
            <p className="text-xs text-gray-500">Get by 29 Jul - 3 Aug</p>
          </div>
          <div className="ml-auto font-semibold">৳ 150</div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <FaMoneyBillAlt className="text-gray-500" />
          <p>Cash on Delivery Available</p>
        </div>
      </div>

      {/* Return & Warranty */}
      <div>
        <h2 className="text-gray-500 text-xs font-semibold mb-2">
          Return & Warranty
        </h2>
        <div className="flex items-center gap-2">
          <FaUndoAlt className="text-gray-500" />
          <p>14 days easy return</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <FaShieldAlt className="text-gray-500" />
          <p>Warranty not available</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
