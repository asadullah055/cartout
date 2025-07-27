import { HiOutlineMinusSm, HiOutlinePlus, HiOutlineStar } from "react-icons/hi";
const Details = () => {
  return (
    <div className="p-2">
      <h1 className="font-medium text-xl">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam velit
        sunt quisquam numquam recusandae soluta rem fugiat minus,{" "}
      </h1>
      {/* rating */}
      <div className="flex items-center text-[14px] mt-2">
        <span className="text-yellow-500 inline-flex items-center">
          <HiOutlineStar />
          <HiOutlineStar />
          <HiOutlineStar />
          <HiOutlineStar />
          <HiOutlineStar />
        </span>
        <span className="text-gray-500 text-[12px] ml-2">(100 reviews)</span>
      </div>
      {/* Price and discountprice*/}
      <div className="mt-2">
        <span className="text-xl font-bold text-gray-800">$99.99</span>
        <span className="text-sm text-gray-500 line-through ml-2">$129.99</span>
      </div>
      {/* short description */}
      <p className="text-gray-600 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, cumque, voluptates, quia quisquam voluptatum cumque
        voluptates quia quisquam voluptatum cumque voluptates quia.
      </p>
      {/* quantity */}
      <div className="mt-4 flex items-center gap-2">
        <label className="block text-gray-700 mb-2">Quantity:</label>
        <button className="cursor-pointer">
          <HiOutlineMinusSm />
        </button>
        <span>1</span>

        <button className="cursor-pointer">
          <HiOutlinePlus />
        </button>
      </div>
      {/* Add to cart and by now button */}
      <div className="mt-4 flex items-center gap-2">
        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200 cursor-pointer">
          Buy Now
        </button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200 cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Details;
