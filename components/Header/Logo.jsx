"use client";
import LogoImage from "@/public/images/cartout.png";
import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/" className="w-[30%] sm:w-[20%]">
      <Image
        priority
        src={LogoImage}
        height={"100%"}
        width={"100%"}
        alt="cartout"
      />
    </Link>
  );
};

export default Logo;
