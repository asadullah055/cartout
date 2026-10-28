import Link from "next/link";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

const SellerInfo = ({ product }) => {
  const sellerName =
    product?.creator?.shopName ||
    product?.creator?.name ||
    "Cartout Retailer";
  const sellerId = product?.creator?._id;
  const sku = product?.sku || "N/A";
  const categoryName = product?.category?.name || "N/A";
  const categoryId = product?.category?._id;
  const brandName = product?.brand?.name || "N/A";
  const brandId = product?.brand?._id;
  return (
    <div className="rounded-md px-5 pb-5 pt-2 text-[#475467]">
      {/* Sold by and Chat */}
      <div className="flex min-h-[68px] items-center justify-between rounded-lg border border-[#dbe2f0] bg-white px-4 py-3 shadow-[0_1px_3px_rgba(16,24,40,0.08)]">
        <div className="min-w-0">
          <p className="mb-1 text-[12px] font-medium leading-4 text-[#667085]">
            Sold By
          </p>
          <p className="truncate text-[15px] font-semibold leading-5 text-[#4169e1]">
            {sellerId ? (
              <Link
                href={`/products?${new URLSearchParams({ seller: sellerId, sellerName })}`}
                className="no-underline hover:no-underline"
              >
                {sellerName}
              </Link>
            ) : (
              sellerName
            )}
          </p>
        </div>
        <button
          type="button"
          disabled
          className="ml-3 flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-[#4169e1] disabled:opacity-100"
        >
          <HiOutlineChatBubbleLeftRight className="text-[18px]" />
          Chat
        </button>
      </div>

      {/* Product Info */}
      <dl className="mt-4 space-y-2 border-t border-[#e4e7ec] pt-4">
        <div className="grid grid-cols-[76px_minmax(0,1fr)] items-start gap-2">
          <dt className="text-[12px] font-bold uppercase leading-5 tracking-[0.03em] text-[#344054]">
            SKU
          </dt>
          <dd className="break-all text-[14px] font-medium leading-5 text-[#344054]">
            {sku}
          </dd>
        </div>
        <div className="grid grid-cols-[76px_minmax(0,1fr)] items-start gap-2">
          <dt className="text-[12px] font-bold uppercase leading-5 tracking-[0.03em] text-[#344054]">
            Category
          </dt>
          <dd className="text-[14px] font-medium leading-5 text-[#344054]">
            {categoryId ? (
              <Link
                href={`/products?${new URLSearchParams({ category: categoryId, categoryName })}`}
                className="text-[#4169e1] no-underline hover:no-underline"
              >
                {categoryName}
              </Link>
            ) : (
              categoryName
            )}
          </dd>
        </div>
        <div className="grid grid-cols-[76px_minmax(0,1fr)] items-start gap-2">
          <dt className="text-[12px] font-bold uppercase leading-5 tracking-[0.03em] text-[#344054]">
            Brand
          </dt>
          <dd className="text-[14px] font-medium leading-5 text-[#344054]">
            {brandId ? (
              <Link
                href={`/products?${new URLSearchParams({ brand: brandId, brandName })}`}
                className="text-[#4169e1] no-underline hover:no-underline"
              >
                {brandName}
              </Link>
            ) : (
              brandName
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default SellerInfo;
