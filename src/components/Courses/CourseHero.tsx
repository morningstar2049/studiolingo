"use client";

import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";

// Full-width cover hero for a course detail page: a dark navy panel with the
// course illustration behind the headline, plus the blog-rise reveal.
type Props = {
  title: string;
  subtitle: string;
  art: string;
  from: string;
  to: string;
};

export default function CourseHero({ title, subtitle, art, from, to }: Props) {
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
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: `linear-gradient(120deg, ${from}, ${to})` }}
    >
      {/* Cover illustration behind the headline */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 items-center hidden w-[42%] max-w-[520px] sm:flex pointer-events-none"
        dangerouslySetInnerHTML={{ __html: art }}
      />
      {/* Left-side darkening so the headline stays legible over the artwork */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,15,26,.45), rgba(10,15,26,0) 62%)",
        }}
      />
      <div className="relative z-10 max-w-3xl px-5 mx-auto py-9 sm:py-12">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 mb-4 text-sm font-bold transition-colors text-[#ffffffd9] hover:text-[#fff]"
        >
          <AiOutlineArrowLeft />
          ყველა კურსი
        </Link>
        <div className="max-w-xl">
          <h1
            style={{ fontFeatureSettings: "'case' on" }}
            className={`text-2xl sm:text-[30px] font-bold leading-[1.15] text-[#fff] ${
              visible ? "blog-rise" : "opacity-0"
            }`}
          >
            {title}
          </h1>
          <p
            style={{ color: "rgba(255,255,255,0.9)" }}
            className={`mt-3 text-sm leading-relaxed sm:text-base ${
              visible ? "blog-rise-2" : "opacity-0"
            }`}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
