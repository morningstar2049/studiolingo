"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

// Floating "back to top" control. Sits bottom-left so it never collides with
// the Messenger pill (bottom-right); fades/scales in once the visitor has
// scrolled past the first viewport.
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="ზემოთ დაბრუნება"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#e3e7ec] bg-[#fff] text-lingo-green shadow-lg shadow-[rgba(41,49,66,0.18)] transition-all duration-300 hover:bg-lingo-green hover:text-[#fff] hover:scale-105 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <FaArrowUp className="text-base" />
    </button>
  );
}
