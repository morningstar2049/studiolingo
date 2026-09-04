"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Desktop hero background: each photo zooms in slowly (Ken Burns) for ~6.5s,
// then crossfades to the next, looping 1 → 3 → 4.
// `pos` is the object-position focal point: photo 1's faces sit low in the
// frame, so it favours the top to keep them clear of the stats bar.
const SLIDES = [
  { src: "/banner-web-1.jpg", pos: "object-[50%_0%]" },
  { src: "/banner-web-3.jpg", pos: "object-[50%_35%]" },
  { src: "/banner-web-4.jpg", pos: "object-[50%_35%]" },
];
const INTERVAL_MS = 6500;

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 hidden overflow-hidden sm:block animate-appear">
      {SLIDES.map(({ src, pos }, i) => {
        const isActive = i === active;
        return (
          <Image
            key={src}
            src={src}
            alt="Studio Lingo — ინგლისურის გაკვეთილი თბილისში"
            fill
            priority={i === 0}
            sizes="100vw"
            // `hero-zoom` is (re)applied only while active, so the zoom restarts
            // from scale(1) every time a slide comes back around.
            className={`object-cover ${pos} transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 hero-zoom" : "opacity-0"
            }`}
          />
        );
      })}
    </div>
  );
}
