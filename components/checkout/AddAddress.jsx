"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  contactName: "",
  mobileNumber: "",
  email: "",
  fullAddress: "",
};

const AddAddress = ({ isOpen, onClose, onSave, editingAddress }) => {
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const isEditing = Boolean(editingAddress);

  useEffect(() => {
    if (!isOpen) return;

    if (!editingAddress) {
      setForm(initialForm);
      setFormError("");
      return;
    }

    setForm({
      contactName: editingAddress.contactName || "",
      mobileNumber: editingAddress.mobileNumber || "",
      email: editingAddress.email || "",
      fullAddress:
        editingAddress.fullAddress ||
        editingAddress.displayAddress ||
        editingAddress.street ||
        "",
    });
    setFormError("");
  }, [editingAddress, isOpen]);

  const updateForm = (name, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setFormError("");
    const fullAddress = form.fullAddress.trim();
    const mobileNumber = form.mobileNumber
      .trim()
      .replace(/\s+/g, "")
      .replace(/^\+?88/, "")
      .replace(/^0/, "");

    if (
      !form.contactName.trim() ||
      !mobileNumber ||
      !form.email.trim() ||
      !fullAddress
    ) {
      setFormError("Please fill all required fields.");
      return;
    }

    if (!EMAIL_PATTERN.test(form.email.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }

    const address = {
      id:
        editingAddress?.id ||
        globalThis.crypto?.randomUUID?.() ||
        `${Date.now()}-${Math.random()}`,
      contactName: form.contactName.trim(),
      mobileNumber,
      email: form.email.trim(),
      category: editingAddress?.category || "Home",
      isDefault: editingAddress?.isDefault ?? true,
      street: fullAddress,
      fullAddress,
      displayAddress: fullAddress,
      shippingAddress: {
        fullAddress,
      },
    };

    onSave?.(address);
    setForm(initialForm);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 md:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[95vh] w-full max-w-[620px] overflow-y-auto rounded-md bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-[#EAECF0] px-4 py-4 md:px-6">
          <div className="relative flex items-center justify-center">
            <h2 className="text-lg font-semibold text-[#1D2939] md:text-xl">
              {isEditing ? "Edit Delivery Address" : "Add Delivery Address"}
            </h2>
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

        <div className="p-4 md:p-6">
          <label className="mb-2 block text-sm font-semibold text-[#344054]">
            Contact Name <span className="text-[#F04438]">*</span>
          </label>
          <input
            className="mb-4 h-[44px] w-full rounded border border-[#98A2B3] px-4 text-base outline-none"
            placeholder="Name"
            type="text"
            value={form.contactName}
            onChange={(event) => updateForm("contactName", event.target.value)}
          />

          <label className="mb-2 block text-sm font-semibold text-[#344054]">
            Mobile Number <span className="text-[#F04438]">*</span>
          </label>
          <div className="mb-4 flex gap-2">
            <div className="flex h-[44px] min-w-[96px] items-center gap-2 rounded border border-[#98A2B3] px-3">
              <span className="text-base font-medium text-[#475467]">BD</span>
              <span className="text-base text-[#475467]">+88</span>
            </div>
            <input
              className="h-[44px] w-full rounded border border-[#98A2B3] px-4 text-base outline-none"
              placeholder="Phone number"
              type="text"
              value={form.mobileNumber}
              onChange={(event) => updateForm("mobileNumber", event.target.value)}
            />
          </div>

          <label className="mb-2 block text-sm font-semibold text-[#344054]">
            Email <span className="text-[#F04438]">*</span>
          </label>
          <input
            className="mb-4 h-[44px] w-full rounded border border-[#98A2B3] px-4 text-base outline-none"
            placeholder="Email address"
            type="email"
            value={form.email}
            onChange={(event) => updateForm("email", event.target.value)}
          />

          <label className="mb-2 block text-sm font-semibold text-[#344054]">
            Full Address <span className="text-[#F04438]">*</span>
          </label>
          <textarea
            className="mb-4 min-h-[112px] w-full resize-none rounded border border-[#98A2B3] px-4 py-3 text-base outline-none"
            placeholder="Apt/House, Road/Village, Post Office, Upazila, District, Division"
            value={form.fullAddress}
            onChange={(event) => updateForm("fullAddress", event.target.value)}
          />

          {formError ? (
            <p className="mb-4 text-sm font-medium text-[#F04438]">{formError}</p>
          ) : null}

          <div className="flex justify-end">
            <button
              className="h-[44px] w-[160px] rounded-full bg-[#ff3300] text-sm font-semibold text-white transition duration-200 hover:bg-orange-600"
              type="button"
              onClick={handleSave}
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
