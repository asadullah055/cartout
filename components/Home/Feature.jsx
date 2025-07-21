"use client";
import { useState } from "react";

const Feature = () => {
  const items = ["Offers", "Top Product", "Specials", "Best Sellers"];
  const [activeTab, setActiveTab] = useState("Offers");
  return (
    <div className="mt-4">
      <h1 className="text-center text-[25px] font-[700] text-[#333333] mb-6">
        FEATURED PRODUCTS
      </h1>
      <ul className="flex justify-center items-center gap-6 uppercase font-bold">
        {items.map((item) => (
          <li
            key={item}
            onClick={() => setActiveTab(item)}
            className={`cursor-pointer relative pb-1 group transition-all duration-200 ${
              activeTab === item
                ? "text-orange-500"
                : "text-gray-500 hover:text-orange-400"
            }`}
          >
            {item}
            <span
              className={`absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left transition-transform duration-300 
                ${
                  activeTab === item
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feature;
