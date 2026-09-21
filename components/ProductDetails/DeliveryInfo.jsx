"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BsTruck } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { IoIosSync } from "react-icons/io";
import { IoCloseOutline, IoInformationCircleOutline } from "react-icons/io5";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const DeliveryInfo = ({ product }) => {
  const [selectedArea, setSelectedArea] = useState("insideDhaka");
  const [isWarrantyPopoverOpen, setIsWarrantyPopoverOpen] = useState(false);
  const warrantyPopoverRef = useRef(null);
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

  useEffect(() => {
    if (!isWarrantyPopoverOpen) return undefined;

    const handleClickOutside = (event) => {
      if (
        warrantyPopoverRef.current &&
        !warrantyPopoverRef.current.contains(event.target)
      ) {
        setIsWarrantyPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isWarrantyPopoverOpen]);

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
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-semibold leading-5 text-[#101828]">
            Return &amp; Warranty
          </h2>
          <div ref={warrantyPopoverRef} className="relative">
            <button
              aria-expanded={isWarrantyPopoverOpen}
              aria-label="View return and warranty details"
              className="text-[#667085] transition hover:text-[#101828]"
              onClick={() => setIsWarrantyPopoverOpen((isOpen) => !isOpen)}
              type="button"
            >
              <IoInformationCircleOutline size={18} />
            </button>

            {isWarrantyPopoverOpen ? (
              <div className="absolute right-0 top-7 z-[80] max-h-[78vh] w-[min(560px,calc(100vw-32px))] overflow-y-auto rounded-md border border-[#e4e7ec] bg-white p-5 text-left shadow-[0_18px_48px_rgba(15,23,42,0.22)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="text-[20px] font-semibold leading-7 text-[#101828]">
                    Return &amp; Warranty
                  </h3>
                  <button
                    aria-label="Close"
                    className="text-[#667085] hover:text-[#101828]"
                    onClick={() => setIsWarrantyPopoverOpen(false)}
                    type="button"
                  >
                    <IoCloseOutline size={24} />
                  </button>
                </div>

                <div className="text-[14px] leading-[18px] text-[#101828]">
                  <div className="flex items-center gap-3.5">
                    <IoIosSync className="w-5 shrink-0 text-[22px] text-[#98a2b3]" />
                    <span>14 days easy return</span>
                  </div>

                  <div className="mt-4">
                    <p>
                      Change of mind is not applicable as a Return Reason for this
                      product due to one or more of the following reasons:
                    </p>
                    <ul className="mt-4 list-disc space-y-0.5 pl-5">
                      <li>Not applicable for overseas seller</li>
                      <li>Digital goods such as mobile top up cards</li>
                      <li>All grocery categories</li>
                      <li>All swimwear and underwear</li>
                      <li>All products shipped from overseas</li>
                      <li>All products delivered by seller after signing the delivery slip</li>
                    </ul>
                    <p className="mt-5">
                      For more details visit our{" "}
                      <Link
                        className="font-medium text-[#175cd3]"
                        href="/content/returns-and-refunds"
                        onClick={() => setIsWarrantyPopoverOpen(false)}
                      >
                        FAQ
                      </Link>
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-3.5">
                    <GoShieldCheck className="w-5 shrink-0 text-[22px] text-[#98a2b3]" />
                    <span>{warrantyLabel}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="text-[13px] leading-5 text-[#101828]">
          <div className="flex items-center gap-3.5">
            <IoIosSync className="w-4 shrink-0 text-[18px] text-[#475467]" />
            <span className="text-[14px]">14 days easy return</span>
          </div>

          <div className="mt-2.5 flex items-center gap-3.5">
            <GoShieldCheck className="w-4 shrink-0 text-[18px] text-[#475467]" />
            <span className="text-[14px]">{warrantyLabel}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DeliveryInfo;
