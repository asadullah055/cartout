import Image from "next/image";
import { FaMoneyBillWave, FaPhoneAlt } from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { ImLocation2 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { RiShieldCheckLine, RiShoppingCart2Line } from "react-icons/ri";

const helpLinks = [
  "Warranty Policy",
  "Return Policy",
  "Privacy Policy",
  "Terms & Condition",
];

const aboutLinks = ["About Us", "Complain / Advice", "Track Order"];

const socialLinks = [
  { label: "Facebook", Icon: FaFacebookF, color: "bg-[#1877f2]" },
  { label: "Instagram", Icon: FaInstagram, color: "bg-[#e4405f]" },
  { label: "Tiktok", Icon: FaTiktok, color: "bg-black" },
  { label: "Youtube", Icon: FaYoutube, color: "bg-[#ff0000]" },
  { label: "X", Icon: FaXTwitter, color: "bg-black" },
];

const paymentMethods = [
  {
    name: "COD",
    subtitle: "Cash On Delivery",
    logo: (
      <FaMoneyBillWave className="h-9 w-9 text-[#f0a400] drop-shadow-[0_0_8px_rgba(245,180,0,0.35)]" />
    ),
  },
  {
    name: "bKash",
    image: "/images/bkash.png",
    imageClassName: "h-11 w-11",
  },
  {
    name: "Rocket",
    image: "/images/rocket.webp",
    imageClassName: "h-10 w-10",
  },
  {
    name: "Nagad",
    image: "/images/nogod.png",
    imageClassName: "h-11 w-11",
  },
  {
    name: "Upay",
    image: "/images/upay.webp",
    imageClassName: "h-11 w-11",
  },
];

const PaymentLogo = ({ method }) => (
  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-[#121820] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_0_18px_rgba(0,0,0,0.35)] sm:h-[62px] sm:w-[62px]">
    {method.image ? (
      <Image
        src={method.image}
        alt={method.name}
        width={48}
        height={48}
        className={`max-h-9 max-w-9 object-contain sm:max-h-none sm:max-w-none ${method.imageClassName || "h-11 w-11"}`}
      />
    ) : (
      method.logo
    )}
  </span>
);

const FooterTitle = ({ children }) => (
  <h3 className="relative mb-6 text-[16px] font-bold uppercase text-[#f5b400]">
    {children}
    <span className="absolute -bottom-2 left-0 h-[2px] w-10 bg-[#f5b400]" />
  </h3>
);

const LinkList = ({ items }) => (
  <ul className="space-y-0">
    {items.map((item) => (
      <li
        key={item}
        className="flex items-center gap-3 border-b border-dashed border-white/10 py-2.5 text-[13px] text-gray-300 last:border-b-0 sm:py-3 sm:text-sm"
      >
        <span className="text-lg leading-none text-[#f5b400]">›</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Footer = () => {
  return (
    <footer className="mt-8 bg-[#0d0d0d] text-gray-300">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-7 px-5 py-8 sm:grid-cols-2 sm:px-6 sm:py-10 lg:grid-cols-[1.2fr_1fr_0.9fr_1.25fr] lg:gap-10 lg:px-8">
        <div className="lg:border-r lg:border-white/20 lg:pr-8">
          <Image
            src="/images/darklogo.png"
            alt="CartOut"
            width={260}
            height={92}
            className="h-auto w-[180px] object-contain sm:w-[220px]"
          />
          <p className="max-w-[310px] text-sm leading-6 text-gray-400">
            Your trusted online shopping destination in Bangladesh. We bring you
            quality products, best prices and reliable service.
          </p>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex gap-3">
              <ImLocation2 className="mt-1 shrink-0 text-xl text-[#f5b400]" />
              <p>
                <span className="font-bold text-white">Address:</span>
                <br />
                Terokhadiya, Road-#3, House-4 Shahmakhdum, Rajshahi-6000,
                Bangladesh.
              </p>
            </div>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#f5b400]" />
              <span>
                <span className="font-bold text-white">Phone:</span>{" "}
                +88-01000-000000
              </span>
            </p>
            <p className="flex items-center gap-3">
              <MdEmail className="text-lg text-[#f5b400]" />
              <span>
                <span className="font-bold text-white">Email:</span>{" "}
                support@cartout.com.bd
              </span>
            </p>
          </div>
        </div>

        <div>
          <FooterTitle>Help</FooterTitle>
          <LinkList items={helpLinks} />
        </div>

        <div className="lg:border-r lg:border-white/20 lg:pr-8">
          <FooterTitle>About Us</FooterTitle>
          <LinkList items={aboutLinks} />
        </div>

        <div>
          <FooterTitle>Social Media</FooterTitle>
          <ul className="space-y-2.5 sm:space-y-3">
            {socialLinks.map(({ label, Icon, color }) => (
              <li key={label} className="flex items-center gap-3 text-[13px] sm:text-sm">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${color}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <FooterTitle>Join Our Community</FooterTitle>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <FiUsers className="h-10 w-10 shrink-0 text-[#f5b400] sm:h-12 sm:w-12" />
              <div className="min-w-0">
                <p className="max-w-[300px] text-[13px] leading-5 text-gray-300 sm:text-sm">
                  Be the first to know about new arrivals, exclusive offers and
                  exciting updates.
                </p>
                <a
                  href="https://www.facebook.com/groups/1409319587782992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-9 items-center justify-center rounded-md bg-[#f5b400] px-6 py-2 text-sm font-bold text-[#111827] hover:bg-[#ffca2c] sm:mt-4 sm:px-8"
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#10151c] px-3 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.75)] sm:px-4">
        <div className="mx-auto max-w-[1050px]">
          <div className="mb-4 flex items-center justify-center gap-2 text-center sm:gap-3">
            <span className="hidden h-px w-[72px] bg-gradient-to-r from-transparent via-[#f5b400] to-[#f5b400] sm:block" />
            <span className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
            </span>
            <h3 className="text-[14px] font-extrabold uppercase tracking-[0.08em] text-[#f5b400] sm:text-lg">
              We Accept
            </h3>
            <span className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
            </span>
            <span className="hidden h-px w-[72px] bg-gradient-to-r from-[#f5b400] via-[#f5b400] to-transparent sm:block" />
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
            {paymentMethods.map((method, index) => (
              <div
                key={method.name}
                className={`flex min-w-0 items-center justify-center ${
                  index === paymentMethods.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="flex w-full min-w-0 items-center justify-start gap-2 sm:min-w-[180px] sm:justify-center sm:gap-3 sm:px-3">
                  <PaymentLogo method={method} />
                  <div className="min-w-0 text-left">
                    <p className="text-[13px] font-bold leading-5 text-white sm:text-[15px]">
                      {method.name}
                    </p>
                    {method.subtitle ? (
                      <p className="text-[9px] font-semibold leading-4 text-white/75 sm:text-[10px]">
                        {method.subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>
                {index < paymentMethods.length - 1 ? (
                  <span className="hidden h-[52px] w-px bg-white/25 lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-3 py-5 sm:px-4">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 text-center text-[13px] text-gray-400 sm:text-sm md:flex-row">
          <p className="leading-5">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-[#f5b400]">CartOut</span>. All
            rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-2 leading-5">
            <RiShieldCheckLine className="text-xl text-[#f5b400]" />
            Secure Shopping <span className="text-white/30">|</span> 100%
            Authentic Products
          </p>
          <p className="flex items-center justify-center gap-2 font-semibold text-[#f5b400]">
            <RiShoppingCart2Line className="text-2xl" />
            www.cartout.com.bd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
