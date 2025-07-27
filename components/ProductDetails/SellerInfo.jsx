import { FaCommentDots } from "react-icons/fa";

const SellerInfo = () => {
  return (
    <div className="rounded-md p-4 text-sm space-y-4 text-gray-700">
      {/* Sold by and Chat */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-xs">Sold by</p>
          <p className="text-blue-800 font-semibold">Vivo Official</p>
        </div>
        <button className="flex items-center gap-1 text-blue-600 text-sm font-medium">
          <FaCommentDots /> Chat Now
        </button>
      </div>

      {/* Seller Ratings */}
      <div className="grid grid-cols-3 gap-2 text-center border-t border-b py-3">
        <div>
          <p className="text-gray-500 text-xs">Positive Seller Ratings</p>
          <p className="text-gray-400 text-sm">New Seller</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Ship on Time</p>
          <p className="text-black font-semibold text-lg">100%</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Chat Response Rate</p>
          <p className="text-gray-400 text-sm">Not enough data</p>
        </div>
      </div>

      {/* Go to Store */}
      <div className="text-center">
        <button className="text-blue-600 text-sm font-medium hover:underline">
          GO TO STORE
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <p>
          <strong>SKU:</strong> N/A
        </p>
        <p>
          <strong>CATEGORY:</strong> WGP MINI UPS
        </p>
        <p>
          <strong>TAGS:</strong> POWER BANK, WGP, WGP MINI UPS
        </p>
        <p>
          <strong>BRAND:</strong> WGP
        </p>
      </div>

      {/* Logo */}
      <div className="pt-2 flex justify-center">
        <img src="/images/cartout.png" alt="WGP logo" className="w-30" />
      </div>
    </div>
  );
};

export default SellerInfo;
