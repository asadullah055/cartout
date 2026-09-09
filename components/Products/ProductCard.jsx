"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addToCart, writeBuyNowItem } from "@/utils/cart";

const isDiscountActive = (variant) => {
  const discountPrice = Number(variant?.discountPrice);
  const regularPrice = Number(variant?.price);

  if (!discountPrice || !regularPrice || discountPrice >= regularPrice) return false;

  if (!variant.discountStartDate && !variant.discountEndDate) return true;

  const now = new Date();
  const startDate = variant.discountStartDate ? new Date(variant.discountStartDate) : null;
  const endDate = variant.discountEndDate ? new Date(variant.discountEndDate) : null;

  if (startDate && Number.isNaN(startDate.getTime())) return false;
  if (endDate && Number.isNaN(endDate.getTime())) return false;
  if (startDate && now < startDate) return false;
  if (endDate && now > endDate) return false;

  return true;
};

const FALLBACK_IMAGE = "/images/001.jpg";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const availableVariants =
    product?.variants?.filter((v) => v.availability === true) || [];

  if (availableVariants.length === 0) return null;

  const variant = availableVariants[0];
  const hasActiveDiscount = isDiscountActive(variant);

  let discount = null;
  if (hasActiveDiscount) {
    discount = Math.round(
      ((variant.price - variant.discountPrice) / variant.price) * 100
    );
  }

  const unitPrice = hasActiveDiscount ? variant.discountPrice : variant.price;

  const getCartItem = () => ({
    id: `${product._id}-${variant._id || "default"}`,
    productId: product._id,
    variantId: variant._id || "default",
    name: product.productName,
    color: variant.attributes?.Color || variant.attributes?.color || "",
    size: variant.attributes?.Size || variant.attributes?.size || "",
    unitPrice,
    quantity: 1,
    shippingCharge: product.shippingCharge || {
      insideDhaka: 80,
      outsideDhaka: 120,
    },
    image: product?.images?.[0] || FALLBACK_IMAGE,
  });

  const handleAddToCart = () => {
    addToCart(getCartItem());
    toast.success("Product added to cart");
  };

  const handleBuyNow = () => {
    writeBuyNowItem(getCartItem());
    router.push("/checkout?buyNow=1");
  };

  return (
    <div className="mt-2 w-full rounded-md bg-white p-1.5 hover:shadow-md sm:p-2">
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden rounded-md border border-gray-100 bg-white p-1 transition duration-200 hover:border-orange-100">
          {discount && (
            <span className="absolute right-1 top-1 rounded bg-red-600 px-2 py-0.5 text-xs text-white">
              -{discount}%
            </span>
          )}

          <img
            src={product?.images?.[0] || FALLBACK_IMAGE}
            alt={product?.productName}
            className="h-36 w-full object-contain object-center sm:h-40"
            onError={(event) => {
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
        </div>

        <h2 className="mt-2 line-clamp-1 text-[13px] font-semibold sm:text-[14px]">
          {product?.productName}
        </h2>
      </Link>

      <div className="mt-1 flex min-w-0 items-baseline justify-center gap-1.5 sm:gap-2">
        {hasActiveDiscount ? (
          <>
            <span className="text-[16px] font-bold leading-6 text-[#ff3300] sm:text-[18px]">
              ৳{variant.discountPrice}
            </span>
            <span className="truncate text-[12px] text-gray-500 line-through sm:text-sm">৳{variant.price}</span>
          </>
        ) : (
          <span className="text-[16px] font-bold leading-6 text-[#ff3300] sm:text-[18px]">৳{variant.price}</span>
        )}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1.5 sm:gap-2">
        <button
          className="min-h-8 whitespace-nowrap rounded bg-[#ff3300] px-1.5 py-0.5 text-[9px] font-bold leading-4 text-white transition duration-200 hover:bg-orange-600 sm:px-2 sm:text-[10px] xl:text-[12px]"
          type="button"
          onClick={handleBuyNow}
        >
          BUY NOW
        </button>
        <button
          className="min-h-8 whitespace-nowrap rounded border border-orange-600 px-1.5 py-0.5 text-[9px] font-bold leading-4 text-orange-500 transition duration-200 hover:bg-orange-50 sm:px-2 sm:text-[10px] xl:text-[12px]"
          type="button"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
