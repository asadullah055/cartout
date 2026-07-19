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
    image: product?.images?.[0] || "/images/001.jpg",
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
    <div className="mt-2 w-full rounded-md bg-white p-3 hover:shadow-md">
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden rounded-md border border-gray-100 bg-gray-50 p-2 transition duration-200 hover:border-orange-100">
          {discount && (
            <span className="absolute right-1 top-1 rounded bg-red-600 px-2 py-0.5 text-xs text-white">
              -{discount}%
            </span>
          )}

          <img
            src={product?.images?.[0]}
            alt={product?.productName}
            className="h-36 w-full object-contain"
          />
        </div>

        <h2 className="mt-2 line-clamp-1 text-[14px] font-semibold">
          {product?.productName}
        </h2>
      </Link>

      <div className="mt-1 flex items-center justify-center gap-2">
        {hasActiveDiscount ? (
          <>
            <span className="text-[18px] font-bold text-[#ff3300]">
              ৳{variant.discountPrice}
            </span>
            <span className="text-sm text-gray-500 line-through">৳{variant.price}</span>
          </>
        ) : (
          <span className="text-[18px] font-bold text-[#ff3300]">৳{variant.price}</span>
        )}
      </div>

      <div className="mt-2 flex justify-between gap-1 sm:gap-2">
        <button
          className="rounded bg-[#ff3300] px-2 py-1 text-[10px] font-bold text-white md:text-[12px] transition duration-200 hover:bg-orange-600 cursor-pointer"
          type="button"
          onClick={handleBuyNow}
        >
          BUY NOW
        </button>
        <button
          className="rounded border border-orange-600 px-2 py-1 text-[10px] font-bold text-orange-500 md:text-[12px] transition duration-200 hover:bg-orange-50 cursor-pointer"
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
