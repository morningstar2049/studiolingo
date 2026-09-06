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
    <div ref={ref} data-glass className="fixed z-40 bottom-5 right-1 sm:right-5 msgr-anim">
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="მოგვწერე მესენჯერზე"
        style={{ fontFeatureSettings: "'case' on" }}
        className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-full liquid-glass px-3 sm:px-5 py-3.5 sm:py-3 min-w-[150px] sm:min-w-0 font-bold transition-transform duration-300 hover:scale-105"
      >
        <BsMessenger className="text-base sm:text-xl shrink-0 text-lingo-green" />
        <span className="text-[13px] sm:text-base">მოგვწერე</span>
      </a>
    </div>
  );
}
