"use client";

import { useEffect, useRef, useState } from "react";
import { useHero } from "./HeroContext";

const headline = "text-[#fff] font-bold text-lg sm:text-4xl tracking-[2px]";
// Captions: one line each, so a step smaller until the xl breakpoint.
const caption = "text-[#fff] font-bold tracking-[2px] sm:text-3xl xl:text-4xl";

// Hero headline. The H1 is the school's SEO headline and always exists in the
// page; on desktop it is shown with the first photo, and each following photo
// fades in its own line instead (phones keep the H1 throughout).
export default function BannerHeadline() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  // After the one-off reveal animation, the H1 fades with the slides instead
  // (an animation's fill would otherwise pin its opacity at 1).
  const [revealed, setRevealed] = useState(false);
  const { active, slides, headline: h1 } = useHero();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ fontFeatureSettings: "'case' on" }}
      className="relative w-full max-w-4xl sm:max-w-none sm:min-h-[2.6em] sm:text-4xl"
    >
      {/* Desktop: the school headline sits below the faces of photo 1, in the
          table zone just above the stats bar (about 52% of the hero height). The
          offset lives on a wrapper so the reveal animation's transform on the
          h1 itself is untouched. */}
      <div className="sm:translate-y-[calc(52vh-80px-9vw)]">
        <h1
          onAnimationEnd={() => setRevealed(true)}
          className={`${headline} mx-auto max-w-4xl ${
            revealed
              ? `transition-opacity duration-700 ${active === 0 ? "opacity-100" : "sm:opacity-0"}`
              : inView
                ? "hero-reveal"
                : "opacity-0"
          }`}
        >
          {h1}
        </h1>
      </div>
      {slides.map((slide, i) =>
        slide.caption ? (
          <p
            key={`${slide.src}-${i}`}
            aria-hidden={active !== i}
            // Short captions stay on one line; long ones wrap like the H1.
            className={`${slide.captionWrap ? `${headline} mx-auto max-w-4xl` : `${caption} whitespace-nowrap`} absolute inset-x-0 top-0 hidden sm:block transition-opacity duration-700 ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.caption}
          </p>
        ) : null,
      )}
    </div>
  );
}
