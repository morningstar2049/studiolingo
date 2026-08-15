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
    <div
      className="flex items-center cursor-pointer"
      style={{ gap: Math.round(height * 0.65) }}
      onClick={handleClick}
    >
      <Image src="/lingo-icon.svg" alt="lingo-logo" width={width} height={height} />
      {/* Same wordmark as the contact footer (studio + green lingo), with
          "studio" in navy since the header sits on a light background. */}
      <span
        className="font-bold leading-none"
        style={{ fontSize: Math.round(height * 0.36) }}
      >
        <span className="text-lingo-black">studio</span>
        <span className="text-lingo-green">lingo</span>
      </span>
    </div>
  );
}

export default HeaderLogo;
