"use client";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  return (
    <div className="bg-white h-[80px] flex justify-between items-center shadow p-10">
      <Image
        src="/lingo-logo-main.png"
        alt="lingo-logo"
        width={120}
        height={120}
      />
      <GiHamburgerMenu color="#2f9e4d" fontSize="20px" />
    </div>
  );
}

export default Navbar;
