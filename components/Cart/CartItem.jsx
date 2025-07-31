import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const CartItem = () => (
  <div className="bg-white p-3 mb-2">
    {/* Shop Row */}
    <div className="flex items-center ">
      <input type="checkbox" className="mr-2" />
      <span className="font-medium text-gray-700 inline-flex items-center gap-1">
        Cartout Retailer <IoIosArrowForward />
      </span>
    </div>
    {/* Product Row */}
    <div className="flex items-center justify-between flex-col md:flex-row gap-2 py-2">
      <div className="flex items-center gap-2">
        <input type="checkbox" className="mr-4" />
        <div>
          <Image
            height={250}
            width={250}
            src="/images/0111.jpg" // Replace with actual image
            alt="T-shirt"
            className="md:w-24 rounded mr-4"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-1">
          <div className="md:w-[60%]">
            <h3 className="text-[14px] text-gray-800 line-clamp-2">
              200+ GSM Premium Drop Shoulder TShirt | MF-681 200+ GSM Premium
              Drop Shoulder TShirt | MF-681
            </h3>
            <p className="text-xs text-gray-500 ">
              Cartout, Color Family: White, Size: Int: XXL
            </p>
          </div>
          <div className="flex justify-between md:justify-around md:w-[40%]">
            <div className="flex flex-col">
              <span className="text-[#ff3300] text-lg ">৳ 650</span>
              <span className="text-gray-600 line-through text-sm mb-2">
                ৳ 650
              </span>

              <div className="md:flex hidden items-center gap-2 rounded">
                <button className="text-gray-700">
                  <CiHeart size={28} />
                </button>
                <button className="text-red-500">
                  <FaRegTrashAlt size={20} />
                </button>
              </div>
            </div>
            <div className="flex items-center rounded">
              <div className="border border-orange-500 rounded">
                <button className="px-2 text-gray-400">-</button>
                <span className="px-2">1</span>
                <button className="px-2 text-gray-400">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-around border w-1/2">
        <div className="flex flex-col">
          <span className="text-[#ff3300] text-lg ">৳ 650</span>
          <span className="text-gray-600 line-through text-sm mb-2">৳ 650</span>
        </div>
        <div className="md:flex hidden items-center gap-3 rounded">
          <button className="text-gray-700 mt-2">
            <CiHeart size={28} />
          </button>
          <button className="text-red-500 mt-2">
            <FaRegTrashAlt size={20} />
          </button>
        </div>
        <div className="flex items-center rounded">
          <div className="border">
            <button className="px-2 text-gray-400">-</button>
            <span className="px-2">1</span>
            <button className="px-2 text-gray-400">+</button>
          </div>
        </div>
      </div> */}
    </div>
  </div>
);

export default CartItem;
