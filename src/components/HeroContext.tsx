"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Shared index of the active desktop hero slide, so the background photo
// (HeroSlideshow) and the headline (BannerHeadline) change together.
export const HERO_SLIDES = [
  {
    src: "/banner-web-1.jpg",
    pos: "object-[50%_40%]",
    caption: null,
    alt: "სტუდიო ლინგოს გუნდი — ინგლისურის სკოლა თბილისში, საბურთალო",
  },
  {
    src: "/banner-web-2.jpg",
    pos: "object-[50%_45%]",
    caption: "ისწავლე ინგლისური მარტივად და სახალისოდ",
    alt: "ინგლისურის გაკვეთილი სტუდიო ლინგოში — მოსწავლეები სახალისო აქტივობაზე",
  },
  {
    src: "/banner-web-3.jpg",
    pos: "object-[50%_35%]",
    caption: "ვსაუბრობთ ბევრს და ვსწავლობთ შეცდომებით",
    alt: "სასაუბრო ინგლისურის გაკვეთილი — მასწავლებელი და მოსწავლეები საუბრობენ",
  },
  {
    src: "/banner-web-4.jpg",
    pos: "object-[50%_30%]",
    caption: "ჩვენთან სხვანაირი დავალებები და აქტივობებია",
    alt: "ინგლისურის ჯგუფური გაკვეთილი სტუდიო ლინგოში — ინტერაქტიული დავალება",
  },
] as const;
export const HERO_INTERVAL_MS = 6500;

const HeroContext = createContext(0);

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // The slideshow only exists from the sm breakpoint up; on phones the
    // static banner and the H1 stay put.
    const mq = window.matchMedia("(min-width: 640px)");
    let id: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      clearInterval(id);
      if (mq.matches) {
        id = setInterval(
          () => setActive((i) => (i + 1) % HERO_SLIDES.length),
          HERO_INTERVAL_MS,
        );
      } else {
        setActive(0);
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      clearInterval(id);
      mq.removeEventListener("change", sync);
    };
  }, []);

  return <HeroContext.Provider value={active}>{children}</HeroContext.Provider>;
}

export const useHeroSlide = () => useContext(HeroContext);
