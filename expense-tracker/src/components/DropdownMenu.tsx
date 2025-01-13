import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { NavLink } from "react-router-dom";

interface DropdownItem {
  title: string;
  onClick: () => void;
  link?: string;
}

const DropdownMenu = ({ dropdownItems }: { dropdownItems: DropdownItem[] }) => {
  const [open, setOpen] = useState<boolean>(false); // Controls dropdown state

  return (
    <div>
      <CgMenuRightAlt
        className="cursor-pointer"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      ></CgMenuRightAlt>
      <ul className={`absolute ${open ? "block" : "hidden"}`}>
        {dropdownItems.map((dropdownItem, index) => (
          <NavLink to={dropdownItem.link || "#"} key={index}>
            <li
              className="cursor-pointer bg-neutral-300 hover:bg-neutral-400 px-2 py-1"
              key={index}
              onClick={dropdownItem.onClick}
            >
              {dropdownItem.title}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
