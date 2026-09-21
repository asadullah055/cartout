"use client";

import {
  cartEventName,
  readCart,
  refreshCartShopNames,
  removeCartItem,
  updateCartItemQuantity,
} from "@/utils/cart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

export default function CartDrawer({ showLabel = false }) {
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
  const getShopName = (item) => item.shopName || item.sellerName || "Cartout Retailer";
  const getStockLimit = (item) => {
    const maxStock = Number(item?.maxStock);
    return Number.isFinite(maxStock) ? maxStock : null;
  };
  const hasStockIssue = cartItems.some((item) => {
    const stockLimit = getStockLimit(item);
    return stockLimit !== null && Number(item.quantity || 0) > stockLimit;
  });

  useEffect(() => {
    const initialItems = readCart();
    setCartItems(initialItems);
    refreshCartShopNames(initialItems).then(setCartItems);

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
      <div
        onClick={toggleDrawer}
        className="relative flex cursor-pointer flex-col items-center gap-1 text-gray-950"
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleDrawer();
          }
        }}
      >
        <div className="relative">
          <IoCartOutline
            className={
              showLabel
                ? "h-7 w-7 sm:h-8 sm:w-8 lg:h-[37px] lg:w-[37px]"
                : "h-[30px] w-[30px]"
            }
          />
          <span className="absolute -right-2 -top-2 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#f6bf00] px-1 text-[10px] font-bold leading-none text-gray-950 sm:h-[20px] sm:min-w-[20px] sm:text-[11px] lg:h-[22px] lg:min-w-[22px] lg:text-[12px]">
            {totalQuantity || "0"}
          </span>
        </div>
        {showLabel ? (
          <span className="text-[11px] font-semibold leading-none sm:text-[12px] lg:text-[13px]">Cart</span>
        ) : null}
      </div>

      {isOpen && (
        <div
          ref={drawerRef}
          className="fixed inset-x-0 top-[136px] z-[80] flex h-[calc(100dvh-136px)] w-full flex-col bg-white shadow-2xl transition-transform duration-300 md:absolute md:inset-x-auto md:right-0 md:top-11 md:h-[70vh] md:w-[380px] md:max-w-[calc(100vw-24px)]"
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

          <div className="mt-3 flex-1 overflow-y-auto px-3 sm:px-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 py-3">
                  {(() => {
                    const stockLimit = getStockLimit(item);
                    const isOutOfStock = stockLimit !== null && stockLimit <= 0;
                    const isOverStock =
                      stockLimit !== null &&
                      stockLimit > 0 &&
                      Number(item.quantity || 0) > stockLimit;

                    return (
                      <>
                  <Link
                    href="#"
                    className="mb-2 inline-flex max-w-full items-center gap-1 truncate text-sm font-semibold text-gray-700"
                  >
                    <span className="truncate">{getShopName(item)}</span>
                    <span aria-hidden="true">&gt;</span>
                  </Link>
                  <div className="flex gap-3">
                  <Image
                    src={item.image || "/images/001.jpg"}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="h-14 w-14 shrink-0 rounded object-contain"
                  />
                  <div className="min-w-0 flex-1">
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
                    {isOutOfStock ? (
                      <p className="text-[12px] font-semibold text-red-600">Out of stock</p>
                    ) : isOverStock ? (
                      <p className="text-[12px] font-semibold text-red-600">
                        Only {stockLimit} left in stock
                      </p>
                    ) : null}
                    <p className="text-[12px] text-gray-700">
                      Unit Price: <span className="font-semibold text-gray-900">Tk {item.unitPrice}</span>
                    </p>
                    <p className="text-[12px] text-gray-700">
                      Amount: <span className="font-semibold text-gray-900">Tk {item.unitPrice * item.quantity}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-center gap-2">
                    <div className="flex overflow-hidden rounded border border-orange-500">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="bg-gray-100 px-2 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                        type="button"
                        disabled={Number(item.quantity || 0) <= 1}
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="bg-gray-100 px-2 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                        type="button"
                        disabled={isOutOfStock || (stockLimit !== null && item.quantity >= stockLimit)}
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
                      </>
                    );
                  })()}
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-500">Your cart is empty</div>
            )}
          </div>

          <div className="border-t border-gray-200 bg-white p-2">
            <div className="mb-3 flex justify-end text-md font-semibold">
              <span className="me-2 text-gray-700">Sub-Total:</span>
              <span>Tk {total}</span>
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
                aria-disabled={hasStockIssue}
                className={`w-1/2 rounded px-2 py-2 text-center text-white transition duration-200 ${
                  hasStockIssue
                    ? "pointer-events-none cursor-not-allowed bg-gray-300 text-gray-600"
                    : "cursor-pointer bg-[#ff3300] hover:bg-orange-600"
                }`}
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
