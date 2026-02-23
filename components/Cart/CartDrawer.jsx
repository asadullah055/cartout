"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import {
  cartEventName,
  readCart,
  removeCartItem,
  updateCartItemQuantity,
} from "@/utils/cart";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const drawerRef = useRef();

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const handleQuantityChange = (id, delta) => {
    const targetItem = cartItems.find((item) => item.id === id);
    if (!targetItem) return;

    const updatedItems = updateCartItemQuantity(id, targetItem.quantity + delta);
    setCartItems(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = removeCartItem(id);
    setCartItems(updatedItems);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setCartItems(readCart());

    const syncCart = () => setCartItems(readCart());
    window.addEventListener(cartEventName, syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener(cartEventName, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <div onClick={toggleDrawer} className="relative cursor-pointer">
        <IoCartOutline size={30} />
        <span className="absolute -right-1 -top-2 inline-block h-[16px] w-[16px] rounded-full bg-red-500 text-center text-[10px] leading-4 text-white">
          {totalQuantity || "0"}
        </span>
      </div>

      {isOpen && (
        <div
          ref={drawerRef}
          className="absolute right-0 top-12 z-50 flex h-[80vh] w-[100vw] max-w-sm flex-col bg-white shadow-lg transition-transform duration-300 md:h-[70vh]"
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 shadow">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-500">
              <GoHomeFill size={22} className="text-gray-500" />
              Cartout
            </h3>
            <button onClick={toggleDrawer} type="button">
              <IoMdClose size={22} className="cursor-pointer text-red-500" />
            </button>
          </div>

          <div className="mt-3 flex-1 overflow-y-auto px-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 border-b border-gray-200 py-3">
                  <Image
                    src={item.image || "/images/001.jpg"}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="line-clamp-2 text-sm font-semibold">{item.name}</p>
                    {item.color ? (
                      <p className="text-[12px] text-gray-700">
                        Color: <span className="font-semibold">{item.color}</span>
                      </p>
                    ) : null}
                    {item.size ? (
                      <p className="text-[12px] text-gray-700">
                        Size: <span className="font-semibold">{item.size}</span>
                      </p>
                    ) : null}
                    <p className="text-[12px] text-gray-700">
                      Unit Price: <span className="font-semibold text-gray-900">৳ {item.unitPrice}</span>
                    </p>
                    <p className="text-[12px] text-gray-700">
                      Amount: <span className="font-semibold text-gray-900">৳ {item.unitPrice * item.quantity}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex overflow-hidden rounded border border-orange-500">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="bg-gray-100 px-2 hover:bg-gray-200"
                        type="button"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="bg-gray-100 px-2 hover:bg-gray-200"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-2 text-red-500"
                      type="button"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-500">Your cart is empty</div>
            )}
          </div>

          <div className="border-t border-gray-200 bg-white p-2">
            <div className="mb-3 flex justify-end text-md font-semibold">
              <span className="me-2 text-gray-700">Sub-Total:</span>
              <span>৳ {total}</span>
            </div>
            <div className="flex justify-between gap-2">
              <Link
                href="/cart"
                onClick={toggleDrawer}
                className="w-1/2 cursor-pointer rounded border border-amber-400 bg-amber-400 px-2 py-2 text-center transition duration-200 hover:bg-white"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={toggleDrawer}
                className="w-1/2 cursor-pointer rounded bg-[#ff3300] px-2 py-2 text-center text-white transition duration-200 hover:bg-orange-600"
              >
                Checkout Now ({totalQuantity})
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
