"use client";
import { BsMessenger } from "react-icons/bs";

// Opens Messenger to the Studio Lingo Facebook Page. Replies happen in the
// Facebook Page inbox / Meta Business Suite (Messenger + Instagram).
const MESSENGER_URL = "https://m.me/studiolingo";

export default function MessengerButton() {
  // Wrapper handles the attention pop/pulse animation; the inner <a> keeps its
  // own hover transform so the two don't fight.
  return (
    <div className="fixed z-40 bottom-5 right-2 sm:right-5 msgr-anim">
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="მოგვწერე მესენჯერზე"
        style={{ fontFeatureSettings: "'case' on" }}
        className="flex items-center justify-center gap-1 sm:gap-2 rounded-full bg-lingo-green px-2.5 sm:px-5 py-2.5 sm:py-3 min-w-[130px] sm:min-w-0 font-bold text-[#fff] shadow-lg shadow-lingo-green/40 transition-transform duration-300 hover:scale-105 hover:bg-[#2f904d]"
      >
        <BsMessenger className="text-sm sm:text-xl shrink-0" />
        <span className="text-[11px] sm:text-base">მოგვწერე</span>
      </a>
    </div>
  );
}
