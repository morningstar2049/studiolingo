"use client";
import Link from "next/link";
import { useRef } from "react";
import { PiNotePencilBold } from "react-icons/pi";
import { useAdaptiveGlass } from "./useAdaptiveGlass";

// Floating "register" pill, bottom-left — the mirror of the Messenger pill on
// the right. Liquid glass that adapts to the page behind it.
export default function RegisterButton() {
  const ref = useRef<HTMLDivElement>(null);
  useAdaptiveGlass(ref);
  return (
    <div ref={ref} data-glass className="fixed z-40 bottom-5 left-1 sm:left-5 msgr-anim">
      <Link
        href="/register"
        aria-label="რეგისტრაცია კურსზე"
        style={{ fontFeatureSettings: "'case' on" }}
        className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-full liquid-glass px-3 sm:px-5 py-3.5 sm:py-3 min-w-[150px] sm:min-w-0 font-bold transition-transform duration-300 hover:scale-105"
      >
        <PiNotePencilBold className="text-base sm:text-xl shrink-0 text-lingo-green" />
        <span className="text-[13px] sm:text-base">რეგისტრაცია</span>
      </Link>
    </div>
  );
}
