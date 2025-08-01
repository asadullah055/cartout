"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

const sampleCartItems = [
  {
    id: 1,
    name: "Zuqo Men's Sneaker - Moca",
    color: "Brown",
    size: 40,
    unitPrice: 1200,
    quantity: 1,
    image: "/images/001.jpg",
  },
  {
    id: 2,
    name: "Zuqo Men's Sneaker : Metro - Harmony",
    color: "Olive",
    size: 40,
    unitPrice: 1200,
    quantity: 1,
    image: "/images/0111.jpg",
  },
  {
    id: 3,
    name: "Zuqo Men's Sneaker - Prime Lace",
    color: "Black",
    size: 40,
    unitPrice: 1250,
    quantity: 1,
    image: "/images/012.jpg",
  },
  {
    id: 4,
    name: "Zuqo Men's Sneaker - Prime Lace",
    color: "Black",
    size: 40,
    unitPrice: 1250,
    quantity: 1,
    image: "/images/012.jpg",
  },
  {
    id: 5,
    name: "Zuqo Men's Sneaker - Prime Lace",
    color: "Black",
    size: 40,
    unitPrice: 1250,
    quantity: 1,
    image: "/images/012.jpg",
  },
  {
    id: 6,
    name: "Zuqo Men's Sneaker - Prime Lace",
    color: "Black",
    size: 40,
    unitPrice: 1250,
    quantity: 1,
    image: "/images/012.jpg",
  },
];

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const drawerRef = useRef();
  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  return (
    <div className="relative">
      {/* Cart Icon */}
      <div onClick={toggleDrawer} className="relative cursor-pointer">
        <IoCartOutline size={30} />
        <span className="w-[16px] h-[16px] inline-block bg-red-500 text-white rounded-full text-[10px] leading-4 text-center -top-2 -right-1 absolute">
          {cartItems.length || "0"}
        </span>
      </div>

      {/* Drawer Panel */}
      {isOpen && (
        <div
          ref={drawerRef}
          className={`absolute right-0 top-12 h-[80vh] md:h-[70vh] w-[100vw] max-w-sm bg-white z-50 shadow-lg transition-transform duration-300 flex flex-col ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 shadow">
            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-500">
              <GoHomeFill size={22} className="text-gray-500" />
              Cartout
            </h3>
            <button onClick={toggleDrawer}>
              <IoMdClose size={22} className="text-red-500 cursor-pointer" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4 mt-3">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 py-3 border-b border-gray-200"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold line-clamp-2 text-sm">
                      {item.name}
                    </p>
                    <p className="text-[12px] text-gray-700">
                      Color: <span className="font-semibold">{item.color}</span>
                    </p>
                    <p className="text-[12px] text-gray-700">
                      Size: <span className="font-semibold">{item.size}</span>
                    </p>
                    <p className="text-[12px] text-gray-700">
                      Unit Price:{" "}
                      <span className="text-gray-900 font-semibold">
                        ৳ {item.unitPrice}
                      </span>
                    </p>
                    <p className="text-[12px] text-gray-700">
                      Amount:{" "}
                      <span className="text-gray-900 font-semibold">
                        ৳ {item.unitPrice * item.quantity}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <div className="flex border border-orange-500 rounded overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2 bg-gray-100 hover:bg-gray-200"
                      >
                        −
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2 bg-gray-100 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 mt-2"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                Your cart is empty
              </div>
            )}
          </div>

          {/* Footer */} 
          <div className="p-2 border-t border-gray-200 bg-white">
            <div className="flex justify-end font-semibold text-md mb-3">
              <span className="text-gray-700 me-2">Sub-Total:</span>
              <span>৳ {total}</span>
            </div>
            <div className="flex justify-between gap-2">
              <Link
                href="/cart"
                onClick={toggleDrawer}
                className="bg-amber-400 px-2 py-2 rounded hover:bg-white border border-amber-400 transition duration-200 cursor-pointer w-1/2 text-center"
              >
                View Cart
              </Link>
              <button className="bg-[#ff3300] text-white px-2 py-2 rounded hover:bg-orange-600 transition duration-200 cursor-pointer w-1/2">
                Checkout Now ({cartItems.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
