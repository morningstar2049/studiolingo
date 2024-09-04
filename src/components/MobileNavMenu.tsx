"use client";
import { useContext } from "react";
import Image from "next/image";
import { MobileMenuContext } from "@/Context/MobileMenuContext";
import Link from "next/link";
import Button from "./Button";
import MobileNavMenuItemAccordion from "./MobileNavMenuItemAccordion";
import { TNavItem } from "./Navbar";

export default function MobileNavMenu() {
  const { isOpen, handleClose } = useContext(MobileMenuContext);
  const translateClass = isOpen ? `translate-x-[0%]` : "translate-x-[101%]";
  const navItems: TNavItem[] = [
    {
      name: "კურსები",
      menuItems: [
        { name: "სტანდარტული კურსები", href: "/#courses" },
        { name: "კურსები კომპანიებისთვის", href: "/#corporate" },
        { name: "შეფასებები", href: "/#reviews" },
      ],
    },
    {
      name: "ჩვენი გუნდი",
      href: "/#team",
    },
    { name: "კარიერა", href: "/career" },
    { name: "მასალები", href: "/materials" },
    { name: "ენის ტესტი", href: "/language-test" },
    { name: "კონტაქტი", href: "/#contact" },
  ];

  return (
    <>
      <div
        style={{ fontFeatureSettings: "'case' on" }}
        className={`h-[90dvh] fixed left-0 top-[85px] right-0 bottom-0 bg-[#FFFFFE] sm:hidden flex flex-col justify-evenly z-50 text-lingo-green text-[20px] ${translateClass} transition-transform ease-in duration-500 px-16`}
      >
        <section className="flex flex-col justify-between gap-5">
          {navItems.map((item) => {
            if (item.href) {
              return (
                <Link
                  href={item.href}
                  key={item.name}
                  target={item.name === "შემოგვიერთდი" ? "_blank" : "_self"}
                >
                  {item.name !== "შემოგვიერთდი" ? (
                    <div
                      onClick={() => handleClose()}
                      className="w-fit cursor-pointer p-2 rounded hover:text-[#fff] hover:bg-lingo-green transition-all"
                    >
                      {item.name}
                    </div>
                  ) : (
                    <Button
                      extraStyles="font-normal"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      {item.name}
                    </Button>
                  )}
                </Link>
              );
            } else {
              return (
                <MobileNavMenuItemAccordion
                  onClick={() => handleClose()}
                  key={item.name}
                  menuItems={item.menuItems!}
                />
              );
            }
          })}
        </section>

        <section className="flex gap-1 h-[10%]">
          <a href="https://www.facebook.com/studiolingo" target="_blank">
            <Image
              src="/facebook-green.svg"
              alt="facebook-green"
              width={43}
              height={43}
            />
          </a>
          <a href="https://www.instagram.com/studio_lingo/" target="_blank">
            <Image
              src="/instagram-green.svg"
              alt="instagram-green"
              width={43}
              height={43}
            />
          </a>
          <a href="https://www.tiktok.com/@studio.lingo" target="_blank">
            <Image
              src="/tiktok-green.svg"
              alt="tikTok-green"
              width={40}
              height={40}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/studio-lingo/"
            target="_blank"
          >
            <Image
              src="/linkedin-green.svg"
              alt="linkedin-green"
              width={40}
              height={40}
            />
          </a>
          <a href="https://www.youtube.com/@studio_lingo" target="_blank">
            <Image
              src="/youtube-green.svg"
              alt="youtube-green"
              width={43}
              height={43}
            />
          </a>
        </section>
      </div>
    </>
  );
}
