// CartPage.jsx

import CartItem from "@/components/Cart/CartItem";
import OrderSummary from "@/components/Cart/OrderSummary";
import { FaRegTrashAlt } from "react-icons/fa";

const cartItems = [
  {
    image: "/images/001.jpg",
    title: "200+ GSM Premium Drop Shoulder T-Shirt | MF-681",
    details: "Manfare, Color Family: White, Size: Int: XXL",
    price: 650,
    qty: 1,
  },
  {
    image: "/images/012.jpg",
    title:
      "(Choice Free Gift) 4 Pcs Sachet Pack of Parachute Naturale Advanced Hair Fall Control Shampoo",
    details: "Parachute",
    price: 0,
    qty: 1,
    free: true,
  },
  {
    image: "/images/001.jpg",
    title: "MINISTER ONE WASH (LEMON & JASMINE) - 1 kg",
    details: "No Brand",
    price: 112,
    qty: 4,
    ends: "Jul 31 23:59:59",
  },
];

const CartPage = () => (
  <div className="bg-gray-100">
    <div className="p-2 max-w-[1280px] mx-auto ">
    <div className="flex gap-2 flex-wrap md:flex-nowrap">
      <div className="md:w-[70%] w-full">
        <div className="flex items-center p-3 bg-white mb-2">
          <input type="checkbox" className="mr-2" />
          <span className="font-semibold text-sm">SELECT ALL (8 ITEM(S))</span>
          <button className="ml-auto text-red-500">
            <FaRegTrashAlt size={22} />
          </button>
        </div>
        <div className="rounded">
          <CartItem />
          <CartItem />
        </div>
      </div>
      <div className="md:w-[30%] w-full">
        <OrderSummary />
      </div>
    </div>
  </div>
  </div>
);

export default CartPage;
