"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { name: "კურსები", href: "#courses" },
    { name: "კორპორაციული", href: "#corporate" },
    { name: "ჩვენი გუნდი", href: "#team" },
    { name: "შეფასებები", href: "#reviews" },
    { name: "კარიერა", href: "#careers" },
    { name: "კონტაქტი", href: "#contact" },
  ];

  if (pathname !== "/") return null;

  return (
    <>
      <nav
        style={{ fontFeatureSettings: "'case' on" }}
        className="h-11 bg-[#fffffe] sm:bg-lingo-green font-bold text-[white] z-50 w-full hidden sm:flex justify-around items-center p-0"
      >
        <div className="hidden animate-appear sm:flex sm:max-lg:justify-around lg:justify-evenly sm:max-lg:w-full lg:w-[83%]">
          {navItems.map((item) => (
            <Link href={item.href} key={item.name}>
              <div className="cursor-pointer p-1 rounded hover:text-lingo-green hover:bg-[#fff] transition-all">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
