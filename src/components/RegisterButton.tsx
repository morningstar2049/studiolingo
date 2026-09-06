"use client";
import Link from "next/link";
import { PiNotePencilBold } from "react-icons/pi";

// Floating "register" pill, bottom-left — the mirror of the Messenger pill on
// the right. Leads to the course registration chooser.
export default function RegisterButton() {
  return (
    <div className="fixed z-40 bottom-5 left-2 sm:left-5 msgr-anim">
      <Link
        href="/register"
        aria-label="რეგისტრაცია კურსზე"
        style={{ fontFeatureSettings: "'case' on" }}
        className="flex items-center justify-center gap-1 sm:gap-2 rounded-full bg-lingo-green px-2.5 sm:px-5 py-2.5 sm:py-3 min-w-[130px] sm:min-w-0 font-bold text-[#fff] shadow-lg shadow-lingo-green/40 transition-transform duration-300 hover:scale-105 hover:bg-[#2f904d]"
      >
        <PiNotePencilBold className="text-sm sm:text-xl shrink-0" />
        <span className="text-[11px] sm:text-base">რეგისტრაცია</span>
      </Link>
    </div>
  );
}
