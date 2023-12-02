"use client";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { TNavItem } from "./Navbar";
import Link from "next/link";

type TNavMenuProps = {
  menuItems: Omit<TNavItem, "menuItems">[];
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleClose: () => void;
};

function NavMenu({
  menuItems,
  anchorEl,
  isMenuOpen,
  handleClose,
}: TNavMenuProps) {
  return (
    <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleClose}>
      {menuItems.map((menuItem) => (
        <MenuItem
          key={menuItem.name}
          onClick={handleClose}
          className="font-bold text-lingo-black hover:text-lingo-green"
          sx={{
            fontFamily: "'FiraGO', sans-serif",
          }}
        >
          <Link href={menuItem.href!}>{menuItem.name}</Link>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default NavMenu;
