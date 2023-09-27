"use client";
import { MobileMenuContext } from "@/Context/MobileMenuContext";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

type THeaderLogoProps = {
  width: number;
  height: number;
};

function HeaderLogo({ height, width }: THeaderLogoProps) {
  const { isOpen, handleClose } = useContext(MobileMenuContext);
  const pathname = usePathname();
  const router = useRouter();

  function handleClick() {
    if (pathname === "/") {
      window.scrollTo(0, 0);
    } else {
      router.push("/");
    }
    if (isOpen) {
      handleClose();
    }
  }

  return (
    <>
      <Image
        className="cursor-pointer"
        src="/lingo-logo-svg.svg"
        alt="lingo-logo"
        width={width}
        height={height}
        onClick={handleClick}
      />
    </>
  );
}

export default HeaderLogo;
