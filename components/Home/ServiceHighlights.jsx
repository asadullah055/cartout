"use client";

import { FaArrowRotateLeft, FaTruckFast } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";
import { RiPriceTag3Line } from "react-icons/ri";

const highlights = [
  {
    title: "Fastest Home Delevery",
    Icon: FaTruckFast,
    color: "text-[#f5a400]",
  },
  {
    title: "Exchange Facility",
    Icon: FiPackage,
    color: "text-[#20b86a]",
  },
  {
    title: "3 Days Return Policy",
    Icon: FaArrowRotateLeft,
    color: "text-[#ff5a66]",
  },
  {
    title: "Best Price in BD",
    Icon: RiPriceTag3Line,
    color: "text-[#ff7a1a]",
  },
];

const ServiceHighlights = () => {
  return (
    <section className="px-3 pt-4 md:px-0 md:pt-5">
      <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_3px_12px_rgba(15,23,42,0.06)] sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ title, Icon, color }) => (
          <div
            key={title}
            className="flex min-h-[88px] items-center gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0 sm:border-r sm:last:border-r-0 sm:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r"
          >
            <Icon className={`h-9 w-9 shrink-0 ${color}`} />
            <h2 className="text-[15px] font-semibold leading-snug text-[#202938] md:text-base">
              {title}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceHighlights;
