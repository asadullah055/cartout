"use client";

import Link from "next/link";
import { addToCart } from "@/utils/cart";

const ProductCard = ({ product }) => {
  const availableVariants =
    product?.variants?.filter((v) => v.availability === true) || [];

  if (availableVariants.length === 0) return null;

  const variant = availableVariants[0];

  let discount = null;
  if (variant.discountPrice && variant.discountPrice < variant.price) {
    discount = Math.round(
      ((variant.price - variant.discountPrice) / variant.price) * 100
    );
  }

  const unitPrice = variant.discountPrice || variant.price;

  const handleAddToCart = () => {
    addToCart({
      id: `${product._id}-${variant._id || "default"}`,
      productId: product._id,
      variantId: variant._id || "default",
      name: product.productName,
      color: variant.attributes?.Color || variant.attributes?.color || "",
      size: variant.attributes?.Size || variant.attributes?.size || "",
      unitPrice,
      quantity: 1,
      image: product?.images?.[0] || "/images/001.jpg",
    });
  };

  return (
    <div className="mt-2 w-full rounded-md bg-white p-3 hover:shadow-md">
      <Link target="_blank" href={`/product/${product.slug}`}>
        <div className="relative">
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
        {variant.discountPrice ? (
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
        <button className="rounded bg-[#ff3300] px-2 py-1 text-[10px] font-bold text-white md:text-[12px]" type="button">
          BUY NOW
        </button>
        <button
          className="rounded border border-orange-600 px-2 py-1 text-[10px] font-bold text-orange-500 md:text-[12px]"
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
