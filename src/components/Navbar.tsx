"use client";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useState } from "react";
import MobileNavMenu from "./MobileNavMenu";
import Header from "./Header";
const MediaQuery = dynamic(() => import("react-responsive"), { ssr: false });

function Navbar() {
  const [mobileNavTranslate, setMobileNavTranslate] = useState(100);

  const navItems = [
    "კურსები",
    "კორპორაციული",
    "ჩვენი გუნდი",
    "შეფასებები",
    "კონტაქტი",
  ];

  return (
    <>
      <nav
        style={{ fontFeatureSettings: "'case' on" }}
        className="h-14 bg-[#fffffe] sm:bg-lingo-green font-bold text-[white] sticky top-[-2px] z-50 w-full flex sm:justify-around justify-between items-center shadow py-14 p-10 sm:p-0"
      >
        <MediaQuery minWidth={640}>
          <div className="flex sm:max-lg:justify-around lg:justify-evenly sm:max-lg:w-full lg:w-7/12 ml-0 lg:ml-[-8%]">
            {navItems.map((item) => (
              <div
                className="cursor-pointer p-1 rounded hover:text-lingo-green hover:bg-[#fff] transition-all"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={640}>
          <Image
            src="/lingo-logo-svg.svg"
            alt="lingo-logo"
            width={120}
            height={120}
          />
          {mobileNavTranslate === 100 ? (
            <GiHamburgerMenu
              color="#2f9e4d"
              fontSize="20px"
              cursor="pointer"
              onClick={() => setMobileNavTranslate(0)}
            />
          ) : (
            <AiOutlineCloseCircle
              color="#2f9e4d"
              fontSize="25px"
              cursor="pointer"
              onClick={() => setMobileNavTranslate(100)}
            />
          )}
        </MediaQuery>
      </nav>
      <MediaQuery maxWidth={640}>
        <MobileNavMenu translate={mobileNavTranslate} />
      </MediaQuery>
    </>
  );
}

export default Navbar;
