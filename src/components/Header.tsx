"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "./Button";
import HeaderLogo from "./HeaderLogo";
import SocialLinks from "./SocialLinks";
import { useContext } from "react";
import { MobileMenuContext } from "@/Context/MobileMenuContext";
import { usePathname } from "next/navigation";

function Header() {
  const { isOpen, handleOpen, handleClose } = useContext(MobileMenuContext);

  return (
    <>
      <header className="hidden animate-appear bg-[#fff] h-[110px] sm:flex items-center shadow-md">
        <div className="ml-[16%]">
          <HeaderLogo height={72} width={72} />
        </div>
        <div className="flex justify-end flex-1 pr-[13%]">
          <SocialLinks circleClass="h-12 w-12 text-xl" />
        </div>
      </header>
      <header className="flex items-center justify-between px-10 shadow-md bg-[#fffffe] h-11 sm:hidden py-11">
        <div className="flex items-center justify-between w-full pl-8 animate-appear sm:hidden">
          <HeaderLogo height={48} width={48} />
          {!isOpen ? (
            <GiHamburgerMenu
              color="#2f9e4d"
              fontSize="20px"
              cursor="pointer"
              onClick={() => handleOpen()}
            />
          ) : (
            <AiOutlineCloseCircle
              color="#2f9e4d"
              fontSize="25px"
              cursor="pointer"
              onClick={() => handleClose()}
            />
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
