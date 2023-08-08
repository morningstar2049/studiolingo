"use client";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import dynamic from "next/dynamic";
const MediaQuery = dynamic(() => import("react-responsive"), { ssr: false });

function Navbar() {
  return (
    <>
      <MediaQuery minWidth={640}>
        <header className="bg-white h-[110px] flex justify-around items-center">
          <Image
            src="/lingo-logo-main.png"
            alt="lingo-logo"
            width={150}
            height={150}
          />
          <div className=" flex gap-3">
            <Image
              src="/facebook-green.svg"
              alt="facebook-green"
              width={50}
              height={50}
            />
            <Image
              src="/instagram-green.svg"
              alt="instagram-green"
              width={50}
              height={50}
            />
            <Image
              src="/tiktok-green.svg"
              alt="tikTok-green"
              width={50}
              height={50}
            />
            <Image
              src="/linkedin-green.svg"
              alt="linkedin-green"
              width={50}
              height={50}
            />
          </div>
        </header>
      </MediaQuery>

      <nav
        style={{ fontFeatureSettings: "'case' on" }}
        className="h-14 bg-white sm:bg-lingo-green font-bold text-[white] flex sm:justify-around justify-between items-center shadow"
      >
        <div className="flex justify-evenly w-7/12 ml-[-200px]">
          <div>კურსები</div>
          <div>კორპორაციული</div>
          <div>ჩვენი გუნდი</div>
          <div>შეფასებები</div>
        </div>

        <MediaQuery maxWidth={640}>
          <Image
            src="/lingo-logo-main.png"
            alt="lingo-logo"
            width={120}
            height={120}
          />
          <GiHamburgerMenu color="#2f9e4d" fontSize="20px" />
        </MediaQuery>
      </nav>
    </>
  );
}

export default Navbar;
