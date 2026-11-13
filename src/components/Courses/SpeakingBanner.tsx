"use client";

import { useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa6";

// The point the course has to land: a recorded course where you still speak a
// lot. It animates in when scrolled to, and the counters count up, so the eye
// stops here instead of skimming past.
const STATS = [
  { value: 3, suffix: "", label: "საუბრის ნაწილი ყოველ გაკვეთილში" },
  { value: 8, suffix: " წმ", label: "პასუხზე — როგორც ცოცხალ საუბარში" },
  { value: 5, suffix: " წმ", label: "გრამატიკის სწრაფ გამოყენებაზე" },
];

export default function SpeakingBanner() {
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
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative px-6 py-10 mt-14 overflow-hidden text-center sm:py-14 rounded-3xl"
      style={{ background: "linear-gradient(120deg, #2a375c, #181f33)" }}
    >
      <span
        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-lingo-green text-[#fff] text-2xl transition-all duration-700 ${
          shown ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <FaMicrophone />
      </span>

      <p
        style={{ fontFeatureSettings: "'case' on" }}
        className={`mt-5 text-[23px] font-bold leading-tight text-[#fff] sm:text-3xl transition-all duration-700 delay-150 ${
          shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        ვიდეო კურსში შენ ბევრს ისაუბრებ
      </p>

      <p
        className={`max-w-xl mx-auto mt-3 text-[15px] leading-relaxed text-[#c3c9d4] transition-all duration-700 delay-300 ${
          shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        ეს არ არის კურსი, სადაც მხოლოდ უყურებ. ყოველ გაკვეთილში შენ თავად
        ამბობ წინადადებებს ხმამაღლა — დიალოგებში, თარგმანში და სწრაფ
        სავარჯიშოებში. ლაპარაკი სწორედ ლაპარაკით ისწავლება.
      </p>

      <div className="grid max-w-2xl gap-4 mx-auto mt-9 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-4 py-5 rounded-2xl bg-[#ffffff14] transition-all duration-700 ${
              shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${450 + i * 120}ms` }}
          >
            <p className="text-3xl font-bold text-lingo-green">
              <Count to={s.value} run={shown} />
              {s.suffix}
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-[#c3c9d4]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Counts from 0 up to `to` once the banner is in view.
function Count({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    let frame = 0;
    const steps = 24;
    const id = setInterval(() => {
      frame += 1;
      setN(Math.round((to * frame) / steps));
      if (frame >= steps) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [run, to]);

  return <>{n}</>;
}
