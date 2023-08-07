"use client";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { useMediaQuery } from "react-responsive";
function Navbar() {
  const isNotMobile = useMediaQuery({ query: "(min-width: 640px)" });

  return (
    <>
      {isNotMobile && (
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
              alt="tiktok-green"
              width={50}
              height={50}
            />
            <Image
              src="/instagram-green.svg"
              alt="tiktok-green"
              width={50}
              height={50}
            />
            <Image
              src="/tiktok-green.svg"
              alt="tiktok-green"
              width={50}
              height={50}
            />
          </div>
        </header>
      )}
      <nav className="bg-white sm:bg-lingo-green h-[80px] flex justify-between items-center shadow p-10">
        <div>კურსები</div>
        <div>კორპორაციული</div>
        <div>ჩვენი გუნდი</div>
        <div>შეფასებები</div>

        {!isNotMobile && (
          <Image
            src="/lingo-logo-main.png"
            alt="lingo-logo"
            width={120}
            height={120}
          />
        )}
        {!isNotMobile && <GiHamburgerMenu color="#2f9e4d" fontSize="20px" />}
      </nav>
    </>
  );
}

export default Navbar;
