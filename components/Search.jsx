import { IoIosSearch } from "react-icons/io";
const Search = () => {
  return (
    <div className="max-w-[600px] mx-auto relative">
      <form>
        <input
          type="text"
          className="border w-full border-gray-200 p-2 font-light focus:outline-none rounded-[5px] bg-white"
          placeholder="Search Product"
        />
        <button className="absolute top-0 bottom-0 right-0 bg-slate-800 rounded-e-[5px] px-3 ">
          <IoIosSearch size={25} color="white" />
        </button>
      </form>
    </div>
  );
};

export default Search;
