"use client";
import { useContext } from "react";
import { MobileMenuContext } from "@/Context/MobileMenuContext";
import Link from "next/link";
import { FaBookOpen, FaBuilding, FaStar } from "react-icons/fa6";
import Button from "./Button";
import MobileNavMenuItemAccordion from "./MobileNavMenuItemAccordion";
import SocialLinks from "./SocialLinks";
import { TNavItem } from "./Navbar";

export default function MobileNavMenu() {
  const { isOpen, handleClose } = useContext(MobileMenuContext);
  const translateClass = isOpen ? `translate-x-[0%]` : "translate-x-[101%]";
  const navItems: TNavItem[] = [
    {
      name: "კურსები",
      menuItems: [
        {
          name: "სტანდარტული კურსები",
          href: "/courses",
          description: "ზრდასრულებისა და მოზარდებისთვის",
          icon: <FaBookOpen size={20} />,
        },
        {
          name: "კურსები კომპანიებისთვის",
          href: "/#corporate",
          description: "ბიზნეს-ინგლისური",
          icon: <FaBuilding size={20} />,
        },
        {
          name: "შეფასებები",
          href: "/#reviews",
          description: "მოსწავლეების გამოხმაურება",
          icon: <FaStar size={20} />,
        },
      ],
    },
    { name: "ჩვენი გუნდი", href: "/team" },
    { name: "კონტენტი", href: "/content" },
    { name: "ბლოგი", href: "/blog" },
    { name: "კარიერა", href: "/career" },
    { name: "მასალები", href: "/materials" },
    { name: "ენის ტესტი", href: "/language-test" },
    { name: "განვადება", href: "/buy-course" },
  ];

  return (
    <>
      <div
        style={{ fontFeatureSettings: "'case' on" }}
        className={`h-[90dvh] fixed left-0 top-[85px] right-0 bottom-0 bg-[#FFFFFE] sm:hidden flex flex-col justify-between z-50 text-lingo-green text-[20px] ${translateClass} transition-transform ease-in duration-500 px-16 pt-10 pb-6 overflow-y-auto`}
      >
        <section className="flex flex-col gap-5">
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

        <section className="flex items-center h-[10%]">
          <SocialLinks circleClass="h-10 w-10 text-lg" />
        </section>
      </div>
    </>
  );
}
