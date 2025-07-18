import { AiOutlineMenu } from "react-icons/ai";
const Navigation = () => {
  return (
    <nav className="bg-white">
      <div className="flex md:justify-between justify-start items-center gap-2 p-2 max-w-[1280px] mx-auto">
        <div className="flex items-center cursor-pointer gap-2 w-auto">
          <AiOutlineMenu className="font-bold" size={22} />
          <span className="font-semibold text-[14px]">Shop By Category</span>
        </div>

        <ul className="md:flex justify-start items-center text-[15px] gap-3 p-2  w-[75%] hidden">
          <li className="font-bold cursor-pointer">Smart Watch</li>
          <li className="font-bold cursor-pointer">Action Camera</li>
          <li className="font-bold cursor-pointer">Router UPS</li>
          <li className="font-bold cursor-pointer">Android TV BOX</li>
          <li className="font-bold cursor-pointer">Router</li>
          <li className="font-bold cursor-pointer">Accessories</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
