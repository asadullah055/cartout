import {
  FiHeart,
  FiMail,
  FiPhone,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { IoHeadsetOutline } from "react-icons/io5";
import Link from "next/link";
import CartDrawer from "../Cart/CartDrawer";
import CategoryDropdown from "./CategoryDropdown";
import Logo from "./Logo";

const Headers = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <section className="w-full bg-[#0d0d0d] text-white">
        <div className="mx-auto flex min-h-10 w-full max-w-[1440px] items-center justify-between gap-3 px-3 text-[11px] font-medium sm:w-[calc(100%-2rem)] sm:px-5 sm:text-[12px] lg:min-h-[48px] lg:px-8 lg:text-[13px] xl:w-[calc(100%-2.5rem)]">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5 lg:gap-7">
            <a
              href="tel:017XXXXXXX"
              className="flex shrink-0 items-center gap-2 text-white/85 transition hover:text-[#f6bf00]"
            >
              <FiPhone className="text-[#f6bf00]" size={17} />
              <span>017XX-XXX-XXX</span>
            </a>
            <span className="hidden h-5 w-px bg-white/20 md:block" />
            <a
              href="mailto:support@cartout.com.bd"
              className="hidden min-w-0 items-center gap-2 text-white/85 transition hover:text-[#f6bf00] md:flex"
            >
              <FiMail className="shrink-0 text-[#f6bf00]" size={17} />
              <span className="truncate">support@cartout.com.bd</span>
            </a>
          </div>

          <div className="hidden items-center gap-3 text-white/85 lg:flex xl:gap-5">
            <Link href="#" className="transition hover:text-[#f6bf00]">
              Track Order
            </Link>
            <span className="h-5 w-px bg-white/20" />
            <Link href="#" className="transition hover:text-[#f6bf00]">
              Sell on Cartout
            </Link>
            <span className="h-5 w-px bg-white/20" />
            <Link
              href="#"
              className="flex items-center gap-2 transition hover:text-[#f6bf00]"
            >
              <IoHeadsetOutline className="text-[#f6bf00]" size={20} />
              Help & Support
            </Link>
          </div>

          <Link
            href="#"
            className="flex shrink-0 items-center gap-1.5 text-white/85 transition hover:text-[#f6bf00] lg:hidden"
          >
            <IoHeadsetOutline className="text-[#f6bf00]" size={18} />
            <span className="hidden sm:inline">Help</span>
          </Link>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="mx-auto flex min-h-[56px] w-full max-w-[1440px] items-center gap-3 px-3 py-0.5 sm:min-h-[64px] sm:w-[calc(100%-2rem)] sm:px-5 sm:py-1 md:gap-4 lg:min-h-[76px] lg:px-8 lg:py-1 xl:w-[calc(100%-2.5rem)] xl:gap-9">
          <Logo />

          <form className="hidden h-12 min-w-0 flex-1 items-stretch rounded-full border border-gray-200 bg-white lg:flex">
            <CategoryDropdown />
            <input
              type="text"
              className="min-w-0 flex-1 px-4 text-[13px] font-medium text-gray-800 outline-none placeholder:text-gray-400 lg:px-5 lg:text-[14px]"
              placeholder="Search for products, brands and more..."
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex w-14 shrink-0 items-center justify-center rounded-r-full bg-[#0d0d0d] text-white lg:w-[76px]"
            >
              <FiSearch className="h-[22px] w-[22px] lg:h-[25px] lg:w-[25px]" />
            </button>
          </form>

          <div className="ml-auto flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-5 xl:gap-7">
            <CartDrawer showLabel />
            <span className="hidden h-8 w-px bg-gray-200 sm:block" />
            <Link
              href="#"
              className="group relative flex flex-col items-center gap-1 text-gray-950"
              aria-label="Wishlist"
            >
              <FiHeart className="h-7 w-7 sm:h-8 sm:w-8 lg:h-[35px] lg:w-[35px]" strokeWidth={1.8} />
              <span className="text-[11px] font-semibold leading-none sm:text-[12px] lg:text-[13px]">Wishlist</span>
            </Link>
            <span className="hidden h-8 w-px bg-gray-200 sm:block" />
            <Link
              href="#"
              className="group flex flex-col items-center gap-1 text-gray-950"
              aria-label="Account"
            >
              <FiUser className="h-7 w-7 sm:h-8 sm:w-8 lg:h-[35px] lg:w-[35px]" strokeWidth={1.8} />
              <span className="text-[11px] font-semibold leading-none sm:text-[12px] lg:text-[13px]">Account</span>
            </Link>
          </div>
        </div>

        <form className="mx-auto flex w-full max-w-[1440px] items-stretch border-t border-gray-100 px-3 pb-3 sm:w-[calc(100%-2rem)] sm:px-5 sm:pb-4 lg:hidden xl:w-[calc(100%-2.5rem)]">
          <input
            type="text"
            className="min-w-0 flex-1 rounded-l-full border border-r-0 border-gray-200 px-4 py-2.5 text-[13px] outline-none placeholder:text-gray-400 sm:py-3 sm:text-[14px]"
            placeholder="Search products..."
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex w-12 shrink-0 items-center justify-center rounded-r-full bg-[#0d0d0d] text-white sm:w-14"
          >
            <FiSearch className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
          </button>
        </form>
      </section>
    </header>
  );
};

export default Headers;
