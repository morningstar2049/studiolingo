"use client";
import { useContext } from "react";
import Image from "next/image";
import { MobileMenuContext } from "@/Context/MobileMenuContext";
import Link from "next/link";
import Button from "./Button";

export default function MobileNavMenu() {
  // ! Tailwind classes need to be hardcoded, computed values don't work.
  const { isOpen, handleOpen, handleClose } = useContext(MobileMenuContext);
  const translateClass = isOpen ? `translate-x-[0%]` : "translate-x-[101%]";

  const navItems = [
    { name: "კურსები", href: "#courses" },
    { name: "კორპორაციული", href: "#corporate" },
    { name: "ჩვენი გუნდი", href: "#team" },
    { name: "შეფასებები", href: "#reviews" },
    { name: "კარიერა", href: "#careers" },
    { name: "კონტაქტი", href: "#contact" },
    { name: "რეგისტრაცია", href: "/register" },
  ];

  return (
    <>
      <div
        style={{ fontFeatureSettings: "'case' on" }}
        className={`h-[90dvh] fixed left-0 top-[85px] right-0 bottom-0 bg-[#FFFFFE] sm:hidden flex flex-col justify-evenly z-50 text-lingo-green text-[1.4rem] ${translateClass} transition-transform ease-in duration-500 px-16`}
      >
        <section className="flex flex-col gap-5 justify-between">
          {navItems.map((item) => (
            <Link href={item.href} key={item.name}>
              {item.name !== "რეგისტრაცია" ? (
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
              {item.name !== "რეგისტრაცია" ? (
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
          ))}
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
        </section>
      </div>
    </>
  );
}
