"use client";

import { useEffect, useRef, useState } from "react";

// Presale price block. The old price is struck through as the line draws
// across it, then the lower price lands — so the drop is something you watch
// happen rather than a number you have to compare yourself.
export default function VideoCoursePrice({
  full,
  presale,
}: {
  full: number;
  presale: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShown(true),
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const saving = full - presale;

  return (
    <div ref={ref} className="flex flex-wrap items-end gap-x-4 gap-y-2">
      <span
        className={`inline-block px-3 py-1 text-[12px] font-bold rounded-full text-[#fff] bg-lingo-green transition-all duration-500 ${
          shown ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        პრესეილი
      </span>

      <span className="relative inline-block text-2xl font-bold text-[#9aa5b4]">
        {full} ₾
        <span
          aria-hidden="true"
          className="absolute left-0 h-[3px] rounded bg-[#e24b4a] transition-all duration-500 ease-out"
          style={{
            top: "52%",
            width: shown ? "108%" : "0%",
            marginLeft: "-4%",
            transitionDelay: "250ms",
          }}
        />
      </span>

      <span
        className={`text-[40px] leading-none font-bold text-lingo-black transition-all duration-500 ${
          shown ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-90"
        }`}
        style={{ transitionDelay: "650ms" }}
      >
        {presale} ₾
      </span>

      <span
        className={`text-[13px] font-medium text-lingo-green transition-opacity duration-500 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "850ms" }}
      >
        დაზოგავ {saving} ₾
      </span>
    </div>
  );
}
