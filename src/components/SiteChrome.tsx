"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Header from "./Header";
import MessengerButton from "./MessengerButton";
import MobileNavMenu from "./MobileNavMenu";
import Navbar from "./Navbar";

// Sanity Studio renders a full-screen editing app at /studio; the site header
// and menus would overlap it, so the chrome is omitted there.
export default function SiteChrome() {
  const pathname = usePathname();

  // Once the visitor scrolls off the very top, the sticky header turns into a
  // slightly translucent frosted-glass bar; at the top it stays fully solid.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/studio")) return null;

  return (
    <>
      <div className="sticky top-[-2px] z-30">
        <Header scrolled={scrolled} />
        <Navbar />
      </div>
      <MobileNavMenu />
      <MessengerButton />
    </>
  );
}
