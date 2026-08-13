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
    { name: "ჩვენი გუნდი", href: "/team" },
    { name: "ბლოგი", href: "/blog" },
    { name: "კარიერა", href: "/career" },
    { name: "მასალები", href: "/materials" },
    { name: "ენის ტესტი", href: "/language-test" },
    { name: "კონტაქტი", href: "#contact" },
    { name: "განვადება", href: "/buy-course" },
  ];

  // Bare anchors only resolve on the homepage, so prefix them with "/" when the
  // nav renders on any other page.
  const isHome = pathname === "/";
  const resolveHref = (href?: HRef) =>
    href && href.startsWith("#") && !isHome ? (`/${href}` as HRef) : href;

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
              href={resolveHref(item.href)}
              menuItems={item.menuItems?.map((menuItem) => ({
                ...menuItem,
                href: resolveHref(menuItem.href),
              }))}
            />
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
