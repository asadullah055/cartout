import Address from "@/components/checkout/Address";
import { FaLocationDot } from "react-icons/fa6";

const DeliveryAddressSection = ({
  addresses,
  selectedAddressId,
  onAddAddressClick,
  onSelectAddress,
  onDeleteAddress,
  onEditAddress,
}) => {
  return (
    <section className="rounded-xl bg-white px-4 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:px-7 sm:py-6">
      <div className="mt-0">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <FaLocationDot className="mt-1 text-[28px] text-[#ff3300]" />
            <div>
              <h2 className="text-xl font-bold leading-tight text-[#111827]">
                Delivery Address
              </h2>
              <p className="mt-1 text-sm font-medium text-[#667085]">
                Choose where you want your order to be delivered
              </p>
            </div>
          </div>
          {addresses.length ? (
            <button
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#ff3300] px-5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(255,51,0,0.22)]"
              type="button"
              onClick={onAddAddressClick}
            >
              Add New Address
            </button>
          ) : null}
        </div>
        <Address
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onAddAddressClick={onAddAddressClick}
          onSelectAddress={onSelectAddress}
          onDeleteAddress={onDeleteAddress}
          onEditAddress={onEditAddress}
        />
      </div>
    </section>
  );
};

export default DeliveryAddressSection;

