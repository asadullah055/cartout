"use client";

import { IoClose } from "react-icons/io5";

const AddAddress = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 md:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[95vh] w-full max-w-[1040px] overflow-y-auto rounded-md bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-[#EAECF0] px-4 py-4 md:px-6">
          <div className="relative flex items-center justify-center">
            <h2 className="text-xl font-medium text-[#1D2939]">Add Delivery Address</h2>
            <button
              aria-label="Close"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#667085]"
              type="button"
              onClick={onClose}
            >
              <IoClose size={26} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-6">
          <div>
            <h3 className="mb-4 text-3xl font-medium text-[#101828]">Contact Information</h3>

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              Contact Name <span className="text-[#F04438]">*</span>
            </label>
            <input
              className="mb-4 h-[44px] w-full rounded border border-[#98A2B3] px-4 text-base outline-none"
              placeholder="Name"
              type="text"
            />

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              Mobile Number <span className="text-[#F04438]">*</span>
            </label>
            <div className="mb-4 flex gap-2">
              <div className="flex h-[44px] min-w-[106px] items-center gap-2 rounded border border-[#98A2B3] px-3">
                <span className="text-base font-medium text-[#475467]">BD</span>
                <span className="text-base text-[#475467]">+880</span>
              </div>
              <input
                className="h-[44px] w-full rounded border border-[#98A2B3] px-4 text-base outline-none"
                placeholder="Phone number"
                type="text"
              />
            </div>

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              Email <span className="text-[#667085]">(Optional)</span>
            </label>
            <input
              className="mb-5 h-[44px] w-full rounded border border-[#98A2B3] px-4 text-base outline-none"
              placeholder="Email address"
              type="email"
            />

            <h3 className="mb-2 text-3xl font-medium text-[#101828]">Address Category</h3>
            <p className="mb-3 text-sm font-medium text-[#344054]">
              Select label for effective delivery <span className="text-[#F04438]">*</span>
            </p>

            <div className="mb-4 flex flex-wrap gap-3">
              <button
                className="flex h-[48px] min-w-[108px] items-center justify-between rounded border border-[#FF0A81] px-4 text-lg font-semibold text-[#404040]"
                type="button"
              >
                Home
                <span className="ml-3 flex h-6 w-6 items-center justify-center rounded border border-[#7F56D9] text-sm text-[#7F56D9]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 3.5L4.75 8.25L2.5 6"
                      stroke="#7F56D9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <button
                className="flex h-[48px] min-w-[108px] items-center justify-between rounded border border-[#D0D5DD] px-4 text-lg font-semibold text-[#404040]"
                type="button"
              >
                Office
                <span className="ml-3 h-6 w-6 rounded border border-[#D0D5DD]"></span>
              </button>
              <button
                className="flex h-[48px] min-w-[108px] items-center justify-between rounded border border-[#D0D5DD] px-4 text-lg font-semibold text-[#404040]"
                type="button"
              >
                Others
                <span className="ml-3 h-6 w-6 rounded border border-[#D0D5DD]"></span>
              </button>
            </div>

            <label className="flex items-center gap-3 text-lg text-[#1D2939]">
              <span className="h-6 w-6 rounded border border-[#D0D5DD]"></span>
              Default Delivery address
            </label>
          </div>

          <div>
            <h3 className="mb-4 text-3xl font-medium text-[#101828]">Address Information</h3>

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              Street , House/Apartment/Unit <span className="text-[#F04438]">*</span>
            </label>
            <input
              className="mb-4 h-[44px] w-full rounded border border-[#98A2B3] px-4 text-base outline-none"
              placeholder="Address"
              type="text"
            />

            <label className="mb-2 block text-sm font-semibold text-[#344054]">Landmark</label>
            <input
              className="mb-4 h-[44px] w-full rounded border border-[#98A2B3] px-4 text-base outline-none"
              placeholder="e.g. nearby landmarks or direction"
              type="text"
            />

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              District <span className="text-[#F04438]">*</span>
            </label>
            <select className="mb-4 h-[44px] w-full rounded border border-[#D0D5DD] px-4 text-base text-[#344054] outline-none">
              <option>Select District</option>
            </select>

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              Zone <span className="text-[#F04438]">*</span>
            </label>
            <select className="mb-4 h-[44px] w-full rounded border border-[#D0D5DD] px-4 text-base text-[#344054] outline-none">
              <option>Select Zone</option>
            </select>

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              Area <span className="text-[#F04438]">*</span>
            </label>
            <select className="mb-6 h-[44px] w-full rounded border border-[#D0D5DD] px-4 text-base text-[#344054] outline-none">
              <option>Select Area</option>
            </select>

            <div className="flex justify-end">
              <button
                className="h-[52px] w-[180px] rounded-full bg-gradient-to-r from-[#7A3E97] to-[#E00087] text-lg font-semibold text-white"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
