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
  <span className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border border-white/25 bg-[#121820] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_0_18px_rgba(0,0,0,0.35)]">
    {method.image ? (
      <Image
        src={method.image}
        alt={method.name}
        width={48}
        height={48}
        className={`object-contain ${method.imageClassName || "h-11 w-11"}`}
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
        className="flex items-center gap-3 border-b border-dashed border-white/10 py-3 text-sm text-gray-300 last:border-b-0"
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
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_0.9fr_1.25fr] lg:gap-10 lg:px-8">
        <div className="lg:border-r lg:border-white/20 lg:pr-8">
          <Image
            src="/images/darklogo.png"
            alt="CartOut"
            width={260}
            height={92}
            className="h-auto w-[200px] object-contain sm:w-[220px]"
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
          <ul className="space-y-3">
            {socialLinks.map(({ label, Icon, color }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
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
            <div className="flex items-center gap-4">
              <FiUsers className="h-12 w-12 shrink-0 text-[#f5b400]" />
              <div>
                <p className="max-w-[260px] text-sm leading-5 text-gray-300">
                  Be the first to know about new arrivals, exclusive offers and
                  exciting updates.
                </p>
                <button className="mt-4 rounded-md bg-[#f5b400] px-8 py-2 text-sm font-bold text-[#111827] hover:bg-[#ffca2c]">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#10151c] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.75)]">
        <div className="mx-auto max-w-[1050px]">
          <div className="mb-3 flex items-center justify-center gap-3 text-center">
            <span className="hidden h-px w-[72px] bg-gradient-to-r from-transparent via-[#f5b400] to-[#f5b400] sm:block" />
            <span className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
            </span>
            <h3 className="text-[15px] font-extrabold uppercase tracking-[0.08em] text-[#f5b400] sm:text-lg">
              We Accept
            </h3>
            <span className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
            </span>
            <span className="hidden h-px w-[72px] bg-gradient-to-r from-[#f5b400] via-[#f5b400] to-transparent sm:block" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-y-4">
            {paymentMethods.map((method, index) => (
              <div key={method.name} className="flex items-center">
                <div className="flex min-w-[170px] items-center justify-center gap-3 px-3 sm:min-w-[180px]">
                  <PaymentLogo method={method} />
                  <div className="text-left">
                    <p className="text-[15px] font-bold leading-5 text-white">
                      {method.name}
                    </p>
                    {method.subtitle ? (
                      <p className="text-[10px] font-semibold leading-4 text-white/75">
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

      <div className="px-4 py-5">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-[#f5b400]">CartOut</span>. All
            rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <RiShieldCheckLine className="text-xl text-[#f5b400]" />
            Secure Shopping <span className="text-white/30">|</span> 100%
            Authentic Products
          </p>
          <p className="flex items-center gap-2 font-semibold text-[#f5b400]">
            <RiShoppingCart2Line className="text-2xl" />
            www.cartout.com.bd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
