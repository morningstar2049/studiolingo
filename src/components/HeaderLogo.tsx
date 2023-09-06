"use client";
import React from "react";
import Image from "next/image";

function HeaderLogo() {
  return (
    <>
      <Image
        className="cursor-pointer"
        src="/lingo-logo-svg.svg"
        alt="lingo-logo"
        width={150}
        height={150}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      />
    </>
  );
}

export default HeaderLogo;
