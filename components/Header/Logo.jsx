"use client";
import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link
      href="/"
      className="relative block h-[54px] w-28 shrink-0 overflow-hidden sm:h-[64px] sm:w-36 lg:h-[74px] lg:w-44"
    >
      <Image
        priority
        src="/images/mainlogo.png"
        height={136}
        width={170}
        alt="cartout"
        className="h-full w-full scale-[1.18] object-contain object-left -translate-y-1"
      />
    </Link>
  );
};

export default Logo;
