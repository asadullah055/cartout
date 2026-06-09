"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { HiOutlineMinusSm, HiOutlinePlus } from "react-icons/hi";
import { IoShareSocialSharp } from "react-icons/io5";
import { addToCart, writeBuyNowItem } from "@/utils/cart";
import ProductDescription from "./ProductDescription";
import VariantSelector from "./VariantSelector";

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
  const currentPrice = selectedVariant.discountPrice || selectedVariant.price;

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
      <h1 className="text-xl font-medium">{product.productName}</h1>

      <div className="mt-2 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-[#ff3300]">৳ {currentPrice}</span>

          {selectedVariant.discountPrice && (
            <span className="ml-2 text-sm font-bold text-gray-500 line-through">
              ৳ {selectedVariant.price}
            </span>
          )}
        </div>

        <IoShareSocialSharp size={24} className="cursor-pointer text-gray-500" />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="font-medium text-[#669900]">In Stock</p>
          <p className="text-[14px]">
            Only <b>{selectedVariant.stock}</b> left
          </p>
        </div>
        <img src="/images/cartout.png" alt="logo" className="w-30" />
      </div>

      <ProductDescription html={product.shortDescription} />

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
          className="w-[40%] rounded bg-amber-400 px-4 py-2 text-black transition duration-200 hover:bg-amber-500 cursor-pointer"
          type="button"
        >
          Buy Now
        </button>

        <button
          onClick={handleAddToCart}
          className="w-[40%] rounded bg-[#ff3300] px-4 py-2 text-white transition duration-200 hover:bg-orange-600 cursor-pointer"
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
