import { FaPhoneAlt } from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  return (
    <footer className="bg-white p-4">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 ">
        {/* Contact Us */}
        <div className="col-span-1">
          <h3 className="text-black text-[16px] font-bold mb-2">Contact Us</h3>
          <p className="mt-2 flex  gap-1">
            <ImLocation2 className="mt-1" /> Terokhadiya, Road-#3, House-4{" "}
            <br />
            Shahmakhdum, Rajshahi-6000, Bangladesh.
          </p>
          <p className="mt-2 flex items-center gap-1">
            <span>
              <FaPhoneAlt />
            </span>{" "}
            +88-01000-000000
          </p>
          <p className="mt-2 flex items-center gap-1">
            {" "}
            <MdEmail /> support@cartandout.com
          </p>
        </div>

        <div className="flex justify-between gap-4 md:gap-0 w-full col-span-2 flex-wrap">
          {/* Company */}
          <div>
            <h3 className="text-black font-bold mb-2 text-[16px]">Company</h3>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Outlets</li>
              <li>Blogs</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-black font-bold mb-2 text-[16px]">Customer</h3>
            <ul className="space-y-1">
              <li>Login</li>
              <li>Register</li>
              <li>Marketplace</li>
              <li>Brands</li>
              <li>Best Deals</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-black font-bold mb-2 text-[16px]">Help</h3>
            <ul className="space-y-1">
              <li>FAQs</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Cookies Policy</li>
              <li>Replacement Policy</li>
              <li>EMI Terms & Conditions</li>
            </ul>
          </div>

          {/* Social & Apps */}
          <div>
            <h3 className="text-black font-bold mb-2 text-[16px]">
              Social Media for CartOut
            </h3>
            <div className="flex gap-2 text-[18px] mb-4">
              <FaFacebookF className="hover:text-blue-600 cursor-pointer w-7 h-7 rounded-full border p-1" />
              <FaLinkedinIn className="hover:text-blue-700 cursor-pointer w-7 h-7 rounded-full border p-1" />
              <FaYoutube className="hover:text-red-600 cursor-pointer w-7 h-7 rounded-full border p-1" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer w-7 h-7 rounded-full border p-1" />
              <FaTiktok className="hover:text-black cursor-pointer w-7 h-7 rounded-full border p-1" />
              <FaXTwitter className="hover:text-black cursor-pointer w-7 h-7 rounded-full border p-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-4">
        <p className="text-center font-semibold text-sm text-gray-500 mt-2">
          © {new Date().getFullYear()} Cartout.com. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
