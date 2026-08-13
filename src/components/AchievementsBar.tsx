"use client";

import { useEffect, useState } from "react";
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
    iconClass: "text-lg sm:text-4xl",
    value: 3000,
    decimals: 0,
    group: false,
    suffix: "+",
    label: "მოსწავლე",
  },
  {
    icon: HiUsers,
    iconClass: "text-2xl sm:text-5xl",
    value: 300000,
    decimals: 0,
    group: true,
    suffix: "+",
    label: "გამომწერი",
  },
  {
    icon: FaGoogle,
    iconClass: "text-lg sm:text-4xl",
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
}: Pick<Stat, "value" | "decimals" | "group" | "suffix">) {
  // Initial state is the final value so SSR renders real numbers (good for SEO
  // and no-JS); the animation from 0 kicks in on mount.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
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
  }, [value]);

  return (
    <span className="text-2xl font-bold leading-none sm:text-6xl text-[#fff] tabular-nums whitespace-nowrap">
      {formatNumber(display, decimals, group)}
      {suffix}
    </span>
  );
}

export default function AchievementsBar() {
  return (
    <div className="grid grid-cols-3 px-1 py-4 mt-8 border shadow-lg sm:mt-0 rounded-2xl sm:rounded-3xl bg-[#ffffff14] backdrop-blur-md border-[#ffffff33] sm:px-6 sm:py-8">
      {stats.map(
        ({ icon: Icon, iconClass, value, decimals, group, suffix, label }, i) => (
          <div
            key={label}
            className={`flex flex-col items-center justify-center ${
              i === 1 ? "px-4 sm:px-16" : "px-2 sm:px-12"
            } ${i > 0 ? "border-l border-[#ffffff26]" : ""}`}
          >
            <span className="flex items-center justify-center h-8 mb-2 sm:h-14 sm:mb-3">
              <Icon className={`text-lingo-green ${iconClass}`} />
            </span>
          <Counter
            value={value}
            decimals={decimals}
            group={group}
            suffix={suffix}
          />
          <span className="mt-1.5 sm:mt-2.5 text-[11px] sm:text-lg text-[#ffffffcc] whitespace-nowrap">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
