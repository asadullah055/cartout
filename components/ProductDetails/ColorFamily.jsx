"use client";

import { useState } from "react";

const ColorFamily = () => {
  const colors = ["red", "blue", "green", "yellow", "black", "white"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  return (
    <div className="mt-4 flex gap-2">
      <label className="block text-gray-700 mb-2">Color Family:</label>
      <div>
        <h2 className="font-semibold capitalize mb-2">{selectedColor}</h2>
        <div className="flex gap-2">
          {colors.map((color, index) => (
            <div key={color + index}>
              <input
                type="radio"
                id={`color_${index}`}
                name="color"
                value={color}
                checked={selectedColor === color}
                onChange={() => setSelectedColor(color)}
                className="hidden"
              />
              <label
                htmlFor={`color_${index}`}
                className={`flex flex-col p-1 border border-gray-800 cursor-pointer h-8 w-8 ${
                  selectedColor === color ? "ring-1 ring-black" : ""
                }`}
                style={{ backgroundColor: color }}
              ></label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorFamily;
