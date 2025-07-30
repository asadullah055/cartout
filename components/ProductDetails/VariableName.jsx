"use client";
import { useState } from "react";

const VariableName = () => {
  const sizeOptions = ["Small", "Medium", "Large", "Extra Large"];
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);

  return (
    <div className="mt-4 flex gap-2">
      <label className="block text-gray-700 mb-2">Size:</label>
      <div>
        <h2 className="font-semibold capitalize mb-2">{selectedSize}</h2>

        <div className="flex gap-2 flex-wrap">
          {sizeOptions.map((size, index) => (
            <div key={size + index}>
              <input
                type="radio"
                id={`size_${index}`}
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={() => setSelectedSize(size)}
                className="hidden"
              />
              <label
                htmlFor={`size_${index}`}
                className={`px-3 py-1 border text-sm rounded cursor-pointer 
                ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-400"
                }`}
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VariableName;
