"use client";

import { useEffect, useMemo, useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";

const BASE_URL = "https://geo-location-bd.vercel.app/bd-geocode";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  contactName: "",
  mobileNumber: "",
  email: "",
  category: "Home",
  isDefault: true,
  street: "",
  divisionId: "",
  districtId: "",
  upazilaId: "",
  areaId: "",
};

const getLocationName = (location) => {
  if (!location) return "";

  return location.bn_name ? `${location.name} (${location.bn_name})` : location.name;
};

const AddAddress = ({ isOpen, onClose, onSave, editingAddress }) => {
  const [form, setForm] = useState(initialForm);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [formError, setFormError] = useState("");
  const isEditing = Boolean(editingAddress);

  useEffect(() => {
    let isMounted = true;

    const loadLocations = async () => {
      setIsLoadingLocations(true);
      setLocationError("");

      try {
        const [divisionData, districtData, upazilaData, unionData] = await Promise.all([
          fetch(`${BASE_URL}/divisions.json`).then((res) => res.json()),
          fetch(`${BASE_URL}/districts.json`).then((res) => res.json()),
          fetch(`${BASE_URL}/upazilas.json`).then((res) => res.json()),
          fetch(`${BASE_URL}/unions.json`).then((res) => res.json()),
        ]);

        if (!isMounted) return;

        setDivisions(divisionData);
        setDistricts(districtData);
        setUpazilas(upazilaData);
        setUnions(unionData);
      } catch {
        if (isMounted) {
          setLocationError("Failed to load location data. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingLocations(false);
        }
      }
    };

    if (isOpen && divisions.length === 0) {
      loadLocations();
    }

    return () => {
      isMounted = false;
    };
  }, [divisions.length, isOpen]);

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
      category: editingAddress.category || "Home",
      isDefault: Boolean(editingAddress.isDefault),
      street: editingAddress.street || "",
      divisionId: editingAddress.division?.id || "",
      districtId: editingAddress.district?.id || "",
      upazilaId: editingAddress.upazila?.id || "",
      areaId: editingAddress.area?.id || "",
    });
    setFormError("");
  }, [editingAddress, isOpen]);

  const filteredDistricts = useMemo(
    () => districts.filter((district) => district.division_id === form.divisionId),
    [districts, form.divisionId]
  );

  const filteredUpazilas = useMemo(
    () => upazilas.filter((upazila) => upazila.district_id === form.districtId),
    [form.districtId, upazilas]
  );

  const filteredUnions = useMemo(
    () => unions.filter((union) => union.upazila_id === form.upazilaId),
    [form.upazilaId, unions]
  );

  const selectedDivision = divisions.find((division) => division.id === form.divisionId);
  const selectedDistrict = districts.find((district) => district.id === form.districtId);
  const selectedUpazila = upazilas.find((upazila) => upazila.id === form.upazilaId);
  const selectedArea = unions.find((union) => union.id === form.areaId);

  const updateForm = (name, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleDivisionChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      divisionId: event.target.value,
      districtId: "",
      upazilaId: "",
      areaId: "",
    }));
  };

  const handleDistrictChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      districtId: event.target.value,
      upazilaId: "",
      areaId: "",
    }));
  };

  const handleUpazilaChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      upazilaId: event.target.value,
      areaId: "",
    }));
  };

  const handleSave = () => {
    setFormError("");
    const mobileNumber = form.mobileNumber
      .trim()
      .replace(/\s+/g, "")
      .replace(/^\+?880/, "")
      .replace(/^0/, "");

    if (
      !form.contactName.trim() ||
      !mobileNumber ||
      !form.email.trim() ||
      !form.street.trim() ||
      !selectedDivision ||
      !selectedDistrict ||
      !selectedUpazila ||
      !selectedArea
    ) {
      setFormError("Please fill all required fields.");
      return;
    }

    if (!EMAIL_PATTERN.test(form.email.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }

    const address = {
      id: editingAddress?.id || globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
      contactName: form.contactName.trim(),
      mobileNumber,
      email: form.email.trim(),
      category: form.category,
      isDefault: form.isDefault,
      street: form.street.trim(),
      division: selectedDivision,
      district: selectedDistrict,
      upazila: selectedUpazila,
      area: selectedArea,
      displayAddress: [
        form.street.trim(),
        selectedArea.name,
        selectedUpazila.name,
        selectedDistrict.name,
        selectedDivision.name,
      ].join(", "),
      shippingAddress: {
        street: form.street.trim(),
        city: selectedDistrict.name,
        state: selectedDivision.name,
        postalCode: selectedArea.name,
        country: "Bangladesh",
        division: selectedDivision.name,
        district: selectedDistrict.name,
        upazila: selectedUpazila.name,
        area: selectedArea.name,
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
        className="max-h-[95vh] w-full max-w-[1040px] overflow-y-auto rounded-md bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
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

        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-6">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#101828]">Contact Information</h3>

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
              <div className="flex h-[44px] min-w-[106px] items-center gap-2 rounded border border-[#98A2B3] px-3">
                <span className="text-base font-medium text-[#475467]">BD</span>
                <span className="text-base text-[#475467]">+880</span>
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
              className="mb-5 h-[44px] w-full rounded border border-[#98A2B3] px-4 text-base outline-none"
              placeholder="Email address"
              type="email"
              value={form.email}
              onChange={(event) => updateForm("email", event.target.value)}
            />

            <h3 className="mb-2 text-lg font-semibold text-[#101828]">Address Category</h3>
            <p className="mb-3 text-sm font-medium text-[#344054]">
              Select label for effective delivery <span className="text-[#F04438]">*</span>
            </p>

            <div className="mb-4 flex flex-wrap gap-3">
              {["Home", "Office", "Others"].map((category) => {
                const isSelected = form.category === category;

                return (
                  <button
                    className={`flex h-[44px] min-w-[108px] items-center justify-between rounded border px-4 text-sm font-semibold text-[#404040] ${
                      isSelected ? "border-[#ff3300]" : "border-[#D0D5DD]"
                    }`}
                    key={category}
                    type="button"
                    onClick={() => updateForm("category", category)}
                  >
                    {category}
                    <span
                      className={`ml-3 flex h-6 w-6 items-center justify-center rounded border text-sm ${
                        isSelected
                          ? "border-[#ff3300] text-[#ff3300]"
                          : "border-[#D0D5DD]"
                      }`}
                    >
                      {isSelected ? <IoCheckmark size={16} /> : null}
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="flex items-center gap-3 text-sm font-medium text-[#1D2939]">
              <input
                checked={form.isDefault}
                className="h-5 w-5 accent-[#ff3300]"
                type="checkbox"
                onChange={(event) => updateForm("isDefault", event.target.checked)}
              />
              Default Delivery address
            </label>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#101828]">Address Information</h3>

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              Street , House/Apartment/Unit <span className="text-[#F04438]">*</span>
            </label>
            <input
              className="mb-4 h-[44px] w-full rounded border border-[#98A2B3] px-4 text-base outline-none"
              placeholder="Address"
              type="text"
              value={form.street}
              onChange={(event) => updateForm("street", event.target.value)}
            />

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              Division <span className="text-[#F04438]">*</span>
            </label>
            <select
              className="mb-4 h-[44px] w-full rounded border border-[#D0D5DD] px-4 text-base text-[#344054] outline-none disabled:bg-gray-100"
              disabled={isLoadingLocations}
              value={form.divisionId}
              onChange={handleDivisionChange}
            >
              <option value="">Select Division</option>
              {divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {getLocationName(division)}
                </option>
              ))}
            </select>

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              District <span className="text-[#F04438]">*</span>
            </label>
            <select
              className="mb-4 h-[44px] w-full rounded border border-[#D0D5DD] px-4 text-base text-[#344054] outline-none disabled:bg-gray-100"
              disabled={!form.divisionId}
              value={form.districtId}
              onChange={handleDistrictChange}
            >
              <option value="">Select District</option>
              {filteredDistricts.map((district) => (
                <option key={district.id} value={district.id}>
                  {getLocationName(district)}
                </option>
              ))}
            </select>

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              Upazila <span className="text-[#F04438]">*</span>
            </label>
            <select
              className="mb-4 h-[44px] w-full rounded border border-[#D0D5DD] px-4 text-base text-[#344054] outline-none disabled:bg-gray-100"
              disabled={!form.districtId}
              value={form.upazilaId}
              onChange={handleUpazilaChange}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {getLocationName(upazila)}
                </option>
              ))}
            </select>

            <label className="mb-2 block text-sm font-semibold text-[#344054]">
              Area <span className="text-[#F04438]">*</span>
            </label>
            <select
              className="mb-4 h-[44px] w-full rounded border border-[#D0D5DD] px-4 text-base text-[#344054] outline-none disabled:bg-gray-100"
              disabled={!form.upazilaId}
              value={form.areaId}
              onChange={(event) => updateForm("areaId", event.target.value)}
            >
              <option value="">Select Area</option>
              {filteredUnions.map((union) => (
                <option key={union.id} value={union.id}>
                  {getLocationName(union)}
                </option>
              ))}
            </select>

            {(locationError || formError) && (
              <p className="mb-4 text-sm font-medium text-[#F04438]">
                {locationError || formError}
              </p>
            )}

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
    </div>
  );
};

export default AddAddress;
