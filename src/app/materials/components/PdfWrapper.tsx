"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  sub?: string;
  accent: string;
  href: string;
  index?: number;
};

function hexToRgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function PdfWrapper({ label, sub, accent, href, index = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Staggered slow reveal that re-runs each time a card scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${index * 0.12}s` }}
      className={visible ? "review-rise" : "opacity-0"}
    >
      <div className="w-[260px] overflow-hidden transition-all duration-300 bg-[#fff] border border-[#eceef2] shadow-[0_14px_34px_-16px_rgba(41,49,66,0.28)] rounded-2xl group hover:-translate-y-2 hover:shadow-[0_28px_54px_-18px_rgba(47,158,77,0.34)]">
        <div
          className="relative overflow-hidden h-[336px]"
          style={{
            background:
              "radial-gradient(circle at 84% 10%,rgba(47,158,77,.30),transparent 50%),radial-gradient(circle at 8% 92%,rgba(59,184,94,.24),transparent 52%),#ffffff",
          }}
        >
          {/* Studio Lingo mark */}
          <svg
            className="absolute top-5 left-5"
            width="30"
            height="30"
            viewBox="247 281 300 300"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path fill="#293142" d="M397.16,296.26c-74.33,0-134.8,60.47-134.8,134.8v134.8h134.8c74.33,0,134.79-60.47,134.79-134.8s-60.47-134.8-134.79-134.8Zm0,248.9h-114.1v-114.1c0-62.91,51.19-114.1,114.1-114.1s114.1,51.19,114.1,114.1-51.18,114.1-114.1,114.1Z" />
            <path fill="#2f9e4d" d="M354.89,377.75c-14.2-.11-14.21,21.95,0,22.06,19.53,.15,38.14,7.7,51.98,21.53s21.38,32.46,21.53,51.98c.11,14.19,22.17,14.22,22.06,0-.19-25.22-10.11-49.7-27.99-67.58-17.88-17.88-42.35-27.8-67.58-27.99Z" />
            <path fill="#2f9e4d" d="M354.89,410.14c-14.2-.17-14.21,21.89,0,22.06,22.72,.27,40.84,18.43,41.12,41.12,.17,14.19,22.23,14.22,22.06,0-.42-34.69-28.49-62.76-63.18-63.18Z" />
            <path fill="#2f9e4d" d="M354.89,444.56c-5.77-.16-11.29,5.18-11.03,11.03,.27,6.11,4.85,10.86,11.03,11.03,5,1.4,7,4,7.4,8.6,.4,4.7,4.9,8.9,10.5,8.7,5.84-.26,11.2-4.85,11.03-11.03-.43-15.94-12.82-28.33-28.76-28.76Z" />
          </svg>

          {/* big green outline level number */}
          <span
            className="absolute font-bold leading-none pointer-events-none select-none"
            style={{
              top: 42,
              right: 6,
              fontSize: 210,
              color: "transparent",
              WebkitTextStroke: `2.5px ${hexToRgba(accent, 0.55)}`,
            }}
          >
            {index + 1}
          </span>

          {/* floating frosted-glass tag (number refracts behind it) */}
          <div
            className="absolute left-4 right-4 p-4 overflow-hidden bottom-4 rounded-2xl"
            style={{
              background: "rgba(255,255,255,.4)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,.75)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,.95), 0 10px 24px -10px rgba(41,49,66,.22)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg,rgba(255,255,255,.55),rgba(255,255,255,0) 42%)",
              }}
            />
            <div className="relative">
              <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-lingo-green">
                ინგლისური
              </div>
              <div className="mt-1 text-[19px] font-bold leading-tight text-lingo-black">
                {label}
              </div>
              {sub && (
                <div className="mt-0.5 text-[13px] font-semibold text-[#6b7280]">
                  {sub}
                </div>
              )}
              <div
                className="mt-2.5 h-[3px] w-9 rounded"
                style={{ background: accent }}
              />
            </div>
          </div>

          {/* hover overlay + button */}
          <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 bg-lingo-black/0 group-hover:bg-lingo-black/25">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 font-bold text-[#fff] transition-all duration-300 translate-y-3 rounded-full shadow-lg opacity-0 bg-lingo-green group-hover:translate-y-0 group-hover:opacity-100"
            >
              ნახვა
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfWrapper;
