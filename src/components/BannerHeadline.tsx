"use client";

import { useEffect, useRef, useState } from "react";

export default function BannerHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h1
      ref={ref}
      style={{ fontFeatureSettings: "'case' on" }}
      className={`text-[#fff] font-bold text-lg sm:text-4xl tracking-[2px] max-w-4xl ${
        inView ? "hero-reveal" : "opacity-0"
      }`}
    >
      ინგლისურის კურსები თბილისში და ონლაინ — ზრდასრულებისა და მოზარდებისთვის
    </h1>
  );
}
