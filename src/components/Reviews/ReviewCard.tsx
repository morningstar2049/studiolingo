"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ReviewItem = { author: string; rating: number; text: string };

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span
      aria-label={`${filled}/5`}
      style={{ letterSpacing: "1px", fontSize: "14px", lineHeight: 1 }}
    >
      <span style={{ color: "#fbbc04" }}>{"★".repeat(filled)}</span>
      <span style={{ color: "#dadce0" }}>{"★".repeat(5 - filled)}</span>
    </span>
  );
}

// All cards render at a uniform height (roughly the length of the shortest
// reviews). Longer reviews are clamped and reveal the rest via "მეტი".
export default function ReviewCard({ review }: { review: ReviewItem }) {
  const [expanded, setExpanded] = useState(false);
  const [clampable, setClampable] = useState(false);
  const [visible, setVisible] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    const el = textRef.current;
    if (!el || expanded) return;
    // Truncated when the full text is taller than the clamped box.
    setClampable(el.scrollHeight > el.clientHeight + 1);
  }, [expanded]);

  useEffect(() => {
    measure();
    // ReviewsGrid dispatches a resize when it reveals hidden cards, which lets
    // this re-measure — hidden cards start display:none, so the initial measure
    // sees zero height and would otherwise never show the "მეტი" toggle.
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Slow reveal that re-runs every time the card scrolls into view (up or
  // down), matching the blog header / CoursesIntro behaviour.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col min-h-[16rem] bg-[#fff] rounded-xl p-6 shadow-[0_10px_24px_-8px_rgba(41,49,66,0.18)] ${
        visible ? "review-rise" : "opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-11 h-11 text-lg font-bold rounded-full bg-lingo-green text-[#fff] shrink-0">
          {review.author.trim().charAt(0)}
        </div>
        <div>
          <div className="font-bold text-lingo-black">{review.author}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Stars rating={review.rating} />
            <span className="text-xs text-[#6b7280]">· Google-ზე</span>
          </div>
        </div>
      </div>

      <p
        ref={textRef}
        className={`text-[15px] leading-relaxed text-lingo-black whitespace-pre-line ${
          expanded ? "" : "line-clamp-5"
        }`}
      >
        {review.text}
      </p>

      {(clampable || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="self-start mt-2 text-sm font-bold transition-opacity text-lingo-green hover:opacity-80"
        >
          {expanded ? "ნაკლები" : "მეტი"}
        </button>
      )}
    </div>
  );
}
