"use client";

import { useState } from "react";
import { BsTruck } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { IoIosSync } from "react-icons/io";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const DeliveryInfo = ({ product }) => {
  const [selectedArea, setSelectedArea] = useState("insideDhaka");
  const deliveryOptions = [
    {
      id: "insideDhaka",
      label: "Inside Dhaka",
      duration: "1-2 Days",
      charge: Number(product?.shippingCharge?.insideDhaka ?? 80),
    },
    {
      id: "outsideDhaka",
      label: "Outside Dhaka",
      duration: "2-4 Days",
      charge: Number(product?.shippingCharge?.outsideDhaka ?? 120),
    },
  ];
  const selectedDelivery = deliveryOptions.find(
    (option) => option.id === selectedArea
  );
  const warrantyLabel =
    String(product?.warrantyType || "").toLowerCase() === "no warranty"
      ? "No Warranty"
      : [product?.warrantyTime, product?.warrantyType]
          .filter(Boolean)
          .join(" ") || "No Warranty";

  return (
    <div className="rounded-md px-5 pb-4 pt-5 font-normal text-[#475467]">
      <div className="flex items-start gap-3.5">
        <div className="flex w-4 shrink-0 flex-col items-center">
          <BsTruck className="mt-0.5 text-[18px] text-[#344054]" />
          <span className="mt-2 h-[46px] w-px bg-[#e4e7ec]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 text-[15px] font-semibold leading-5 text-[#101828]">
            <p>Delivery</p>
            <p className="shrink-0 text-[14px]">
              Tk {selectedDelivery.charge}
            </p>
          </div>

          <div
            className="mt-2 space-y-1.5 text-[13px] leading-5 text-[#667085]"
            role="radiogroup"
            aria-label="Delivery area"
          >
            {deliveryOptions.map((option) => {
              const isSelected = selectedArea === option.id;
              const SelectionIcon = isSelected
                ? MdCheckBox
                : MdCheckBoxOutlineBlank;

              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedArea(option.id)}
                  className="flex w-full items-center gap-2 text-left"
                >
                  <SelectionIcon
                    className={`shrink-0 text-[16px] ${
                      isSelected ? "text-[#12b76a]" : "text-[#98a2b3]"
                    }`}
                  />
                  <span>
                    <span className="font-medium text-[#344054]">
                      {option.label}:
                    </span>{" "}
                    {option.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3.5">
        <FaMoneyBillAlt className="mt-0.5 w-4 shrink-0 text-[18px] text-[#344054]" />
        <div>
          <p className="text-[15px] font-semibold leading-5 text-[#101828]">
            Cash on Delivery
          </p>
          <p className="mt-1 text-[13px] leading-5 text-[#667085]">Available</p>
        </div>
      </div>

      <div className="my-4 border-t border-[#e4e7ec]" />

      <div>
        <h2 className="mb-3 text-[15px] font-semibold leading-5 text-[#101828]">
          Return &amp; Warranty
        </h2>
        <div className="space-y-2.5 text-[13px] leading-5 text-[#667085]">
          <p className="flex items-center gap-3.5">
            <IoIosSync className="w-4 shrink-0 text-[18px] text-[#475467]" />
            <span>3 days easy return</span>
          </p>
          <p className="flex items-center gap-3.5">
            <GoShieldCheck className="w-4 shrink-0 text-[18px] text-[#475467]" />
            <span>{warrantyLabel}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
