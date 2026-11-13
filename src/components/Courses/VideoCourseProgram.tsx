"use client";

import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

// The lesson list behind one dropdown. Each lesson shows its title and theme
// only — the grammar detail lives in the lesson itself, not on the sales page.
export type ProgramLesson = { title: string; note: string };

export default function VideoCourseProgram({
  lessons,
}: {
  lessons: ProgramLesson[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden border rounded-xl border-[#e3e7ec] bg-[#fff]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center justify-between w-full gap-4 px-4 py-4 text-left"
      >
        <span className="font-bold text-lingo-black">
          გაკვეთილების სია
          <span className="ml-2 text-[13px] font-medium text-[#6b7280]">
            {lessons.length} გაკვეთილი მზადაა
          </span>
        </span>
        <AiOutlineDown
          className={`text-lingo-green shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="px-4 pb-4 divide-y divide-[#eef1f5]">
            {lessons.map((l) => (
              <li key={l.title} className="py-3">
                <p className="font-bold text-[15px] text-lingo-black">
                  {l.title}
                </p>
                <p className="mt-0.5 text-[13px] text-[#6b7280]">{l.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
