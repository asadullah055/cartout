import { IoMdChatbubbles } from "react-icons/io";

const SellerInfo = () => {
  return (
    <div className="rounded-md p-4 text-sm space-y-4 text-gray-800">
      {/* Sold by and Chat */}
      <div className="flex justify-between items-center border-b pb-3 border-gray-200">
        <div>
          <p className="text-gray-800 font-semibold text-xs">Sold by</p>
          <p className="uppercase text-[16px] font-medium">Cartout Retailer</p>
        </div>
        <button
          disabled
          className="flex items-center gap-1 text-blue-600 text-sm font-medium"
        >
          <IoMdChatbubbles /> Chat Now
        </button>
      </div>

      {/* Seller Ratings */}
      <div className="grid grid-cols-3 gap-2">
        <p className="text-gray-500 text-xs">Positive Seller Ratings</p>
        <p className="text-gray-500 text-xs">Ship on Time</p>
        <p className="text-gray-500 text-xs">Chat Response Rate</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <p className="text-black font-semibold text-lg text-center">100%</p>
        <p className="text-black font-semibold text-lg text-center">100%</p>
        <p className="text-black font-semibold text-lg text-center">100%</p>
      </div>

      {/* Go to Store */}
      <div className="text-center">
        <button className="text-blue-600 cursor-pointer text-sm font-medium hover:underline">
          GO TO STORE
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <p className="capitalize">
          <strong>SKU:</strong> N/A
        </p>
        <p className="capitalize">
          <strong>CATEGORY:</strong> WGP Mini ups
        </p>
        <p className="capitalize">
          <strong>TAGS:</strong> Power Band, UPS
        </p>
        <p className="capitalize">
          <strong>BRAND:</strong> wgp
        </p>
      </div>
    </div>
  );
};

export default SellerInfo;
