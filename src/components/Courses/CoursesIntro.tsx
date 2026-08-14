"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiSparkles } from "react-icons/hi";

export default function CoursesIntro() {
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
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center w-full max-w-5xl gap-6 mx-auto sm:flex-row sm:gap-12"
    >
      <Image
        src="/ilikoNew.png"
        alt="ილიკო — Studio Lingo-ს დამფუძნებელი"
        width={240}
        height={427}
        priority
        className={`w-[150px] sm:w-[240px] h-auto shrink-0 ${
          visible ? "cli-photo" : "opacity-0"
        }`}
      />

      <div
        className={`flex-1 w-full rounded-[22px] bg-[#fff] border border-[#eceef2] px-8 py-10 sm:px-10 sm:py-14 text-center shadow-[0_24px_54px_-22px_rgba(41,49,66,0.28)] ${
          visible ? "cli-card" : "opacity-0"
        }`}
      >
        <span
          className={`inline-flex items-center gap-2 rounded-full bg-[#eaf6ee] px-4 py-2 text-xs sm:text-sm font-bold tracking-[0.14em] text-[#1f7d3a] ${
            visible ? "cli-chip" : "opacity-0"
          }`}
        >
          <HiSparkles className={visible ? "cli-spark" : ""} />
          ხელოვნური ინტელექტი
        </span>

        <h2
          style={{ fontFeatureSettings: "'case' on" }}
          className={`max-w-2xl mx-auto mt-5 text-2xl font-bold leading-snug sm:text-4xl text-lingo-black ${
            visible ? "cli-pop" : "opacity-0"
          }`}
        >
          პირველი ინგლისურის სკოლა საქართველოში, რომელმაც ხელოვნური ინტელექტი
          გამოიყენა
        </h2>

        <div
          className={`w-24 h-1 mx-auto mt-5 rounded bg-lingo-green ${
            visible ? "cli-line" : "scale-x-0"
          }`}
        />
      </div>
    </div>
  );
}
