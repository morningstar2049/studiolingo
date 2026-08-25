"use client";

import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

// On-brand scrollable modal shell: solid header + internal scroll area +
// solid footer button, corners clipped so content never peeks around the bars.
export default function InfoModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center p-4 overflow-y-auto bg-[#0d1322cc] backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        style={{ fontFeatureSettings: "normal" }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-full max-w-2xl overflow-hidden bg-[#fff] rounded-[24px] max-h-[calc(100dvh-2rem)] shadow-[0_40px_80px_-24px_rgba(10,14,24,0.6)]"
      >
        <div className="flex items-center justify-between px-6 py-5 bg-[#fff] border-b border-[#eceef2] shrink-0">
          <h2
            style={{ fontFeatureSettings: "'case' on" }}
            className="text-lg font-bold sm:text-xl text-lingo-black"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="დახურვა"
            className="flex items-center justify-center w-9 h-9 rounded-full text-[#6b7280] hover:bg-[#f2f4f7]"
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="flex flex-col flex-1 min-h-0 gap-4 px-6 py-6 overflow-y-auto text-[15px] leading-relaxed text-[#3f4a52]">
          {children}
        </div>

        <div className="px-6 py-4 bg-[#fff] border-t border-[#eceef2] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-[15px] font-bold rounded-xl text-[#fff] bg-lingo-green hover:bg-[#2b904a]"
          >
            დახურვა
          </button>
        </div>
      </div>
    </div>
  );
}
