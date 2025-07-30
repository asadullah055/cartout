import { BsTruck } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { IoIosSync } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
const DeliveryInfo = () => {
  return (
    <div className="p-4 rounded-md text-sm space-y-3 text-gray-900">
      {/* Delivery Options */}
      <div>
        <h2 className="text-gray-800 text-xs font-semibold mb-2">
          Delivery Options
        </h2>
        <div className="flex items-start justify-between border-b pb-3 border-gray-200">
          <div className="flex items-center gap-x-4">
            <IoLocationOutline size={24} className="text-gray-800" />
            <span>
              <p>Khulna, Jashore, Bagherpara, Bagherpara</p>
            </span>
          </div>
          <button className="text-blue-600 text-xs font-medium">CHANGE</button>
        </div>

        <div className="flex items-start gap-x-4 mt-3 ">
          <BsTruck size={24} className="text-gray-800" />
          <div>
            <p>Standard Delivery</p>
            <p className="text-xs text-gray-500">Get by 29 Jul - 3 Aug</p>
          </div>
          <div className="ml-auto font-semibold">৳ 150</div>
        </div>

        <div className="flex items-center gap-x-4 mt-3 border-b pb-3 border-gray-200">
          <FaMoneyBillAlt size={24} className="text-gray-800" />
          <p>Cash on Delivery Available</p>
        </div>
      </div>

      {/* Return & Warranty */}
      <div>
        <h2 className="text-gray-900 text-xs font-semibold mb-2">
          Return & Warranty
        </h2>
        <div className="flex items-center gap-x-4">
          <IoIosSync size={24} className="text-gray-800" />
          <p>14 days easy return</p>
        </div>
        <div className="flex items-center gap-x-4 mt-2">
          <GoShieldCheck size={24} className="text-gray-800" />
          <p>6 Months Seller Warranty</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
