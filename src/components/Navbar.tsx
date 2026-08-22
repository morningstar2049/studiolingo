"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBookOpen, FaBuilding, FaStar } from "react-icons/fa6";
import NavItem from "./NavItem";

// Homepage in-page sections the nav links to (anchor hrefs above).
const SECTION_IDS = ["courses", "reviews", "contact"];

type HRef = `#${string}` | `/${string}`;

export type TNavItem = {
  name: string;
  href?: HRef;
  description?: string;
  icon?: React.ReactNode;
  menuItems?: Omit<TNavItem, "menuItems">[];
};

function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("");

  // Scrollspy: keep the nav item highlighted while its homepage section is the
  // one on screen. Only runs on the homepage, where these sections exist.
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        });
        // The section currently in the band, or none — so scrolling back up to
        // the banner clears the highlight instead of leaving კურსები selected.
        setActiveSection(SECTION_IDS.find((id) => inBand.has(id)) ?? "");
      },
      // A thin band across the vertical middle of the viewport: whichever
      // section sits in it is "open".
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  const navItems: TNavItem[] = [
    {
      name: "კურსები",
      menuItems: [
        {
          name: "სტანდარტული კურსები",
          href: "/courses",
          description: "ზრდასრულებისა და მოზარდებისთვის",
          icon: <FaBookOpen size={18} />,
        },
        {
          name: "კურსები კომპანიებისთვის",
          href: "/corporate",
          description: "ბიზნეს-ინგლისური",
          icon: <FaBuilding size={18} />,
        },
        {
          name: "შეფასებები",
          href: "#reviews",
          description: "მოსწავლეების გამოხმაურება",
          icon: <FaStar size={18} />,
        },
      ],
    },
    { name: "ჩვენი გუნდი", href: "/team" },
    { name: "კონტენტი", href: "/content" },
    { name: "ბლოგი", href: "/blog" },
    { name: "ენის ტესტი", href: "/language-test" },
    { name: "მასალები", href: "/materials" },
    { name: "განვადება", href: "/buy-course" },
    { name: "კარიერა", href: "/career" },
  ];

  // Bare anchors only resolve on the homepage, so prefix them with "/" when the
  // nav renders on any other page.
  const resolveHref = (href?: HRef) =>
    href && href.startsWith("#") && !isHome ? (`/${href}` as HRef) : href;

  // A page link is active on its own route; an anchor link (or the dropdown
  // parent that contains anchors) is active while its section is on screen.
  const isActive = (item: TNavItem): boolean => {
    if (item.menuItems) {
      return (
        isHome &&
        item.menuItems.some(
          (m) => m.href?.startsWith("#") && m.href.slice(1) === activeSection,
        )
      );
    }
    if (!item.href) return false;
    if (item.href.startsWith("#")) {
      return isHome && item.href.slice(1) === activeSection;
    }
    return pathname === item.href;
  };

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
              active={isActive(item)}
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
