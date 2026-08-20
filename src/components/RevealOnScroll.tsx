"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Re-runs its reveal animation every time the content scrolls into view
// (up or down), matching the blog header / review card behaviour.
export default function RevealOnScroll({
  children,
  className = "",
  revealClass = "review-rise",
  delay = 0,
  stable = false,
}: {
  children?: ReactNode;
  className?: string;
  revealClass?: string;
  delay?: number;
  stable?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      // `stable` is for elements at the very bottom of the page (e.g. a final
      // CTA): a plain edge trigger, with no 0.2 ratio boundary or bottom
      // margin, avoids the flicker that restarts the animation on mobile as
      // the address bar resizes the viewport near the page end.
      stable
        ? { threshold: 0 }
        : { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stable]);

  return (
    <div
      ref={ref}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={`${className} ${visible ? revealClass : "opacity-0"}`}
    >
      {children}
    </div>
  );
}
