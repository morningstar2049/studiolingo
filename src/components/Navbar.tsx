"use client";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";

type HRef = `#${string}` | `/${string}`;

export type TNavItem = {
  name: string;
  href?: HRef;
  menuItems?: Omit<TNavItem, "menuItems">[];
};

function Navbar() {
  const pathname = usePathname();

  const navItems: TNavItem[] = [
    {
      name: "კურსები",
      menuItems: [
        { name: "სტანდარტული კურსები", href: "#courses" },
        { name: "კურსები კომპანიებისთვის", href: "#corporate" },
        { name: "შეფასებები", href: "#reviews" },
      ],
    },
    {
      name: "ჩვენი გუნდი",
      href: "#team",
    },
    { name: "კარიერა", href: "/career" },
    { name: "მასალები", href: "/materials" },
    { name: "ენის ტესტი", href: "/language-test" },
    { name: "კონტაქტი", href: "#contact" },
    { name: "კურსის შეძენა", href: "/buy-course" },
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
            <NavItem
              key={item.name}
              name={item.name}
              href={item.href}
              menuItems={item.menuItems}
            />
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
