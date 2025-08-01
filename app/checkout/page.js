import AddAddress from "@/components/checkout/AddAddress";
import Address from "@/components/checkout/Address";
import Image from "next/image";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
const CheckOutPage = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="max-w-[1280px] mx-auto ">
        <div className="flex flex-col p-0 lg:flex-row xl:gap-[16px]">
          <div className="w-full">
            <div className="mb-[8px] bg-white p-4 md:mb-[16px] md:rounded-md md:p-6 mt-3">
              <div className="mt-0">
                <div className="flex w-full items-center justify-between">
                  <h2 class="text-sm font-medium text-gray-900 sm:text-lg">
                    Select a Delivery Address
                  </h2>
                  <button class="flex items-center gap-1 font-medium text-orange-500 disabled:cursor-not-allowed disabled:text-[#999] cursor-pointer">
                    {" "}
                    <GoPlus size={25} />
                    <span>Add Address</span>
                  </button>
                </div>
                <Address />
              </div>
            </div>
            {/* summary */}
            <div className="flex flex-col gap-8 md:rounded md:border md:border-[#EEEEEE] md:bg-white">
              <div className="flex flex-col gap-5 rounded-md p-0 shadow-card md:bg-white md:p-6">
                <div class="hidden border-b border-[#EEEEEE] pb-3 text-base font-semibold text-primaryBlackText sm:text-xl md:block">
                  Order summary - <span>3 </span> items
                </div>
                {/* Product Details */}
                <div class="hidden w-full grid-cols-12 gap-4 rounded bg-[#FFFAE6] px-3 py-2 text-sm font-medium text-primaryBlackText sm:text-base md:grid">
                  <p class="col-span-6">Product Details</p>
                  <p class="col-span-2">Price</p>
                  <p class="col-span-2">QTY</p>
                  <p class="col-span-2 text-end">Total</p>
                </div>
                {/* items */}
                <div className="md:space-y-5">
                  <div className="mb-3 rounded border border-[#EEEEEE] bg-white px-[10px] py-4 md:mb-0">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1 text-primaryBlackText hover:text-highlight">
                        <Link className="text-sm font-semibold " href="#">
                          Cartup Retail
                        </Link>
                        <IoIosArrowForward />
                      </div>
                    </div>
                    {/* hr */}
                    <div className="my-3 border-b border-gray-300 md:border"></div>
                    {/* items detail */}
                    <div className="flex flex-col">
                      <div className="grid grid-cols-12 items-center gap-1 sm:gap-4">
                        <div className="col-span-12 flex items-center gap-1 sm:col-span-6 sm:gap-3">
                          <div className="flex flex-row items-center gap-3 sm:items-start">
                            <div className="h-[93px] w-[93px] rounded-lg bg-gray-100 sm:h-[50px] sm:w-[50px]">
                              <div className="h-[100px] w-[100px] relative overflow-hidden bg-gray-100 sm:h-[50px] sm:w-[50px] rounded-lg">
                                <Image
                                  width={400}
                                  height={400}
                                  alt="product-image 0"
                                  class="transition-opacity duration-500 opacity-100 h-full w-full sm:h-[50px] sm:w-[50px] rounded-lg object-contain p-[2px]"
                                  src="/images/001.jpg"
                                />
                              </div>
                            </div>
                            <div class="flex w-[200px] flex-col gap-1 sm:gap-2  md:w-[300px]">
                              <Link
                                class="line-clamp-2 text-sm text-primaryBlackText hover:text-link"
                                href="/product/bmw_umbrella_12_rib_auto_open_auto_close_7823586376730_k0ot3p"
                              >
                                Premium BMW 12 Ribs Umbrella | Auto Lock | UV
                                Protected | BMW Umbrella | Chata | bmw ছাতা | 12
                                Shik
                              </Link>
                              <div class="flex flex-col">
                                <p class="hidden text-sm text-[#999999] sm:block">
                                  Clothing Size-One Size, Color-Maroon
                                </p>
                                <p class="block text-sm text-[#999999]  sm:hidden">
                                  Clothing Size-One Size, Color-Maroon
                                </p>
                                <div>
                                  <p class="text-sm text-[#ec008c]">
                                    Fulfilled by Cartup
                                  </p>
                                </div>
                              </div>
                              <div class="mt-1 flex items-center justify-between text-start text-highlight sm:hidden md:mt-0">
                                <p class="text-sm font-semibold sm:text-base xl:pr-5">
                                  ৳ 499
                                </p>
                                <p class="hidden justify-end font-medium text-primaryBlackText line-through md:flex xl:pr-5">
                                  ৳ 800
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-span-2 mt-3 hidden text-start text-highlight sm:block md:mt-0">
                          <p class="flex justify-between font-semibold ">
                            <span class="block font-medium md:hidden">
                              Price:{" "}
                            </span>
                            ৳ 499
                          </p>
                          <p class="hidden font-medium text-primaryBlackText line-through md:flex xl:pr-5">
                            ৳ 800
                          </p>
                        </div>
                        {/* quantity */}
                        <div class="col-span-2 mt-3 hidden justify-between text-primaryBlackText sm:block md:mt-0 md:flex">
                          3
                        </div>
                        {/* price */}
                        <div class="col-span-2 mt-3 hidden justify-between text-start font-semibold text-primaryBlackText sm:block md:mt-0 md:flex md:justify-end">
                          <span class="block font-medium md:hidden">
                            Total:{" "}
                          </span>
                          <p>৳ 1,497</p>
                        </div>
                      </div>
                      <hr className="my-3 md:block border border-gray-200" />
                    </div>
                    <div className="flex flex-col">
                      <div className="grid grid-cols-12 items-center gap-1 sm:gap-4">
                        <div className="col-span-12 flex items-center gap-1 sm:col-span-6 sm:gap-3">
                          <div className="flex flex-row items-center gap-3 sm:items-start">
                            <div className="h-[93px] w-[93px] rounded-lg bg-gray-100 sm:h-[50px] sm:w-[50px]">
                              <div className="h-[100px] w-[100px] relative overflow-hidden bg-gray-100 sm:h-[50px] sm:w-[50px] rounded-lg">
                                <Image
                                  width={400}
                                  height={400}
                                  alt="product-image 0"
                                  class="transition-opacity duration-500 opacity-100 h-full w-full sm:h-[50px] sm:w-[50px] rounded-lg object-contain p-[2px]"
                                  src="/images/001.jpg"
                                />
                              </div>
                            </div>
                            <div class="flex w-[200px] flex-col gap-1 sm:gap-2  md:w-[300px]">
                              <Link
                                class="line-clamp-2 text-sm text-primaryBlackText hover:text-link"
                                href="/product/bmw_umbrella_12_rib_auto_open_auto_close_7823586376730_k0ot3p"
                              >
                                Premium BMW 12 Ribs Umbrella | Auto Lock | UV
                                Protected | BMW Umbrella | Chata | bmw ছাতা | 12
                                Shik
                              </Link>
                              <div class="flex flex-col">
                                <p class="hidden text-sm text-[#999999] sm:block">
                                  Clothing Size-One Size, Color-Maroon
                                </p>
                                <p class="block text-sm text-[#999999]  sm:hidden">
                                  Clothing Size-One Size, Color-Maroon
                                </p>
                                <div>
                                  <p class="text-sm text-[#ec008c]">
                                    Fulfilled by Cartup
                                  </p>
                                </div>
                              </div>
                              <div class="mt-1 flex items-center justify-between text-start text-highlight sm:hidden md:mt-0">
                                <p class="text-sm font-semibold sm:text-base xl:pr-5">
                                  ৳ 499
                                </p>
                                <p class="hidden justify-end font-medium text-primaryBlackText line-through md:flex xl:pr-5">
                                  ৳ 800
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-span-2 mt-3 hidden text-start text-highlight sm:block md:mt-0">
                          <p class="flex justify-between font-semibold ">
                            <span class="block font-medium md:hidden">
                              Price:{" "}
                            </span>
                            ৳ 499
                          </p>
                          <p class="hidden font-medium text-primaryBlackText line-through md:flex xl:pr-5">
                            ৳ 800
                          </p>
                        </div>
                        {/* quantity */}
                        <div class="col-span-2 mt-3 hidden justify-between text-primaryBlackText sm:block md:mt-0 md:flex">
                          3
                        </div>
                        {/* price */}
                        <div class="col-span-2 mt-3 hidden justify-between text-start font-semibold text-primaryBlackText sm:block md:mt-0 md:flex md:justify-end">
                          <span class="block font-medium md:hidden">
                            Total:{" "}
                          </span>
                          <p>৳ 1,497</p>
                        </div>
                      </div>
                      <hr className="my-3 md:block border border-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* order summery */}
          <div className="lg:min-w-[312px] mt-3">
            <div className="sticky top-36 rounded bg-[#FFFFFF] p-0 md:p-5 lg:p-4">
              <div class="p-3 md:p-0">
                <h3 class="mb-3 text-sm font-bold text-primaryBlackText md:mb-0">
                  Order Summary:
                </h3>
                <hr class="mb-5 mt-3 hidden md:block" />
                <div class="flex flex-col gap-3">
                  <div class="flex justify-between">
                    <p class="flex w-full justify-between text-sm font-medium text-primaryBlackText sm:text-base">
                      <span>Product Price:</span>{" "}
                      <span class="font-semibold text-primaryBlackText">
                        ৳ 1,250
                      </span>
                    </p>
                  </div>
                  <div class="flex justify-between">
                    <span class="flex w-full justify-between text-sm font-medium text-primaryBlackText sm:text-base">
                      <p>
                        Delivery <span class="inline xl:inline">Charge</span>:
                      </p>{" "}
                      <span class="font-semibold text-primaryBlackText">
                        ৳ 140
                      </span>
                    </span>
                  </div>
                </div>
                <div class="my-2 hidden border-b border-dashed sm:text-base md:my-6 md:block"></div>
                <div class="mb-0 hidden justify-between md:mb-6 md:flex">
                  <div class="flex w-full justify-between text-sm font-bold md:text-base md:font-medium">
                    <p class="text-primaryBlackText">
                      Total{" "}
                      <span class="inline lg:hidden xl:inline">Payment</span>:
                    </p>{" "}
                    <span class="font-semibold text-primaryBlackText">
                      ৳ 1,390
                    </span>
                  </div>
                </div>
                <div class="mt-3 border-b border-dashed md:my-6 lg:hidden"></div>
                <div class="hidden md:block">
                  <div>
                    <p class="text-sm font-semibold text-primaryBlackText sm:text-base">
                      Have a Cartup Coupon?
                    </p>
                    <form class="mt-2 flex flex-row gap-2">
                      <div class="w-full">
                        <input
                          class="text-sm p-inputtext p-component border-[#ddd] h-[42px] w-[250px] lg:w-full rounded-lg"
                          required=""
                          placeholder="Promo / Coupon Code"
                          data-pc-name="inputtext"
                          data-pc-section="root"
                          type="text"
                          value=""
                        />
                      </div>
                      <div>
                        <button
                          aria-label="Apply"
                          class="p-button p-component flex bg-highlight border-none sm:w-[100px] h-[42px] text-sm text-white rounded lg:w-full !px-4"
                          type="submit"
                          data-pc-name="button"
                          data-pc-section="root"
                        >
                          <span
                            class="p-button-label p-c font-medium w-full"
                            data-pc-section="label"
                          >
                            Apply
                          </span>
                        </button>
                      </div>
                    </form>
                    <div class="mt-2"></div>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4 px-3 py-[4.5px]">
                <button class="mb-3 md:mb-0">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.542969"
                      y="0.5"
                      width="19"
                      height="19"
                      rx="5.5"
                      fill="#F9F5FF"
                    ></rect>
                    <rect
                      x="0.542969"
                      y="0.5"
                      width="19"
                      height="19"
                      rx="5.5"
                      stroke="#7F56D9"
                    ></rect>
                    <path
                      d="M14.7083 6.5L8.29167 12.9167L5.375 10"
                      stroke="#7F56D9"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </button>
                <span class="text-xs font-medium text-[#667085]">
                  I agree to the
                  <Link
                    class="text-[#175CD3] no-underline"
                    href="/content/terms-and-conditions"
                  >
                    {" "}
                    Terms &amp; Conditions,{" "}
                  </Link>
                  <Link
                    class="text-[#175CD3] no-underline"
                    href="/content/privacy-policy"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </Link>
                  and
                  <Link
                    class="text-[#175CD3] no-underline"
                    href="/content/returns-and-refunds"
                  >
                    {" "}
                    Return &amp; Refund Policy{" "}
                  </Link>
                  of Cartup
                </span>
              </div>
              <div class="mt-4 flex items-center justify-between border-t-8 border-[#f6f6f6]  md:my-4 md:border-t-0">
                <div class="block sm:hidden md:p-0">
                  <span class="flex w-full flex-col justify-center text-xl font-bold sm:text-base">
                    <p class="mr-2 text-primaryBlackText">Total Amount:</p>{" "}
                    <span class=" text-primaryBlackText">৳ 1,390</span>
                  </span>
                </div>
                <button
                  aria-label="Place Order"
                  class="p-button p-component border-none bg-primaryGradient h-8 text-white shadow-button w-[180px] sm:w-full rounded-full text-title md:uppercase disabled:cursor-not-allowed text-sm sm:text-base"
                  data-pc-name="button"
                  data-pc-section="root"
                >
                  <span
                    class="p-button-label p-c font-medium capitalize text-sm lg:text-sm xl:text-base"
                    data-pc-section="label"
                  >
                    Place Order
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddAddress/>
    </div>
  );
};

export default CheckOutPage;
