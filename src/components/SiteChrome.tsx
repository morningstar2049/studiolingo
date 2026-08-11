"use client";
import { usePathname } from "next/navigation";

import Header from "./Header";
import MobileNavMenu from "./MobileNavMenu";
import Navbar from "./Navbar";

// Sanity Studio renders a full-screen editing app at /studio; the site header
// and menus would overlap it, so the chrome is omitted there.
export default function SiteChrome() {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) return null;

  return (
    <>
      <div className="sticky top-[-2px] z-10">
        <Header />
        <Navbar />
      </div>
      <MobileNavMenu />
    </>
  );
}
