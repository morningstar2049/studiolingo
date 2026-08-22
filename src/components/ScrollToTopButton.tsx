"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const R = 21;
const CIRC = 2 * Math.PI * R;

// Floating "back to top" control. Sits bottom-left so it never collides with
// the Messenger pill (bottom-right); fades/scales in once the visitor has
// scrolled past the first viewport. A green-gradient ring around the button
// tracks how far down the page the visitor has scrolled.
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 400);
      setProgress(max > 0 ? Math.min(scrolled / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="ზემოთ დაბრუნება"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-5 left-5 z-40 h-12 w-12 sm:h-[52px] sm:w-[52px] transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {/* progress ring */}
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="scrollTopRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#43c667" />
            <stop offset="100%" stopColor="#1e7d3a" />
          </linearGradient>
        </defs>
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="#dfe4ea"
          strokeWidth="3"
        />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="url(#scrollTopRing)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress)}
          style={{ transition: "stroke-dashoffset 120ms linear" }}
        />
      </svg>
      {/* inner button */}
      <span className="absolute inset-[5px] flex items-center justify-center rounded-full bg-transparent text-lingo-green group-hover:bg-lingo-green group-hover:text-[#fff] group-active:bg-lingo-green group-active:text-[#fff]">
        <FaArrowUp className="text-base" />
      </span>
    </button>
  );
}
