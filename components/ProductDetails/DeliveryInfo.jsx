"use client";

import { BsTruck } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { IoIosSync } from "react-icons/io";
import { IoClose, IoLocationOutline } from "react-icons/io5";
import { useEffect, useMemo, useState } from "react";

const BASE_URL = "https://geo-location-bd.vercel.app/bd-geocode";
const DELIVERY_LOCATION_KEY = "pinwheel_delivery_location";
const DELIVERY_START_DAYS = 4;
const DELIVERY_END_DAYS = 9;

const defaultLocation = {
  division: { id: "3", name: "Khulna" },
  district: { id: "20", name: "Jashore" },
  upazila: { id: "161", name: "Bagherpara" },
  area: { id: "1517", name: "Bagherpara" },
};

const emptySelection = {
  divisionId: "",
  districtId: "",
  upazilaId: "",
  areaId: "",
};

const getLocationName = (location) => {
  if (!location) return "";

  return location.bn_name ? `${location.name} (${location.bn_name})` : location.name;
};

const getDisplayLocation = (location) =>
  [location.division?.name, location.district?.name, location.upazila?.name, location.area?.name]
    .filter(Boolean)
    .join(", ");

const addDays = (date, days) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const formatDeliveryDate = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(date);

const getDeliveryTimeline = () => {
  const today = new Date();
  const startDate = addDays(today, DELIVERY_START_DAYS);
  const endDate = addDays(today, DELIVERY_END_DAYS);

  return `Get by ${formatDeliveryDate(startDate)} - ${formatDeliveryDate(endDate)}`;
};

const isDhakaLocation = (location) =>
  String(location?.district?.name || "").trim().toLowerCase() === "dhaka";

const DeliveryInfo = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [selection, setSelection] = useState(emptySelection);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [locationError, setLocationError] = useState("");
  const deliveryTimeline = useMemo(() => getDeliveryTimeline(), []);
  const insideDhakaShipping = Number(product?.shippingCharge?.insideDhaka ?? 80);
  const outsideDhakaShipping = Number(product?.shippingCharge?.outsideDhaka ?? 120);
  const selectedShippingFee = isDhakaLocation(selectedLocation)
    ? insideDhakaShipping
    : outsideDhakaShipping;

  useEffect(() => {
    try {
      const savedLocation = JSON.parse(
        window.localStorage.getItem(DELIVERY_LOCATION_KEY) || "null"
      );

      if (savedLocation?.division && savedLocation?.district && savedLocation?.upazila && savedLocation?.area) {
        setSelectedLocation(savedLocation);
      }
    } catch {
      setSelectedLocation(defaultLocation);
    }
  }, []);

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
          setLocationError("Failed to load locations. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingLocations(false);
        }
      }
    };

    if (isModalOpen && divisions.length === 0) {
      loadLocations();
    }

    return () => {
      isMounted = false;
    };
  }, [divisions.length, isModalOpen]);

  const filteredDistricts = useMemo(
    () => districts.filter((district) => district.division_id === selection.divisionId),
    [districts, selection.divisionId]
  );

  const filteredUpazilas = useMemo(
    () => upazilas.filter((upazila) => upazila.district_id === selection.districtId),
    [selection.districtId, upazilas]
  );

  const filteredUnions = useMemo(
    () => unions.filter((union) => union.upazila_id === selection.upazilaId),
    [selection.upazilaId, unions]
  );

  const selectedDivision = divisions.find((division) => division.id === selection.divisionId);
  const selectedDistrict = districts.find((district) => district.id === selection.districtId);
  const selectedUpazila = upazilas.find((upazila) => upazila.id === selection.upazilaId);
  const selectedArea = unions.find((union) => union.id === selection.areaId);

  const openLocationModal = () => {
    setSelection({
      divisionId: selectedLocation.division?.id || "",
      districtId: selectedLocation.district?.id || "",
      upazilaId: selectedLocation.upazila?.id || "",
      areaId: selectedLocation.area?.id || "",
    });
    setLocationError("");
    setIsModalOpen(true);
  };

  const handleDivisionChange = (event) => {
    setSelection({
      divisionId: event.target.value,
      districtId: "",
      upazilaId: "",
      areaId: "",
    });
  };

  const handleDistrictChange = (event) => {
    setSelection((currentSelection) => ({
      ...currentSelection,
      districtId: event.target.value,
      upazilaId: "",
      areaId: "",
    }));
  };

  const handleUpazilaChange = (event) => {
    setSelection((currentSelection) => ({
      ...currentSelection,
      upazilaId: event.target.value,
      areaId: "",
    }));
  };

  const handleSaveLocation = () => {
    if (!selectedDivision || !selectedDistrict || !selectedUpazila || !selectedArea) {
      setLocationError("Please select division, district, upazila and area.");
      return;
    }

    const nextLocation = {
      division: selectedDivision,
      district: selectedDistrict,
      upazila: selectedUpazila,
      area: selectedArea,
    };

    setSelectedLocation(nextLocation);
    window.localStorage.setItem(DELIVERY_LOCATION_KEY, JSON.stringify(nextLocation));
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 rounded-md text-sm space-y-3 text-gray-900">
      <div>
        <h2 className="text-gray-800 text-xs font-semibold mb-2">
          Delivery Options
        </h2>
        <div className="flex items-start justify-between border-b pb-3 border-gray-200">
          <div className="flex items-center gap-x-4">
            <IoLocationOutline size={24} className="text-gray-800" />
            <span>
              <p>{getDisplayLocation(selectedLocation)}</p>
            </span>
          </div>
          <button
            className="text-blue-600 text-xs font-medium"
            type="button"
            onClick={openLocationModal}
          >
            CHANGE
          </button>
        </div>

        <div className="flex items-start gap-x-4 mt-3 ">
          <BsTruck size={24} className="text-gray-800" />
          <div>
            <p>Delivery Timeline</p>
            <p className="text-xs text-gray-500">{deliveryTimeline}</p>
            <p className="text-xs text-gray-500">
              Inside Dhaka Tk {insideDhakaShipping} / Outside Dhaka Tk {outsideDhakaShipping}
            </p>
          </div>
          <div className="ml-auto font-semibold">Tk {selectedShippingFee}</div>
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
          <p>3 days easy return</p>
        </div>
        <div className="flex items-center gap-x-4 mt-2">
          <GoShieldCheck size={24} className="text-gray-800" />
          <p>
            {product?.warrantyType === "no warranty"
              ? "No Warranty"
              : [product?.warrantyTime, product?.warrantyType]
                  .filter(Boolean)
                  .join(" ") || "No Warranty"}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-[460px] rounded-md bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Change Location</h3>
              <button
                aria-label="Close"
                className="text-gray-500"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                <IoClose size={24} />
              </button>
            </div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Division
            </label>
            <select
              className="mb-3 h-[42px] w-full rounded border border-gray-300 px-3 text-sm outline-none disabled:bg-gray-100"
              disabled={isLoadingLocations}
              value={selection.divisionId}
              onChange={handleDivisionChange}
            >
              <option value="">Select Division</option>
              {divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {getLocationName(division)}
                </option>
              ))}
            </select>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              District
            </label>
            <select
              className="mb-3 h-[42px] w-full rounded border border-gray-300 px-3 text-sm outline-none disabled:bg-gray-100"
              disabled={!selection.divisionId}
              value={selection.districtId}
              onChange={handleDistrictChange}
            >
              <option value="">Select District</option>
              {filteredDistricts.map((district) => (
                <option key={district.id} value={district.id}>
                  {getLocationName(district)}
                </option>
              ))}
            </select>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Upazila
            </label>
            <select
              className="mb-3 h-[42px] w-full rounded border border-gray-300 px-3 text-sm outline-none disabled:bg-gray-100"
              disabled={!selection.districtId}
              value={selection.upazilaId}
              onChange={handleUpazilaChange}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {getLocationName(upazila)}
                </option>
              ))}
            </select>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Area
            </label>
            <select
              className="mb-4 h-[42px] w-full rounded border border-gray-300 px-3 text-sm outline-none disabled:bg-gray-100"
              disabled={!selection.upazilaId}
              value={selection.areaId}
              onChange={(event) =>
                setSelection((currentSelection) => ({
                  ...currentSelection,
                  areaId: event.target.value,
                }))
              }
            >
              <option value="">Select Area</option>
              {filteredUnions.map((union) => (
                <option key={union.id} value={union.id}>
                  {getLocationName(union)}
                </option>
              ))}
            </select>

            {locationError && (
              <p className="mb-4 text-sm font-medium text-red-600">{locationError}</p>
            )}

            <div className="flex justify-end gap-3">
              <button
                className="h-[40px] rounded bg-gray-100 px-5 text-sm font-semibold text-gray-700"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="h-[40px] rounded bg-[#ff3300] px-5 text-sm font-semibold text-white"
                type="button"
                onClick={handleSaveLocation}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryInfo;
