"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { TOTAL_SUBS } from "./contentData";

function useCountUp(target: number, run: boolean, ms = 1800) {
  const [n, setN] = useState(0);
  useEffect(() => {
    // Reset to 0 whenever the stat leaves the viewport so it counts up again
    // the next time it scrolls back in (up or down).
    if (!run) {
      setN(0);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setN(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return n;
}

const chips = [
  { icon: <FaYoutube />, color: "#ff3d33", cls: "top-[14%] left-[8%]" },
  { icon: <FaInstagram />, color: "#ff5fa2", cls: "top-[62%] left-[12%]" },
  { icon: <FaTiktok />, color: "#eaeef6", cls: "top-[20%] right-[10%]" },
  { icon: <FaFacebookF />, color: "#4293f5", cls: "top-[66%] right-[9%]" },
];

export default function ContentHero() {
  const [run, setRun] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  // Re-run the count-up every time the stat scrolls into view (up or down).
  useEffect(() => {
    const el = statRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRun(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setRun(entry.isIntersecting),
      { threshold: 0.45 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(TOTAL_SUBS, run);
  const formatted = count.toLocaleString("en-US").replace(/,/g, " ");

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "radial-gradient(120% 120% at 50% 0%, #202c4d 0%, #131a2e 55%, #0b1020 100%)" }}
    >
      {/* colored platform glows */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,61,51,0.28),transparent_62%)]" />
        <div className="absolute top-10 right-[-80px] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(238,42,123,0.26),transparent_62%)]" />
        <div className="absolute bottom-[-120px] left-1/3 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(47,158,77,0.22),transparent_64%)]" />
      </div>

      {/* floating platform chips (desktop) */}
      {chips.map((c, i) => (
        <div
          key={i}
          className={`absolute ${c.cls} hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl text-2xl backdrop-blur-md content-float`}
          style={{
            color: c.color,
            background: "rgba(255,255,255,0.06)",
            boxShadow: "0 12px 34px -16px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.12)",
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {c.icon}
        </div>
      ))}

      <div className="relative z-10 max-w-4xl px-5 mx-auto py-14 text-center sm:py-20">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold transition-colors text-[#ffffffcc] hover:text-[#fff]"
          >
            <AiOutlineArrowLeft />
            მთავარი
          </Link>
        </div>

        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[12px] font-bold tracking-[0.14em] uppercase rounded-full text-[#2f9e4d]"
          style={{ background: "rgba(47,158,77,0.14)", border: "1px solid rgba(47,158,77,0.3)" }}
        >
          სოციალური ქსელები
        </div>

        <h1
          style={{ fontFeatureSettings: "'case' on" }}
          className="text-3xl font-bold leading-tight text-[#fff] sm:text-5xl content-rise"
        >
          #1 ინგლისური <span className="text-[#2f9e4d]">კონტენტი</span>
          <br className="hidden sm:block" /> სოციალურ ქსელებში
        </h1>

        <div ref={statRef} className="mt-9 content-rise-2">
          <div
            className="text-6xl font-extrabold sm:text-8xl"
            style={{
              backgroundImage: "linear-gradient(120deg,#3bb85e,#2f9e4d)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {formatted}+
          </div>
          <div className="mt-1 text-base font-semibold tracking-wide text-[#c3c9d4] sm:text-lg">
            გამომწერი 4 პლატფორმაზე
          </div>
        </div>

        <p className="max-w-2xl mx-auto mt-8 text-[15px] leading-relaxed text-[#aab2c2] sm:text-lg content-rise-2">
          Studio Lingo ქმნის საქართველოში ყველაზე მრავალფეროვან, სახალისო და
          ხარისხიან ინგლისურ ვიდეო კონტენტს — YouTube-ზე, Instagram-ზე, TikTok-სა
          და Facebook-ზე. ვსწავლობთ გართობით და ამიტომაც ვართ #1.
        </p>
      </div>
    </div>
  );
}
