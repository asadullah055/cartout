import { BiEditAlt } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";

const Address = ({
  addresses = [],
  selectedAddressId,
  onSelectAddress,
  onDeleteAddress,
  onEditAddress,
}) => {
  if (!addresses.length) {
    return (
      <div className="mt-4 rounded border border-dashed border-[#D0D5DD] bg-[#FCFCFC] p-5 text-sm font-medium text-gray-600">
        No delivery address added yet.
      </div>
    );
  }

  return (
    <div className="mt-4 grid-cols-1 gap-5 md:grid md:grid-cols-3">
      {addresses.map((address) => {
        const isSelected = selectedAddressId === address.id;

        return (
          <label
            htmlFor={address.id}
            key={address.id}
            className={`flex cursor-pointer flex-col gap-4 rounded-lg border-[2px] bg-[#FCFCFC] p-4 ${
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
              <span className="shrink-0 rounded bg-[#FFF0E9] px-2 py-1 text-xs font-semibold text-orange-600">
                {address.category}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-800">{address.displayAddress}</p>
              {address.isDefault && (
                <p className="mt-2 text-xs font-semibold text-[#12B76A]">
                  Default address
                </p>
              )}
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
