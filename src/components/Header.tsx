"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import HeaderLogo from "./HeaderLogo";
import { useContext } from "react";
import { MobileMenuContext } from "@/Context/MobileMenuContext";

function Header() {
  const { isOpen, handleOpen, handleClose } = useContext(MobileMenuContext);

  return (
    <>
      <header className="hidden animate-appear bg-[#fff] h-[110px] sm:flex justify-evenly items-center shadow-md">
        <HeaderLogo />
        <div className="flex justify-end w-1/2 gap-3">
          <Link href="/register" className="flex items-center">
            <Button extraStyles="mr-5">რეგისტრაცია</Button>
          </Link>
          <a href="https://www.facebook.com/studiolingo" target="_blank">
            <Image
              src="/facebook-green.svg"
              alt="facebook-green"
              width={55}
              height={55}
            />
          </a>
          <a href="https://www.instagram.com/studio_lingo/" target="_blank">
            <Image
              src="/instagram-green.svg"
              alt="instagram-green"
              width={55}
              height={55}
            />
          </a>
          <a href="https://www.tiktok.com/@studio.lingo" target="_blank">
            <Image
              src="/tiktok-green.svg"
              alt="tikTok-green"
              width={50}
              height={50}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/studio-lingo/"
            target="_blank"
          >
            <Image
              src="/linkedin-green.svg"
              alt="linkedin-green"
              width={50}
              height={50}
            />
          </a>
        </div>
      </header>
      <header className="flex items-center justify-between px-10 shadow-md bg-[#fffffe] h-11 sm:hidden py-11">
        <div className="flex items-center justify-between w-full animate-appear sm:hidden">
          <Image
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            src="/lingo-logo-svg.svg"
            alt="lingo-logo"
            width={120}
            height={120}
          />
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
