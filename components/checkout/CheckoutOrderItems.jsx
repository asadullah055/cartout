import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const CheckoutItem = ({ item }) => {
  const rowTotal = item.unitPrice * item.quantity;

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-12 items-center gap-1 sm:gap-4">
        <div className="col-span-12 flex items-center gap-1 sm:col-span-6 sm:gap-3">
          <div className="flex flex-row items-center gap-3 sm:items-start">
            <div className="h-[93px] w-[93px] rounded-lg bg-gray-100 sm:h-[50px] sm:w-[50px]">
              <div className="relative h-[100px] w-[100px] overflow-hidden rounded-lg bg-gray-100 sm:h-[50px] sm:w-[50px]">
                <Image
                  width={400}
                  height={400}
                  alt={item.name}
                  className="h-full w-full rounded-lg object-contain p-[2px]"
                  src={item.image || "/images/001.jpg"}
                />
              </div>
            </div>
            <div className="flex w-[200px] flex-col gap-1 sm:gap-2 md:w-[300px]">
              <Link className="line-clamp-2 text-sm text-primaryBlackText hover:text-link" href="#">
                {item.name}
              </Link>
              <div className="flex flex-col">
                <p className="text-sm text-[#999999]">
                  {item.color ? `Color: ${item.color}` : ""} {item.size ? `Size: ${item.size}` : ""}
                </p>
              </div>
              <div className="mt-1 flex items-center justify-between text-start text-highlight sm:hidden md:mt-0">
                <p className="text-sm font-semibold sm:text-base xl:pr-5">Tk {item.unitPrice}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 mt-3 hidden text-start text-highlight sm:block md:mt-0">
          <p className="flex justify-between font-semibold">Tk {item.unitPrice}</p>
        </div>
        <div className="col-span-2 mt-3 hidden justify-between text-primaryBlackText sm:block md:mt-0 md:flex">
          {item.quantity}
        </div>
        <div className="col-span-2 mt-3 hidden justify-between text-start font-semibold text-primaryBlackText sm:block md:mt-0 md:flex md:justify-end">
          <p>Tk {rowTotal}</p>
        </div>
      </div>
      <hr className="my-3 border border-gray-200 md:block" />
    </div>
  );
};

const CheckoutOrderItems = ({ cartItems }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col gap-8 md:rounded md:border md:border-[#EEEEEE] md:bg-white">
      <div className="flex flex-col gap-5 rounded-md p-0 shadow-card md:bg-white md:p-6">
        <div className="hidden border-b border-[#EEEEEE] pb-3 text-base font-semibold text-primaryBlackText sm:text-xl md:block">
          Order summary - <span>{totalItems} </span> items
        </div>
        <div className="hidden w-full grid-cols-12 gap-4 rounded bg-[#FFFAE6] px-3 py-2 text-sm font-medium text-primaryBlackText sm:text-base md:grid">
          <p className="col-span-6">Product Details</p>
          <p className="col-span-2">Price</p>
          <p className="col-span-2">QTY</p>
          <p className="col-span-2 text-end">Total</p>
        </div>
        <div className="md:space-y-5">
          <div className="mb-3 rounded border border-[#EEEEEE] bg-white px-[10px] py-4 md:mb-0">
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-primaryBlackText hover:text-highlight">
                <Link className="text-sm font-semibold" href="#">
                  Cartup Retail
                </Link>
                <IoIosArrowForward />
              </div>
            </div>
            <div className="my-3 border-b border-gray-300 md:border"></div>

            {cartItems.length ? (
              cartItems.map((item) => <CheckoutItem key={item.id} item={item} />)
            ) : (
              <div className="py-8 text-center text-sm text-gray-500">No items found in cart</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrderItems;
