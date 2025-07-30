import { CiHeart } from "react-icons/ci";
import { HiOutlineMinusSm, HiOutlinePlus, HiOutlineStar } from "react-icons/hi";
import { IoShareSocialSharp } from "react-icons/io5";
import ColorFamily from "./ColorFamily";
import VariableName from "./VariableName";
const Details = () => {
  return (
    <div className="p-2">
      <h1 className="font-medium text-xl">
        Powerful Handheld Massage Gun for Deep Tissue Relief - Compact & Elegant
        Design
      </h1>
      {/* rating */}
      <div className="flex items-center text-[14px] mt-2">
        <span className="text-orange-500 inline-flex items-center">
          <HiOutlineStar />
          <HiOutlineStar />
          <HiOutlineStar />
          <HiOutlineStar />
          <HiOutlineStar />
        </span>
        <span className="text-blue-600 text-[12px] ml-2">(100 reviews)</span>
      </div>
      {/* Price and discountprice*/}
      <div className="mt-2 flex items-center justify-between">
        <div className="">
          <span className="text-2xl font-bold  text-[#ff3300]">৳ 2,500</span>
          <span className="text-sm text-gray-500 line-through ml-2 font-bold">
            ৳ 3,000
          </span>
        </div>
        <div className="text-gray-500 cursor-pointer">
          <IoShareSocialSharp size={24} />
        </div>
      </div>
      {/* stock */}
      <div className="mt-2 flex items-center justify-between">
        <div className="">
          <p className="font-medium text-[#669900] ">In Stock</p>
          <p className="text-[14px]">
            Only <b>70</b> left
          </p>
        </div>
        <div className="pt-2 flex justify-center">
          <img src="/images/cartout.png" alt="WGP logo" className="w-30" />
        </div>
      </div>
      {/* short description */}
      <ul className="mt-4 list-disc list-inside text-black">
        <li className="">Ulanzi MT-11 Durable Tripod</li>
        <li>Ulanzi MT-11 Durable Tripod</li>
        <li>Ulanzi MT-11 Durable Tripod</li>
        <li>Ulanzi MT-11 Durable Tripod</li>
        <li>Ulanzi MT-11 Durable Tripod</li>
        <li>Ulanzi MT-11 Durable Tripod</li>
      </ul>
      {/* color and variant select radio  */}
      <ColorFamily />
      {/* size */}
      <VariableName />

      {/* quantity */}
      <div className="mt-4 flex items-center gap-2">
        <label className="block text-gray-700 mb-2">Quantity:</label>
        <button className="cursor-pointer bg-gray-200 p-1">
          <HiOutlineMinusSm size={20} />
        </button>
        <span>1</span>

        <button className="cursor-pointer bg-gray-200 p-1">
          <HiOutlinePlus />
        </button>
      </div>
      {/* Add to cart and by now button */}
      <div className="mt-4 flex items-center gap-2 md:w-[80%] w-full">
        <button className="bg-amber-400 px-4 py-2 rounded hover:bg-white border border-amber-400 transition duration-200 cursor-pointer w-[40%]">
          Buy Now
        </button>
        <button className="bg-[#ff3300] text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200 cursor-pointer w-[40%]">
          Add to Cart
        </button>
        <div className="cursor-pointer">
          <CiHeart size={35} />
        </div>
      </div>
    </div>
  );
};

export default Details;
