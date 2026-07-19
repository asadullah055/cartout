"use client";
import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/" className="block w-[86px] shrink-0 sm:w-[120px]">
      <Image
        priority
        src="/images/new logo.jpeg"
        height={136}
        width={170}
        alt="cartout"
        className="h-auto w-full object-contain"
      />
    </Link>
  );
};

export default Logo;
