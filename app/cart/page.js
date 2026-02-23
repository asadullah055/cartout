"use client";

import { useEffect, useMemo, useState } from "react";
import CartItem from "@/components/Cart/CartItem";
import OrderSummary from "@/components/Cart/OrderSummary";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  cartEventName,
  readCart,
  removeCartItem,
  updateCartItemQuantity,
  writeCart,
} from "@/utils/cart";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

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

  const handleQtyChange = (id, delta) => {
    const item = cartItems.find((entry) => entry.id === id);
    if (!item) return;
    setCartItems(updateCartItemQuantity(id, item.quantity + delta));
  };

  const handleRemove = (id) => {
    setCartItems(removeCartItem(id));
  };

  const handleClear = () => {
    writeCart([]);
    setCartItems([]);
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cartItems]
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-[1280px] p-2">
        <div className="flex flex-wrap gap-2 md:flex-nowrap">
          <div className="w-full md:w-[70%]">
            <div className="mb-2 flex items-center bg-white p-3">
              <span className="text-sm font-semibold">SELECT ALL ({totalItems} ITEM(S))</span>
              <button className="ml-auto text-red-500" onClick={handleClear} type="button">
                <FaRegTrashAlt size={22} />
              </button>
            </div>
            <div className="rounded">
              {cartItems.length ? (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQtyChange={handleQtyChange}
                    onRemove={handleRemove}
                  />
                ))
              ) : (
                <div className="rounded bg-white p-6 text-center text-gray-500">Your cart is empty</div>
              )}
            </div>
          </div>
          <div className="w-full md:w-[30%]">
            <OrderSummary totalItems={totalItems} subtotal={subtotal} shippingFee={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
