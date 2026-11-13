"use client";

import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

// Collapsible list used twice on the video course page: once for the lesson
// programme and once for the questions. Only one row is open at a time, so the
// page never grows into a wall of text.
export type AccordionItem = {
  title: string;
  /** Small grey line under the title, shown while the row is closed too. */
  note?: string;
  body: string;
};

export default function VideoCourseAccordion({
  items,
}: {
  items: AccordionItem[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.title}
            className="overflow-hidden border rounded-xl border-[#e3e7ec] bg-[#fff]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex items-center justify-between w-full gap-4 px-4 py-3.5 text-left"
            >
              <span>
                <span className="block font-bold text-lingo-black">
                  {item.title}
                </span>
                {item.note && (
                  <span className="block mt-0.5 text-[13px] text-[#6b7280]">
                    {item.note}
                  </span>
                )}
              </span>
              <AiOutlineDown
                className={`text-lingo-green shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-[14px] sm:text-[15px] leading-relaxed text-[#4b5563]">
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
