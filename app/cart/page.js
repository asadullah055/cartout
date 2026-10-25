"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/Cart/CartItem";
import OrderSummary from "@/components/Cart/OrderSummary";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  cartEventName,
  calculateShippingFeeBySeller,
  readCart,
  refreshCartShopNames,
  removeCartItem,
  updateCartItemQuantity,
  writeCart,
} from "@/utils/cart";

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    const initialItems = readCart();
    setCartItems(initialItems);
    setIsCartLoaded(true);
    const initialSnapshot = JSON.stringify(initialItems);
    refreshCartShopNames(initialItems, { persist: false }).then((items) => {
      // A delayed refresh must not restore items removed while it was loading.
      if (!active || JSON.stringify(readCart()) !== initialSnapshot) return;
      if (JSON.stringify(items) !== initialSnapshot) writeCart(items);
      setCartItems(items);
    });

    const syncCart = () => setCartItems(readCart());
    window.addEventListener(cartEventName, syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      active = false;
      window.removeEventListener(cartEventName, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  useEffect(() => {
    if (isCartLoaded && cartItems.length === 0) router.replace("/");
  }, [isCartLoaded, cartItems.length, router]);

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
  const shippingFee = useMemo(() => {
    if (totalItems === 0) return 0;
    return calculateShippingFeeBySeller(cartItems, "outsideDhaka");
  }, [cartItems, totalItems]);
  const stockIssue = useMemo(() => {
    const item = cartItems.find((entry) => {
      const maxStock = Number(entry?.maxStock);
      return Number.isFinite(maxStock) && Number(entry.quantity || 0) > maxStock;
    });

    if (!item) return "";

    const maxStock = Number(item.maxStock);
    return maxStock <= 0
      ? `${item.name || "This product"} is out of stock.`
      : `${item.name || "This product"} has only ${maxStock} items in stock.`;
  }, [cartItems]);

  if (!isCartLoaded || cartItems.length === 0) return null;

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-[1440px] p-2">
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
            <OrderSummary
              totalItems={totalItems}
              subtotal={subtotal}
              shippingFee={shippingFee}
              checkoutDisabled={Boolean(stockIssue)}
              message={stockIssue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
