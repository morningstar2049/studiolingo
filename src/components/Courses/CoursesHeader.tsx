"use client";

import { useEffect, useRef, useState } from "react";

// Mirrors the blog page header: green bar + FiraGO-capitalized title + subtitle,
// with the same blog-rise reveal that re-runs when it scrolls into view.
type Props = { title?: string; subtitle?: string };

export default function CoursesHeader({
  title = "ინგლისურის კურსები",
  subtitle = "აირჩიე შენთვის იდეალური ფორმატი — ინდივიდუალური თუ ჯგუფური, ონლაინ თუ ადგილზე, სასაუბრო თუ ზოგადი",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex gap-5 mb-12">
      <span
        className={`origin-top w-[5px] shrink-0 self-stretch rounded bg-lingo-green ${
          visible ? "blog-bar" : "scale-y-0"
        }`}
      />
      <div>
        <h1
          style={{ fontFeatureSettings: "'case' on" }}
          className={`text-3xl font-bold sm:text-4xl text-lingo-black ${
            visible ? "blog-rise" : "opacity-0"
          }`}
        >
          {title}
        </h1>
        <p
          className={`mt-3 text-lg text-[#6b7280] ${
            visible ? "blog-rise-2" : "opacity-0"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
