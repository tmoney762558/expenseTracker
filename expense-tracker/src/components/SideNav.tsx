import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { CiBadgeDollar } from "react-icons/ci";
import { FaDollarSign, FaHome } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { MdAccountBalance } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Handles the state of the side nav
  const [isClosing, setIsClosing] = useState<boolean>(false); // Handles the state of the side nav closing animation

  let correctAnimation = false;

  return isOpen || isClosing ? (
    <nav
      className={`flex flex-col items-center lg:sticky fixed top-0 left-0 w-[20rem] h-full min-h-screen py-5 bg-blue-800 text-white font-bold z-10 ${
        isClosing ? "scale-out-hor-left" : "scale-in-hor-left"
      }`}
      onAnimationEnd={() => {
        if (isClosing && !isOpen && !correctAnimation) {
          correctAnimation = true;
        } else {
          correctAnimation = false;
          setIsClosing(false);
        }
      }}
    >
      <ul
        className={`flex flex-col items-center w-full text-center ${
          isClosing ? "fade-out" : "fade-in"
        }`}
      >
        <li className="flex justify-between items-center w-full pl-7 mb-5">
          <div className="flex items-center gap-3">
            <CiBadgeDollar fontSize={"2.1rem"}></CiBadgeDollar>
            <p className="text-2xl">eXspensify</p>
          </div>
          <div
            className="w-fit h-fit m-5 bg-white rounded-full cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              setIsClosing(true);
            }}
          >
            <BiChevronLeft fill="#1d4ed8" fontSize={"1.7rem"}></BiChevronLeft>
          </div>
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
  ) : (
    <div
      className="w-fit h-fit m-5 bg-blue-800 rounded-full fixed cursor-pointer z-10"
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <BiChevronRight fontSize={"1.7rem"} fill="white"></BiChevronRight>
    </div>
  );
};

export default SideNav;
