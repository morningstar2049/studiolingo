"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "./Button";
import HeaderLogo from "./HeaderLogo";
import SocialLinks from "./SocialLinks";
import { useContext } from "react";
import { MobileMenuContext } from "@/Context/MobileMenuContext";
import { usePathname } from "next/navigation";

function Header({ scrolled = false }: { scrolled?: boolean }) {
  const { isOpen, handleOpen, handleClose } = useContext(MobileMenuContext);

  // Apple.com's frosted nav recipe: ~80% white + a heavy blur with a saturation
  // boost, which is what makes the colours behind glow through the frost.
  const scrolledStyle = scrolled
    ? {
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
      }
    : undefined;

  // Mobile has no solid navbar under the header, so a dark hero (e.g. course
  // pages) would show through the 80% frost. Keep the blur but make it nearly
  // opaque so nothing bleeds through.
  const scrolledStyleMobile =
    scrolled && !isOpen
      ? {
          backgroundColor: "rgba(255,255,255,0.96)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
        }
      : undefined;

  return (
    <>
      <header
        style={scrolledStyle}
        className={`hidden animate-appear h-[110px] sm:flex items-center shadow-md transition-colors duration-300 ${
          scrolled ? "" : "bg-[#fff]"
        }`}
      >
        <div className="ml-[16%]">
          <HeaderLogo height={72} width={72} />
        </div>
        <div className="flex justify-end flex-1 pr-[13%]">
          <SocialLinks circleClass="h-12 w-12 text-xl" />
        </div>
      </header>
      <header
        style={scrolledStyleMobile}
        className={`flex items-center justify-between px-10 shadow-md h-11 sm:hidden py-11 transition-colors duration-300 ${
          scrolled && !isOpen ? "" : "bg-[#fffffe]"
        }`}
      >
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
