"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  decimals: number;
  group: boolean;
  suffix: string;
  label: string;
  shortLabel?: string;
};

const stats: Stat[] = [
  { value: 3000, decimals: 0, group: false, suffix: "+", label: "მოსწავლე" },
  { value: 300000, decimals: 0, group: true, suffix: "+", label: "გამომწერი" },
  {
    value: 2000,
    decimals: 0,
    group: false,
    suffix: "+",
    label: "ვიდეოგაკვეთილი",
    shortLabel: "ვიდეო",
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
    const duration = 3500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      // Clamp at 0 too: the first rAF timestamp can precede `start` by a few ms,
      // which would push the ease-out negative and flash a minus sign.
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, inView]);

  return (
    <span className="text-[28px] tracking-tighter font-bold leading-none sm:text-6xl sm:tracking-normal text-[#fff] tabular-nums whitespace-nowrap">
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

  // No icons: the vertical padding and larger type are sized so the bar keeps
  // the same height it had with the icon tiles (~120px mobile, ~176px desktop).
  return (
    <div
      ref={ref}
      className="grid w-full grid-cols-3 px-0 py-[29px] mt-8 border sm:mt-0 sm:w-auto sm:grid-cols-3 rounded-2xl sm:rounded-3xl bg-[#ffffff08] backdrop-blur-[2px] border-[#ffffff1f] sm:px-6 sm:py-9"
    >
      {stats.map(({ value, decimals, group, suffix, label, shortLabel }, i) => (
        <div
          key={label}
          className={`flex flex-col items-center justify-center ${
            i === 1 ? "px-0 sm:px-16" : "px-0 sm:px-12"
          } ${i > 0 ? "border-l border-[#ffffff1a]" : ""}`}
        >
          <Counter
            value={value}
            decimals={decimals}
            group={group}
            suffix={suffix}
            inView={inView}
          />
          <span
            style={{ fontFeatureSettings: "'case' on" }}
            className="mt-2 sm:mt-3 text-[16px] tracking-tight sm:text-2xl sm:tracking-normal font-bold text-[#ffffffcc] whitespace-nowrap"
          >
            {shortLabel ? (<><span className="sm:hidden">{shortLabel}</span><span className="hidden sm:inline">{label}</span></>) : label}
          </span>
        </div>
      ))}
    </div>
  );
}
