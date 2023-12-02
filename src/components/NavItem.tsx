"use client";

import { useState } from "react";
import { TNavItem } from "./Navbar";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NavMenu from "./NavMenu";

type TNavItemProps = TNavItem;

function NavItem({ name, href, menuItems }: TNavItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {href ? (
        <Link href={href} key={name}>
          <div className="cursor-pointer p-1 rounded hover:text-lingo-green hover:bg-[#fff] transition-all">
            {name}
          </div>
        </Link>
      ) : (
        <>
          <div
            key={name}
            className="flex items-center relative gap-2 cursor-pointer p-1 rounded hover:text-lingo-green hover:bg-[#fff] transition-all"
            id="basic-button"
            aria-controls={isMenuOpen ? "menu-popover" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? "true" : undefined}
            onClick={handleClick}
          >
            <div>{name}</div>

            <FaChevronDown />
          </div>
          <NavMenu
            menuItems={menuItems!}
            anchorEl={anchorEl}
            handleClose={handleClose}
            isMenuOpen={isMenuOpen}
          />
        </>
      )}
    </>
  );
}

export default NavItem;
