import { BiEditAlt } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
const Address = () => {
  return (
    <div className="mt-4 grid-cols-1 gap-5 md:grid md:grid-cols-3">
      <label
        htmlFor="1"
        className="flex flex-col gap-4 rounded-lg border-[2px] bg-[#FCFCFC] p-4 border-orange-500"
      >
        <div class="flex justify-between">
          <h3 class="w-[90%] truncate text-base font-semibold text-">
            Asadullah Ahmed
          </h3>
        </div>
        <div>
          <p class="text-sm text-gray-800">
            Baburghone, Rohanpur, Gomastapur, Chapainawabganj
          </p>
        </div>
        <div class="mt-auto flex justify-between">
          <button class="flex h-[36px] w-[115px] flex-row items-center justify-center gap-[4px] rounded bg-[#FFF0E9] text-sm font-medium text-orange-600">
            <FaRegTrashAlt />
            <p>Delete</p>
          </button>
          <button class="flex h-[36px] flex-row items-center justify-center gap-[4px] rounded bg-[#EEEEEE] text-sm font-medium text-[#333333] w-[115px]">
            <BiEditAlt size={18} />
            <p>Edit</p>
          </button>
        </div>
      </label>
    </div>
  );
};

export default Address;
