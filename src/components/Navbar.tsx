"use client";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useContext, useState } from "react";
import { MobileMenuContext } from "@/Context/MobileMenuContext";
import Link from "next/link";

function Navbar() {
  const { isOpen, handleOpen, handleClose } = useContext(MobileMenuContext);

  const navItems = [
    { name: "კურსები", href: "#courses" },
    { name: "კორპორაციული", href: "#corporate" },
    { name: "ჩვენი გუნდი", href: "#team" },
    { name: "შეფასებები", href: "#reviews" },
    { name: "კონტაქტი", href: "#contact" },
  ];

  return (
    <>
      <nav
        style={{ fontFeatureSettings: "'case' on" }}
        className="h-11 bg-[#fffffe] sm:bg-lingo-green font-bold text-[white] z-50 w-full flex sm:justify-around justify-between items-center shadow py-11 p-10 sm:p-0"
      >
        <div className="hidden animate-appear sm:flex sm:max-lg:justify-around lg:justify-evenly sm:max-lg:w-full lg:w-7/12 ml-0 lg:ml-[-8%]">
          {navItems.map((item) => (
            <Link href={item.href} key={item.name}>
              <div className="cursor-pointer p-1 rounded hover:text-lingo-green hover:bg-[#fff] transition-all">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between w-full animate-appear sm:hidden">
          <Link href="/">
            <Image
              src="/lingo-logo-svg.svg"
              alt="lingo-logo"
              width={120}
              height={120}
            />
          </Link>
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
      </nav>
    </>
  );
}

export default Navbar;
