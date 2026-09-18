"use client";

import Image from "next/image";
import { useHero } from "./HeroContext";

// Desktop hero background: each photo zooms in slowly (Ken Burns) for ~6.5s,
// then crossfades to the next. The active index comes from HeroProvider so the
// headline switches in step with the photo.
export default function HeroSlideshow() {
  const { active, slides } = useHero();

  return (
    <div className="absolute inset-0 hidden overflow-hidden sm:block animate-appear">
      {slides.map(({ src, position, alt }, i) => {
        const isActive = i === active;
        return (
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            priority={i === 0}
            sizes="100vw"
            // `hero-zoom` is (re)applied only while active, so the zoom restarts
            // from scale(1) every time a slide comes back around.
            style={{ objectPosition: position }}
            className={`object-cover scale-[1.1] transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 hero-zoom" : "opacity-0"
            }`}
          />
        );
      })}
    </div>
  );
}
