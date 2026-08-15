"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Re-runs its reveal animation every time the content scrolls into view
// (up or down), matching the blog header / review card behaviour.
export default function RevealOnScroll({
  children,
  className = "",
  revealClass = "review-rise",
}: {
  children: ReactNode;
  className?: string;
  revealClass?: string;
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
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${visible ? revealClass : "opacity-0"}`}>
      {children}
    </div>
  );
}
