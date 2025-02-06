import { CiBadgeDollar } from "react-icons/ci";
import { FaDollarSign, FaHome } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { MdAccountBalance } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <nav className="lg:flex hidden flex-col items-center sticky top-0 left-0 w-[20rem] h-full min-h-screen py-5 bg-blue-800 text-white font-bold">
      <ul className="flex flex-col items-center w-full text-center text-lg">
      <li className="flex justify-start items-center gap-3 w-full pl-7 mb-5">
            <CiBadgeDollar fontSize={"2rem"}></CiBadgeDollar>
            <p>eXspensify</p>
          </li>
        <NavLink
          to={"/"}
          className="w-full py-3 hover:bg-blue-700 cursor-pointer"
        >
          <li className="flex justify-start items-center gap-4 pl-10">
            <FaHome></FaHome>
            <p>Home</p>
          </li>
        </NavLink>
        <NavLink
          to={"/accounts"}
          className="w-full py-3 hover:bg-blue-700 cursor-pointer"
        >
          <li className="flex justify-start items-center gap-4 pl-10">
            <MdAccountBalance></MdAccountBalance>
            <p>Accounts</p>
          </li>
        </NavLink>
        <NavLink
          to={"/budgets"}
          className="w-full py-3 hover:bg-blue-700 cursor-pointer"
        >
          <li className="flex justify-start items-center gap-4 pl-10">
            <FaDollarSign></FaDollarSign>
            <p>Budgets</p>
          </li>
        </NavLink>
        <NavLink
          to={"/goals"}
          className="w-full py-3 hover:bg-blue-700 cursor-pointer"
        >
          <li className="flex justify-start items-center gap-4 pl-10">
            <FiTarget></FiTarget>
            <p>Goals</p>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default SideNav;
