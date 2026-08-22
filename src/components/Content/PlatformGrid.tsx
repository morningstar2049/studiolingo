"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import RevealOnScroll from "../RevealOnScroll";
import { platforms } from "./contentData";

// Each icon flies in from a different screen edge before joining the circle.
const enterFrom: CSSProperties[] = [
  { "--ey": "-460px" } as CSSProperties, // from the top
  { "--ex": "100vw" } as CSSProperties, // from the right
  { "--ey": "460px" } as CSSProperties, // from the bottom
  { "--ex": "-100vw" } as CSSProperties, // from the left
];

export default function PlatformGrid() {
  const n = platforms.length;
  const ref = useRef<HTMLDivElement>(null);
  // Bumped each time the ring scrolls into view so the fly-in replays (it would
  // otherwise finish before the user — especially on mobile — scrolls down to it).
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let inside = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inside) {
          inside = true;
          setCycle((c) => c + 1);
        } else if (!entry.isIntersecting) {
          inside = false;
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="mt-16 sm:mt-20">
      <div className="max-w-6xl px-5 mx-auto">
        <RevealOnScroll revealClass="blog-rise" className="mb-8 text-center">
          <h2
            style={{ fontFeatureSettings: "'case' on" }}
            className="text-2xl font-bold sm:text-3xl text-lingo-black"
          >
            გამოგვყევი
            <span className="sub-tick" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle
                  className="sub-tick-ring"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#2f9e4d"
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="10" fill="#2f9e4d" />
                <path
                  className="sub-tick-check"
                  d="M7.2 12.4 L10.6 15.7 L17 8.6"
                  stroke="#fff"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>{" "}
            ყველგან
          </h2>
          <p className="max-w-xl mx-auto mt-3 text-[15px] text-[#6b7280]">
            სადაც არ უნდა იყო, ჩვენი ინგლისური კონტენტი შენთანაა — დააჭირე
            პლატფორმას და შემოგვიერთდი.
          </p>
        </RevealOnScroll>
      </div>

      {/* full-width so the icons can fly in from the actual screen edges */}
      <div
        ref={ref}
        className="relative w-full h-[440px] sm:h-[640px] mt-2 overflow-hidden"
      >
        {/* big central Studio Lingo bubble */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Image
            src="/lingo-icon.svg"
            alt="Studio Lingo"
            width={240}
            height={240}
            className="w-32 h-32 sm:w-44 sm:h-44 drop-shadow-[0_20px_38px_rgba(20,26,44,0.3)]"
            priority
          />
        </div>

        {/* social icons circle the logo, evenly spaced */}
        {platforms.map((p, i) => (
          <a
            key={`${p.name}-${cycle}`}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.name} — ${p.handle}`}
            className="orbit-icon"
            style={
              {
                ...enterFrom[i % enterFrom.length],
                offsetDistance: `${(i / n) * 100}%`,
                "--phase": -i / n,
                "--enter-delay": `${i * 0.12}s`,
              } as CSSProperties
            }
          >
            <span
              className="flex items-center justify-center text-3xl text-[#fff] transition-transform duration-300 w-16 h-16 sm:w-24 sm:h-24 sm:text-[42px] rounded-[20px] sm:rounded-[24px] hover:scale-110"
              style={{
                background:
                  p.gradient ?? `linear-gradient(135deg, ${p.from}, ${p.to})`,
                boxShadow: `0 16px 34px -10px ${p.from}c0`,
              }}
            >
              {p.icon}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
