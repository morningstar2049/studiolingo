"use client";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useState } from "react";
import MobileNavMenu from "./MobileNavMenu";
const MediaQuery = dynamic(() => import("react-responsive"), { ssr: false });

function Navbar() {
  // const [mobileNavIsVisible, setMobileNavIsVisible] = useState(false);
  const [mobileNavTranslate, setMobileNavTranslate] = useState(100);

  return (
    <>
      <MediaQuery minWidth={640}>
        <header className="bg-white h-[110px] flex justify-around items-center">
          <Image
            src="/lingo-logo-svg.svg"
            alt="lingo-logo"
            width={150}
            height={150}
          />
          <div className=" flex gap-3">
            <a href="https://www.facebook.com/studiolingo" target="_blank">
              <Image
                src="/facebook-green.svg"
                alt="facebook-green"
                width={50}
                height={50}
              />
            </a>
            <a href="https://www.instagram.com/studio_lingo/" target="_blank">
              <Image
                src="/instagram-green.svg"
                alt="instagram-green"
                width={50}
                height={50}
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
      </MediaQuery>

      <>
        <nav
          style={{ fontFeatureSettings: "'case' on" }}
          className="h-14 bg-[#fffffe] sm:bg-lingo-green font-bold text-[white] sticky top-[-2px] z-50 w-full flex sm:justify-around justify-between items-center shadow p-10 sm:p-0"
        >
          <MediaQuery minWidth={640}>
            <div className="flex sm:max-lg:justify-around lg:justify-evenly sm:max-lg:w-full lg:w-7/12 ml-0 lg:ml-[-200px]">
              <div>კურსები</div>
              <div>კორპორაციული</div>
              <div>ჩვენი გუნდი</div>
              <div>შეფასებები</div>
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
    </>
  );
}

export default Navbar;
