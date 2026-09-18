"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Shared state of the desktop hero: the slides (from Sanity, "მთავარი ბანერი")
// and the active index, so the background photo (HeroSlideshow) and the
// headline (BannerHeadline) change together.
export type HeroSlide = {
  src: string;
  alt: string;
  /** Headline shown on this slide; null = the H1. */
  caption: string | null;
  /** Long caption: wraps like the H1 instead of one smaller line. */
  captionWrap: boolean;
  /** CSS object-position of the photo, e.g. "50% 40%". */
  position: string;
};

export const FALLBACK_HEADLINE =
  "ინგლისურის სკოლა თბილისში და ონლაინ — ზრდასრულებისა და მოზარდებისთვის";

export const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  {
    src: "/banner-web-1.jpg",
    position: "50% 40%",
    caption: null,
    captionWrap: false,
    alt: "სტუდიო ლინგოს გუნდი — ინგლისურის სკოლა თბილისში, საბურთალო",
  },
  {
    src: "/banner-web-2.jpg",
    position: "50% 45%",
    caption: "ისწავლე ინგლისური მარტივად და სახალისოდ",
    captionWrap: false,
    alt: "ინგლისურის გაკვეთილი სტუდიო ლინგოში — მოსწავლეები სახალისო აქტივობაზე",
  },
  {
    src: "/banner-web-3.jpg",
    position: "50% 35%",
    caption: "ვსაუბრობთ ბევრს და ვსწავლობთ შეცდომებით",
    captionWrap: false,
    alt: "სასაუბრო ინგლისურის გაკვეთილი — მასწავლებელი და მოსწავლეები საუბრობენ",
  },
  {
    src: "/banner-web-4.jpg",
    position: "50% 30%",
    caption: "ჩვენთან სხვანაირი დავალებები და აქტივობებია",
    captionWrap: true,
    alt: "ინგლისურის ჯგუფური გაკვეთილი სტუდიო ლინგოში — ინტერაქტიული დავალება",
  },
];
export const HERO_INTERVAL_MS = 6500;

const HeroContext = createContext({
  active: 0,
  slides: FALLBACK_HERO_SLIDES,
  headline: FALLBACK_HEADLINE,
});

export function HeroProvider({
  slides,
  headline,
  children,
}: {
  slides: HeroSlide[];
  headline: string;
  children: React.ReactNode;
}) {
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
          () => setActive((i) => (i + 1) % slides.length),
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
  }, [slides.length]);

  return (
    <HeroContext.Provider value={{ active, slides, headline }}>
      {children}
    </HeroContext.Provider>
  );
}

/** Index of the active desktop slide. */
export const useHeroSlide = () => useContext(HeroContext).active;
/** Slides and H1 text of the hero. */
export const useHero = () => useContext(HeroContext);
