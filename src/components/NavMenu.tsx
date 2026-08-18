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
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      MenuListProps={{ sx: { py: 0 } }}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            mt: 1,
            minWidth: 300,
            overflow: "hidden",
            borderRadius: "16px",
            border: "1px solid #eceef2",
            boxShadow: "0 24px 48px -18px rgba(41,49,66,0.30)",
            fontFamily: "var(--font-firago), sans-serif",
            "& .MuiList-root": { padding: "8px" },
          },
        },
      }}
    >
      {menuItems.map((item) => (
        <MenuItem
          key={item.name}
          onClick={handleClose}
          disableGutters
          sx={{
            padding: 0,
            borderRadius: "12px",
            marginBottom: "2px",
            transition: "background-color .2s",
            "&:last-of-type": { marginBottom: 0 },
            "&:hover": { backgroundColor: "#f2faf5" },
            "&:hover .nm-ic": {
              background: "linear-gradient(135deg,#3bb85e,#2f9e4d)",
              color: "#fff",
            },
            "&:hover .nm-title": { color: "#2f9e4d" },
          }}
        >
          <Link
            href={item.href!}
            className="flex items-center w-full gap-3 px-3 py-2.5"
          >
            <span className="flex items-center justify-center w-10 h-10 transition-all shrink-0 nm-ic rounded-[11px] bg-[#eaf6ee] text-lingo-green">
              {item.icon}
            </span>
            <span className="flex flex-col">
              <span
                style={{
                  fontFamily: "var(--font-firago), sans-serif",
                  fontFeatureSettings: "'case' on",
                }}
                className="font-bold leading-tight transition-colors nm-title text-[14px] text-lingo-black"
              >
                {item.name}
              </span>
              {item.description && (
                <span className="text-[11px] text-[#8a929d] mt-0.5">
                  {item.description}
                </span>
              )}
            </span>
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default NavMenu;
