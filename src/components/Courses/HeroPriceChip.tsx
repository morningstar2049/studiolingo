"use client";

import { useEffect, useState } from "react";

// The presale drop in the hero chip. This chip sits above the fold, so the
// animation runs on mount instead of waiting for a scroll: the line draws
// across the old price, then the new one fades up. The old price keeps its <s>
// semantics but loses the default underline, so the stroke is the drawn bar.
// Both prices hold their space from the first frame, so the chip never jumps.
export default function HeroPriceChip({
  full,
  presale,
  className = "",
}: {
  full: number;
  presale: number;
  className?: string;
}) {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setRun(true), 450);
    return () => clearTimeout(id);
  }, []);

  return (
    <span className={`${className} inline-flex items-baseline gap-1.5`}>
      <s className="relative inline-block no-underline text-[12px] text-[#9aa5b4]">
        {full} ₾
        <span
          aria-hidden="true"
          className="absolute left-0 h-[2px] rounded bg-[#e24b4a] transition-all duration-500 ease-out"
          style={{
            top: "48%",
            width: run ? "112%" : "0%",
            marginLeft: "-6%",
          }}
        />
      </s>
      <strong
        className={`font-bold transition-all duration-500 ${
          run ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
        style={{ transitionDelay: "520ms" }}
      >
        {presale} ₾
      </strong>
    </span>
  );
}
