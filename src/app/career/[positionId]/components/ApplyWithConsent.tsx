"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa6";

const caseOn = { fontFeatureSettings: "'case' on" } as const;
const CONSENT_TEXT = "ყურადღებით გავეცანი ვაკანსიის აღწერილობას და ვეთანხმები";

// "განაცხადის გაგზავნა": opens a small confirmation window first. The Google
// Form only opens once the candidate ticks that they read the vacancy.
export default function ApplyWithConsent({
  href,
  block = false,
}: {
  href: string;
  block?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const checkboxId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const openDialog = () => {
    setAgreed(false);
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        style={caseOn}
        className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[15px] font-bold transition-transform rounded-xl text-[#fff] bg-lingo-green shadow-[0_18px_40px_-14px_rgba(47,158,77,0.75)] hover:scale-[1.03] ${
          block ? "w-full sm:w-auto" : ""
        }`}
      >
        განაცხადის გაგზავნა
        <FaPaperPlane className="text-sm shrink-0" />
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="modal-fade fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#0d1322cc] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${checkboxId}-title`}
              onClick={(e) => e.stopPropagation()}
              className="modal-pop relative w-full max-w-md p-6 sm:p-7 bg-[#fff] rounded-[24px] shadow-[0_40px_80px_-24px_rgba(10,14,24,0.6)]"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="დახურვა"
                className="absolute flex items-center justify-center rounded-full top-4 right-4 w-9 h-9 text-[#6b7280] hover:bg-[#f2f4f7]"
              >
                <AiOutlineClose />
              </button>

              <h2
                id={`${checkboxId}-title`}
                style={caseOn}
                className="pr-10 text-lg font-bold sm:text-xl text-lingo-black"
              >
                განაცხადის გაგზავნა
              </h2>

              <label
                htmlFor={checkboxId}
                className={`flex items-start gap-3 p-4 mt-5 rounded-2xl border cursor-pointer transition-colors ${
                  agreed
                    ? "border-lingo-green bg-[#f2faf5]"
                    : "border-[#e5e7eb] hover:border-[#bfe6cb]"
                }`}
              >
                <input
                  id={checkboxId}
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 mt-0.5 shrink-0 cursor-pointer accent-[#2f9e4d]"
                />
                <span className="text-[15px] leading-relaxed text-[#3f4a52]">
                  {CONSENT_TEXT}
                </span>
              </label>

              {/* A real link so the form opens in a new tab straight from the
                  tap (no pop-up blocking); inert until the box is ticked. */}
              <a
                href={agreed ? href : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!agreed}
                onClick={(e) => {
                  if (!agreed) {
                    e.preventDefault();
                    return;
                  }
                  setOpen(false);
                }}
                style={caseOn}
                className={`flex items-center justify-center w-full gap-2.5 py-3.5 mt-5 text-[15px] font-bold rounded-xl transition-colors ${
                  agreed
                    ? "text-[#fff] bg-lingo-green hover:bg-[#2b904a] cursor-pointer"
                    : "text-[#9aa3ad] bg-[#eef0f3] cursor-not-allowed"
                }`}
              >
                გაგრძელება
                <FaPaperPlane className="text-sm shrink-0" />
              </a>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
