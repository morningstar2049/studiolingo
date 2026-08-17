"use client";

import { useEffect, useRef, useState } from "react";
import { FaUserGraduate, FaGoogle } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import type { IconType } from "react-icons";

type Stat = {
  icon: IconType;
  iconClass: string;
  value: number;
  decimals: number;
  group: boolean;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  {
    icon: FaUserGraduate,
    iconClass: "text-base sm:text-3xl",
    value: 3000,
    decimals: 0,
    group: false,
    suffix: "+",
    label: "მოსწავლე",
  },
  {
    icon: HiUsers,
    iconClass: "text-xl sm:text-4xl",
    value: 300000,
    decimals: 0,
    group: true,
    suffix: "+",
    label: "გამომწერი",
  },
  {
    icon: FaGoogle,
    iconClass: "text-base sm:text-3xl",
    value: 5,
    decimals: 1,
    group: false,
    suffix: "",
    label: "Google შეფასება",
  },
];

function formatNumber(n: number, decimals: number, group: boolean) {
  const fixed = n.toFixed(decimals);
  const [intPart, dec] = fixed.split(".");
  const grouped = group
    ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : intPart;
  return dec !== undefined ? `${grouped}.${dec}` : grouped;
}

function Counter({
  value,
  decimals,
  group,
  suffix,
  inView,
}: Pick<Stat, "value" | "decimals" | "group" | "suffix"> & {
  inView: boolean;
}) {
  // Initial state is the final value so SSR renders real numbers (good for SEO
  // and no-JS); the count-up runs whenever the bar scrolls into view.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, inView]);

  return (
    <span className="text-2xl font-bold leading-none sm:text-6xl text-[#fff] tabular-nums whitespace-nowrap">
      {formatNumber(display, decimals, group)}
      {suffix}
    </span>
  );
}

export default function AchievementsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 px-1 py-4 mt-8 border shadow-lg sm:mt-0 rounded-2xl sm:rounded-3xl bg-[#ffffff14] backdrop-blur-md border-[#ffffff33] sm:px-6 sm:py-8"
    >
      {stats.map(
        ({ icon: Icon, iconClass, value, decimals, group, suffix, label }, i) => (
          <div
            key={label}
            className={`flex flex-col items-center justify-center ${
              i === 1 ? "px-4 sm:px-16" : "px-2 sm:px-12"
            } ${i > 0 ? "border-l border-[#ffffff26]" : ""}`}
          >
            <span className="mb-2 sm:mb-3 flex h-9 w-9 sm:h-16 sm:w-16 items-center justify-center rounded-[14px] sm:rounded-2xl bg-gradient-to-br from-[#43c667] to-[#1e7d3a] shadow-[0_8px_20px_-6px_rgba(47,158,77,0.6)] ring-1 ring-inset ring-[#ffffff40]">
              <Icon className={`text-[#fff] ${iconClass}`} />
            </span>
          <Counter
            value={value}
            decimals={decimals}
            group={group}
            suffix={suffix}
            inView={inView}
          />
          <span className="mt-1.5 sm:mt-2.5 text-[11px] sm:text-lg text-[#ffffffcc] whitespace-nowrap">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
