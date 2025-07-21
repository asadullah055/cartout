import { AiOutlineMenu } from "react-icons/ai";

const Navigation = () => {
  return (
    <nav className="bg-white">
      <div className="flex md:justify-between justify-start items-center gap-2 md:p-2 max-w-[1280px] mx-auto">
        <div className="md:flex hidden items-center cursor-pointer gap-2 w-auto">
          <AiOutlineMenu className="font-bold" size={22} />
          <span className="font-semibold text-[14px]">Shop By Category</span>
        </div>

        <ul className="md:flex justify-start items-center text-[15px] gap-3 p-2 w-[75%] hidden">
          {[
            "Smart Watch",
            "Action Camera",
            "Router UPS",
            "Android TV BOX",
            "Router",
            "Accessories",
          ].map((item) => (
            <li
              key={item}
              className="font-bold cursor-pointer hover:text-orange-400 transition duration-200"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
