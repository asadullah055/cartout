import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const getShopName = (item) => item.shopName || item.sellerName || "Cartout Retailer";

const getStockLimit = (item) => {
  const maxStock = Number(item?.maxStock);
  return Number.isFinite(maxStock) ? maxStock : null;
};

const CartItem = ({ item, onQtyChange, onRemove }) => {
  const stockLimit = getStockLimit(item);
  const isOutOfStock = stockLimit !== null && stockLimit <= 0;
  const isOverStock =
    stockLimit !== null && stockLimit > 0 && Number(item.quantity || 0) > stockLimit;

  return (
    <div className="mb-2 bg-white p-3">
      <div className="mb-3 flex items-center">
        <span className="inline-flex min-w-0 items-center gap-1 text-sm font-semibold text-gray-700 sm:text-base">
          {getShopName(item)} <IoIosArrowForward />
        </span>
      </div>

      <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 md:grid-cols-[104px_minmax(0,1fr)_120px_120px_32px] md:items-center md:gap-5">
        <Image
          height={250}
          width={250}
          src={item.image || "/images/001.jpg"}
          alt={item.name}
          className="h-24 w-[88px] rounded object-contain md:h-24 md:w-[104px]"
        />

        <div className="min-w-0">
          <h3 className="line-clamp-2 text-[14px] font-medium leading-5 text-gray-900">
            {item.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            {item.color ? `Color: ${item.color}` : ""} {item.size ? `Size: ${item.size}` : ""}
          </p>
          {isOutOfStock ? (
            <p className="mt-1 text-xs font-semibold text-red-600">Out of stock</p>
          ) : isOverStock ? (
            <p className="mt-1 text-xs font-semibold text-red-600">
              Only {stockLimit} left in stock
            </p>
          ) : null}
        </div>

        <div className="col-span-2 flex items-center justify-between gap-4 md:col-span-1 md:block">
          <span className="text-lg font-medium text-[#ff3300]">Tk {item.unitPrice}</span>
          <span className="text-sm font-medium text-gray-700 md:mt-1 md:block">
            Total: Tk {item.unitPrice * item.quantity}
          </span>
        </div>

        <div className="col-span-2 flex items-center justify-between gap-3 md:col-span-1 md:justify-center">
          <div className="flex h-9 overflow-hidden rounded border border-orange-500">
            <button
              className="flex w-9 items-center justify-center text-gray-500 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => onQtyChange(item.id, -1)}
              type="button"
              disabled={Number(item.quantity || 0) <= 1}
            >
              -
            </button>
            <span className="flex min-w-9 items-center justify-center border-x border-orange-500 px-3">
              {item.quantity}
            </span>
            <button
              className="flex w-9 items-center justify-center text-gray-500 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => onQtyChange(item.id, 1)}
              type="button"
              disabled={isOutOfStock || (stockLimit !== null && item.quantity >= stockLimit)}
            >
              +
            </button>
          </div>

          <button
            className="text-red-500 md:hidden"
            onClick={() => onRemove(item.id)}
            type="button"
            aria-label="Remove item"
          >
            <FaRegTrashAlt size={20} />
          </button>
        </div>

        <div className="hidden justify-end md:flex">
          <button
            className="text-red-500"
            onClick={() => onRemove(item.id)}
            type="button"
            aria-label="Remove item"
          >
            <FaRegTrashAlt size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
