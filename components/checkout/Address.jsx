import { BiEditAlt } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCirclePlus, FaLocationDot } from "react-icons/fa6";

const Address = ({
  addresses = [],
  selectedAddressId,
  onAddAddressClick,
  onSelectAddress,
  onDeleteAddress,
  onEditAddress,
}) => {
  if (!addresses.length) {
    return (
      <div className="mt-6 flex min-h-[220px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#ffc29f] bg-[#fffaf5] px-5 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe7cc] text-[#ff3300]">
          <FaLocationDot size={34} />
        </div>
        <h3 className="mt-4 text-xl font-bold text-[#111827]">
          No delivery address added yet!
        </h3>
        <p className="mt-1 text-sm font-medium text-[#667085]">
          Add a delivery address to proceed with your order.
        </p>
        <button
          className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#ff3300] px-8 text-base font-bold text-white shadow-[0_10px_24px_rgba(255,51,0,0.25)]"
          type="button"
          onClick={onAddAddressClick}
        >
          <FaCirclePlus />
          Add New Address
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {addresses.map((address) => {
        const isSelected = selectedAddressId === address.id;

        return (
          <label
            htmlFor={address.id}
            key={address.id}
            className={`flex cursor-pointer flex-col gap-4 rounded-lg border-[2px] bg-[#FCFCFC] p-4 transition ${
              isSelected ? "border-orange-500" : "border-[#EAECF0]"
            }`}
          >
            <input
              checked={isSelected}
              className="sr-only"
              id={address.id}
              name="deliveryAddress"
              type="radio"
              onChange={() => onSelectAddress?.(address.id)}
            />
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-gray-900">
                  {address.contactName}
                </h3>
                <p className="mt-1 text-xs font-medium text-gray-500">
                  +880 {address.mobileNumber}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-800">{address.displayAddress}</p>
            </div>
            <div className="mt-auto flex justify-between gap-2">
              <button
                className="flex h-[36px] w-[115px] flex-row items-center justify-center gap-[4px] rounded bg-[#FFF0E9] text-sm font-medium text-orange-600"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  onDeleteAddress?.(address.id);
                }}
              >
                <FaRegTrashAlt />
                <p>Delete</p>
              </button>
              <button
                className="flex h-[36px] w-[115px] flex-row items-center justify-center gap-[4px] rounded bg-[#EEEEEE] text-sm font-medium text-[#333333]"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  onEditAddress?.(address.id);
                }}
              >
                <BiEditAlt size={18} />
                <p>Edit</p>
              </button>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default Address;
