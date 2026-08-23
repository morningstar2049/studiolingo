import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import type { Course } from "./coursesData";

export default function CourseCard({
  course: c,
  index = 0,
  headingTag: Heading = "h3",
}: {
  course: Course;
  index?: number;
  // h2 on the /courses grid (clean H1→H2), h3 in the homepage carousel.
  headingTag?: "h2" | "h3";
}) {
  return (
    <Link
      href={c.slug}
      style={{ animationDelay: `${index * 0.28}s` }}
      className="course-rise flex flex-col h-full overflow-hidden bg-[#fff] border border-[#e7ecea] rounded-[22px] shadow-[0_18px_40px_-20px_rgba(41,49,66,0.35)] transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_30px_60px_-22px_rgba(47,158,77,0.4)]"
    >
      <div
        className="h-[184px] flex items-center justify-center"
        style={{
          background: `linear-gradient(140deg, ${c.blockFrom ?? c.accent}, ${c.blockTo ?? c.accentLight})`,
        }}
        dangerouslySetInnerHTML={{ __html: c.art }}
      />
      <div className="flex flex-col flex-1 px-[22px] pb-6">
        <div className="relative z-[2] flex flex-wrap gap-1.5 -mt-4">
          {c.chips.map((chip, i) => (
            <span
              key={chip}
              className="bg-[#fff] border border-[#e7ecea] text-[11px] font-bold px-[11px] py-[5px] rounded-full shadow-[0_6px_14px_-8px_rgba(41,49,66,0.3)]"
              style={{ color: i === 0 ? c.accentText : "#5f6b74" }}
            >
              {chip}
            </span>
          ))}
        </div>
        <Heading
          style={{ fontFeatureSettings: "'case' on" }}
          className="mt-4 text-[19px] font-bold leading-snug text-lingo-black"
        >
          {c.title}
        </Heading>
        <p className="mt-[11px] text-[13.5px] leading-relaxed text-[#5f6b74]">
          {c.desc}
        </p>
        <span
          className="flex items-center gap-2 pt-[18px] mt-auto text-sm font-bold transition-all duration-200 w-max group-hover:gap-3"
          style={{ color: c.accentText }}
        >
          დეტალურად
          <AiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
