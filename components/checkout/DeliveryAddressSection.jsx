import Address from "@/components/checkout/Address";
import { GoPlus } from "react-icons/go";

const DeliveryAddressSection = ({ onAddAddressClick }) => {
  return (
    <div className="mb-[8px] bg-white p-4 md:mb-[16px] md:rounded-md md:p-6 mt-3">
      <div className="mt-0">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900 sm:text-lg">
            Select a Delivery Address
          </h2>
          <button
            className="flex cursor-pointer items-center gap-1 font-medium text-orange-500 disabled:cursor-not-allowed disabled:text-[#999]"
            type="button"
            onClick={onAddAddressClick}
          >
            <GoPlus size={25} />
            <span>Add Address</span>
          </button>
        </div>
        <Address />
      </div>
    </div>
  );
};

export default DeliveryAddressSection;

