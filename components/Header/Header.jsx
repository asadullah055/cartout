// "use client";

import { AiOutlineMenu } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline, IoPersonSharp } from "react-icons/io5";
import Navigation from "../Menu/Navigation";
import Search from "../Search";
import Logo from "./Logo";
const Headers = () => {
  return (
    <header className=" bg-[#f5f5f5] w-full shadow">
      <section className="flex sm:justify-evenly justify-between items-center p-2 max-w-[1280px] mx-auto">
        <AiOutlineMenu className="font-bold md:hidden block" size={25} />
        <Logo />
        {/* search */}
        <div className="w-[50%]  sm:block hidden">
          <Search />
        </div>
        {/* cart wishlist and profile */}
        <div className="flex justify-between items-center gap-4">
          <div className="cursor-pointer relative">
            <CiHeart size={30} />
            <span className="w-[16px] h-[16px] inline-block bg-red-500 text-white rounded-full text-[10px] leading-4 text-center -top-2 -right-1 absolute">
              0
            </span>
          </div>
          {/* profile */}
          <div className="cursor-pointer">
            <IoPersonSharp size={30} />
          </div>
          {/* cart */}
          <div className="cursor-pointer relative">
            <IoCartOutline size={30} />
            <span className="w-[16px] h-[16px] inline-block bg-red-500 text-white rounded-full text-[10px] leading-4 text-center -top-2 -right-1 absolute">
              0
            </span>
          </div>
        </div>
      </section>
      <div className="w-full sm:hidden p-2 pb-1">
        <Search />
      </div>
      {/* Navigation */}
      <Navigation />
    </header>
  );
};

export default Headers;
