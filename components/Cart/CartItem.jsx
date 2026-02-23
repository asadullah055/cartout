import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const CartItem = ({ item, onQtyChange, onRemove }) => (
  <div className="mb-2 bg-white p-3">
    <div className="flex items-center">
      <span className="inline-flex items-center gap-1 font-medium text-gray-700">
        Cartout Retailer <IoIosArrowForward />
      </span>
    </div>

    <div className="flex flex-col gap-2 py-2 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <div>
          <Image
            height={250}
            width={250}
            src={item.image || "/images/001.jpg"}
            alt={item.name}
            className="mr-4 rounded md:w-24"
          />
        </div>
        <div className="flex flex-col gap-1 md:flex-row">
          <div className="md:w-[60%]">
            <h3 className="line-clamp-2 text-[14px] text-gray-800">{item.name}</h3>
            <p className="text-xs text-gray-500">
              {item.color ? `Color: ${item.color}` : ""} {item.size ? `Size: ${item.size}` : ""}
            </p>
          </div>
          <div className="flex justify-between md:w-[40%] md:justify-around">
            <div className="flex flex-col">
              <span className="text-lg text-[#ff3300]">Tk {item.unitPrice}</span>
              <span className="mb-2 text-sm font-medium text-gray-700">
                Total: Tk {item.unitPrice * item.quantity}
              </span>

              <div className="hidden items-center gap-2 rounded md:flex">
                <button className="text-red-500" onClick={() => onRemove(item.id)} type="button">
                  <FaRegTrashAlt size={20} />
                </button>
              </div>
            </div>
            <div className="flex items-center rounded">
              <div className="rounded border border-orange-500">
                <button
                  className="px-2 text-gray-500"
                  onClick={() => onQtyChange(item.id, -1)}
                  type="button"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  className="px-2 text-gray-500"
                  onClick={() => onQtyChange(item.id, 1)}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CartItem;
