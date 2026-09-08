"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { FaFire, FaStar } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineMinusSm, HiOutlinePlus } from "react-icons/hi";
import { IoShareSocialSharp } from "react-icons/io5";
import { addToCart, writeBuyNowItem } from "@/utils/cart";
import ProductDescription from "./ProductDescription";
import VariantSelector from "./VariantSelector";

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

const toNumberOrNull = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const Details = ({ product }) => {
  const router = useRouter();
  const availableVariants = useMemo(
    () => product.variants.filter((v) => v.availability === true),
    [product.variants]
  );

  const [selectedVariant, setSelectedVariant] = useState(availableVariants[0]);
  const [quantity, setQuantity] = useState(1);

  if (!selectedVariant) return null;

  const maxStock = Math.max(1, selectedVariant.stock || 1);
  const hasActiveDiscount = isDiscountActive(selectedVariant);
  const currentPrice = hasActiveDiscount
    ? selectedVariant.discountPrice
    : selectedVariant.price;
  const regularPrice = Number(selectedVariant.price);
  const salePrice = Number(currentPrice);
  const savedAmount = hasActiveDiscount ? regularPrice - salePrice : 0;
  const savedPercent = hasActiveDiscount
    ? Math.round((savedAmount / regularPrice) * 100)
    : 0;
  const rating = toNumberOrNull(
    product.rating ?? product.averageRating ?? product.avgRating
  );
  const reviewCount = toNumberOrNull(
    product.reviewCount ??
      product.reviewsCount ??
      product.totalReviews ??
      (Array.isArray(product.reviews) ? product.reviews.length : null)
  );
  const soldCount = toNumberOrNull(
    product.soldCount ?? product.totalSold ?? product.sold ?? product.salesCount
  );
  const hasReviewMeta = rating !== null || reviewCount !== null;
  const hasSoldMeta = soldCount !== null;

  const getCartItem = () => ({
    id: `${product._id}-${selectedVariant._id || "default"}`,
    productId: product._id,
    variantId: selectedVariant._id || "default",
    name: product.productName,
    color:
      selectedVariant.attributes?.Color ||
      selectedVariant.attributes?.color ||
      "",
    size:
      selectedVariant.attributes?.Size ||
      selectedVariant.attributes?.size ||
      "",
    unitPrice: currentPrice,
    quantity,
    shippingCharge: product.shippingCharge || {
      insideDhaka: 80,
      outsideDhaka: 120,
    },
    image: product?.images?.[0] || "/images/001.jpg",
  });

  const handleBuyNow = () => {
    writeBuyNowItem(getCartItem());
    router.push("/checkout?buyNow=1");
  };

  const handleAddToCart = () => {
    addToCart(getCartItem());
    toast.success("Product added to cart");
  };

  return (
    <div className="p-2">
      <div className="relative pr-8">
        <h1 className="text-[22px] font-bold leading-tight text-[#151515] md:text-[24px]">
          {product.productName}
        </h1>
        <button
          type="button"
          aria-label="Share product"
          className="absolute right-0 top-0 text-gray-500"
        >
          <IoShareSocialSharp size={23} />
        </button>
      </div>

      {(hasReviewMeta || hasSoldMeta) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-semibold text-gray-800">
          {hasReviewMeta && (
            <>
              {rating !== null && (
                <div className="flex items-center gap-[2px]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={
                        index < Math.round(rating)
                          ? "text-[#f6a800]"
                          : "text-gray-300"
                      }
                      size={13}
                    />
                  ))}
                </div>
              )}
              <span>
                {rating !== null ? rating.toFixed(1) : ""}
                {reviewCount !== null ? ` (${reviewCount} Reviews)` : ""}
              </span>
            </>
          )}

          {hasReviewMeta && hasSoldMeta && (
            <span className="h-4 w-px bg-gray-300" />
          )}

          {hasSoldMeta && (
            <span className="flex items-center gap-1">
              <FiShoppingBag size={13} />
              Sold: {soldCount}
            </span>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-[28px] font-bold leading-none text-[#ff3300]">
          &#2547; {salePrice.toLocaleString("en-US")}
        </span>

        {hasActiveDiscount && (
          <>
            <span className="text-[15px] font-bold text-gray-500 line-through">
              &#2547; {regularPrice.toLocaleString("en-US")}
            </span>
            <span className="rounded-[4px] bg-[#ffe9e5] px-1.5 py-0.5 text-[11px] font-bold text-[#ff3300]">
              Save &#2547;{savedAmount.toLocaleString("en-US")} ({savedPercent}%)
            </span>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] font-bold">
        <p className="text-[#16a34a]">In Stock</p>
        <p className="flex items-center gap-1 text-[#ff5a1f]">
          <FaFire size={12} />
          Only {selectedVariant.stock} left!
        </p>
      </div>

      <ProductDescription html={product.shortDescription} showAsFeatures />

      {product.variants.some(
        (v) => v.attributes && Object.keys(v.attributes).length > 0
      ) && (
        <VariantSelector
          variants={availableVariants}
          selectedVariant={selectedVariant}
          setSelectedVariant={(variant) => {
            setSelectedVariant(variant);
            setQuantity(1);
          }}
        />
      )}

      <div className="mt-4 flex items-center gap-2">
        <label className="text-gray-700">Quantity:</label>
        <button
          className="bg-gray-200 p-1"
          type="button"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        >
          <HiOutlineMinusSm size={20} />
        </button>
        <span>{quantity}</span>
        <button
          className="bg-gray-200 p-1"
          type="button"
          onClick={() => setQuantity((prev) => Math.min(maxStock, prev + 1))}
        >
          <HiOutlinePlus />
        </button>
      </div>

      <div className="mt-4 flex w-full items-center gap-2 md:w-[80%]">
        <button
          onClick={handleBuyNow}
          className="w-[40%] cursor-pointer rounded bg-amber-400 px-4 py-2 text-black transition duration-200 hover:bg-amber-500"
          type="button"
        >
          Buy Now
        </button>

        <button
          onClick={handleAddToCart}
          className="w-[40%] cursor-pointer rounded bg-[#ff3300] px-4 py-2 text-white transition duration-200 hover:bg-orange-600"
          type="button"
        >
          Add to Cart
        </button>

        <CiHeart size={35} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Details;
