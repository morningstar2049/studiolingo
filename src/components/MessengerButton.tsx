"use client";
import { useRef } from "react";
import { BsMessenger } from "react-icons/bs";
import { useAdaptiveGlass } from "./useAdaptiveGlass";

// Opens Messenger to the Studio Lingo Facebook Page. Replies happen in the
// Facebook Page inbox / Meta Business Suite (Messenger + Instagram).
const MESSENGER_URL = "https://m.me/studiolingo";

export default function MessengerButton() {
  const ref = useRef<HTMLDivElement>(null);
  useAdaptiveGlass(ref);
  // Wrapper handles the attention pop/pulse animation; the inner <a> keeps its
  // own hover transform so the two don't fight. Liquid glass adapts to the
  // page behind it.
  return (
    <div ref={ref} data-glass className="fixed z-40 bottom-5 right-2 sm:right-5 msgr-anim">
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="მოგვწერე მესენჯერზე"
        style={{ fontFeatureSettings: "'case' on" }}
        className="flex items-center justify-center gap-1 sm:gap-2 rounded-full liquid-glass px-2.5 sm:px-5 py-2.5 sm:py-3 min-w-[130px] sm:min-w-0 font-bold transition-transform duration-300 hover:scale-105"
      >
        <BsMessenger className="text-sm sm:text-xl shrink-0 text-lingo-green" />
        <span className="text-[11px] sm:text-base">მოგვწერე</span>
      </a>
    </div>
  );
}
