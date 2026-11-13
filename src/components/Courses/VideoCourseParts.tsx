"use client";

import { useEffect, useRef, useState } from "react";
import {
  PiBookOpenTextBold,
  PiPuzzlePieceBold,
  PiChatsBold,
} from "react-icons/pi";

// The three videos every lesson is built from. The cards lift into place one
// after another when the section is scrolled to, so the eye reads them in
// order instead of taking the row in at once.
const PARTS = [
  {
    Icon: PiBookOpenTextBold,
    heading: "ლექსიკა",
    text: "დაახლოებით 30 ახალი სიტყვა და ფრაზა ქართული მნიშვნელობით, ნაწილებად დაყოფილი. თითოეულ ნაწილს თან ახლავს აუდიო, რომ გამოთქმა თავიდანვე სწორად დაიმახსოვრო. სიტყვები არ მეორდება — ყოველი გაკვეთილი ახალს ამატებს.",
  },
  {
    Icon: PiPuzzlePieceBold,
    heading: "გრამატიკა",
    text: "წესი ახსნილია ქართულად, ცოცხალი მაგალითებით. შემდეგ მოდის „სწრაფი გამოყენება — 5 წამი“: წინადადებას თავად აწყობ, სანამ პასუხს ნახავ. გაკვეთილის ბოლოს კი შერეული გამეორებაა.",
  },
  {
    Icon: PiChatsBold,
    heading: "საუბარი",
    text: "სამი ნაწილი, თითოეულში დიალოგი და სავარჯიშო — წინადადების დასრულება ან თარგმნა. პასუხზე 8 წამი გაქვს, ანუ ფიქრის დრო ისეთივეა, როგორიც რეალურ საუბარში.",
  },
];

export default function VideoCourseParts() {
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
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-3">
      {PARTS.map((p, i) => (
        <div
          key={p.heading}
          className={`p-5 border rounded-2xl border-[#e3e7ec] bg-[#fff] transition-all duration-700 ease-out ${
            shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${i * 160}ms` }}
        >
          <span
            className={`flex items-center justify-center w-12 h-12 mb-3 text-2xl rounded-xl bg-[#eaf6ee] text-lingo-green transition-all duration-700 ${
              shown ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ transitionDelay: `${160 + i * 160}ms` }}
          >
            <p.Icon />
          </span>
          <h3 className="text-base font-bold text-lingo-black">{p.heading}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-[#4b5563]">
            {p.text}
          </p>
        </div>
      ))}
    </div>
  );
}
