"use client";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { TNavItem } from "./Navbar";

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
        <MenuItem key={menuItem.name} onClick={handleClose}>
          {menuItem.name}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default NavMenu;
