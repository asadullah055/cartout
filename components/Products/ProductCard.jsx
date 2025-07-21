const ProductCard = ({ product }) => {
  const discount = product.discountPrice
    ? Math.round(
        ((product.discountPrice - product.price) / product.discountPrice) * 100
      )
    : null;
  return (
    <div className="bg-white hover:shadow-md rounded-md p-2 md:p4 w-full mt-2 ">
      <div className="relative">
        {discount && (
          <span className="absolute top-1 right-1 bg-red-600 text-white text-sm px-2 py-0.5 rounded">
            -{discount} %
          </span>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-36 object-contain"
        />
      </div>
      <h2 className="text-[14px] mt-2 font-semibold line-clamp-1">
        {product.title}
      </h2>
      <div className="flex justify-center items-center gap-2 mt-1">
        <span className="text-red-600 font-bold text-[18px]">
          ৳{product.price}
        </span>
        {product.discountPrice && (
          <span className="line-through text-gray-500 text-sm">
            ৳{product.discountPrice}
          </span>
        )}
      </div>
      <div className="mt-2 flex justify-between gap-2">
        <button className="bg-orange-600 text-[9px] md:text-[12px] text-white p-1 rounded text-sm cursor-pointer font-bold">
          BUY NOW
        </button>
        <button className="text-[9px] md:text-[12px] p-1 text-orange-500 border border-orange-600  rounded text-sm cursor-pointer font-bold">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
