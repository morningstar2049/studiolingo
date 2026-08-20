"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { team, type TeamMember } from "./teamData";

// White circular arrow matching the course carousel.
const arrowCls =
  "shrink-0 flex items-center justify-center rounded-full bg-[#fff] text-lingo-green text-lg shadow-[0_12px_26px_-10px_rgba(41,49,66,0.4)] border border-[#e7ecea] transition-colors hover:bg-lingo-green hover:text-[#fff]";

const cardWrapCls = "group w-full shrink-0 snap-center sm:w-[300px] sm:shrink";

function TeamCard({ member }: { member: TeamMember }) {
  // The whole picture becomes the video link once the "გაიცანი" overlay shows.
  // Touch: first tap on the card reveals it, second tap on the picture opens the
  // video. Desktop: hover reveals, click opens.
  const [revealed, setRevealed] = useState(false);
  const picRef = useRef<HTMLDivElement>(null);

  const revealOnTouch = () => {
    if (!member.videoUrl) return;
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;
    if (coarse && !revealed) setRevealed(true);
  };

  // While revealed on touch, tapping anywhere outside the picture collapses it.
  useEffect(() => {
    if (!revealed) return;
    const close = (e: PointerEvent) => {
      if (picRef.current && !picRef.current.contains(e.target as Node)) {
        setRevealed(false);
      }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [revealed]);

  return (
    <div data-slide className={cardWrapCls}>
      <div className="w-[66%] max-w-[260px] mx-auto sm:w-full sm:max-w-none">
        <div
          ref={picRef}
          onClick={revealOnTouch}
          className={`relative w-full overflow-hidden transition-all duration-300 aspect-[4/5] rounded-[22px] ring-1 ring-[#ffffff1f] shadow-[0_18px_40px_-20px_rgba(10,14,24,0.7)] sm:group-hover:-translate-y-1.5 sm:group-hover:shadow-[0_30px_56px_-22px_rgba(10,14,24,0.8)] ${
            revealed
              ? "-translate-y-1.5 shadow-[0_30px_56px_-22px_rgba(10,14,24,0.8)]"
              : ""
          }`}
          style={{
            background:
              "linear-gradient(160deg,#1b2540 0%,#141d33 50%,#0d1322 100%)",
          }}
        >
          {/* subtle cool light behind the head so cutouts separate from the deep blue (no green) */}
          <div className="absolute left-1/2 top-[4%] h-[64%] w-[84%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(158,178,214,0.16),rgba(158,178,214,0.05)_52%,transparent_70%)]" />

          <Image
            src={member.src}
            alt={member.alt}
            fill
            sizes="(max-width:640px) 45vw, 300px"
            className={`relative object-contain object-bottom transition-transform duration-500 sm:group-hover:scale-[1.045] ${
              revealed ? "scale-[1.045]" : ""
            }`}
          />

          {member.videoUrl && (
            <>
              <span
                className={`absolute inline-flex items-center justify-center w-8 h-8 rounded-full bottom-3 right-3 bg-[#fff] text-[#141d33] shadow-md transition-opacity duration-300 pointer-events-none sm:group-hover:opacity-0 ${
                  revealed ? "opacity-0" : ""
                }`}
              >
                <FaPlay className="text-[11px] translate-x-[1px]" />
              </span>

              {/* The whole picture is the link — a darkening overlay that becomes
                  clickable once revealed (hover on desktop, first tap on mobile). */}
              <a
                href={member.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`absolute inset-0 flex items-center justify-center bg-[#0d13228c] transition-opacity duration-300 sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto ${
                  revealed
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <span
                  style={{ fontFeatureSettings: "'case' on" }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fff] text-lingo-green text-sm font-bold shadow-lg transition-transform duration-300 sm:group-hover:translate-y-0 ${
                    revealed ? "translate-y-0" : "translate-y-3"
                  }`}
                >
                  <FaPlay className="text-[10px] shrink-0" /> გაიცანი
                </span>
              </a>
            </>
          )}
        </div>

        <div className="flex flex-col items-center pt-4 text-center">
          <div
            style={{ fontFeatureSettings: "'case' on" }}
            className="text-lg font-bold tracking-wide sm:text-xl text-lingo-black"
          >
            {member.name}
          </div>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 mt-2.5 rounded-full text-[13px] font-bold tracking-[0.02em] text-lingo-green"
            style={{
              backgroundColor: "rgba(47,158,77,0.10)",
              boxShadow: "inset 0 0 0 1px rgba(47,158,77,0.28)",
              fontFeatureSettings: "normal",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lingo-green shrink-0" />
            {member.role}
          </span>
        </div>
      </div>
    </div>
  );
}

// Premium team lineup: each member is a background-free cutout placed on a deep
// brand-blue stage. Faces are pre-normalised and head-centred (see
// public/team/*.webp) so the row reads as a consistent set.
function TeamGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const slides = [...el.querySelectorAll<HTMLElement>("[data-slide]")];
    if (!slides.length) return;
    const count = slides.length;
    const step =
      slides.length > 1
        ? slides[1].offsetLeft - slides[0].offsetLeft
        : el.clientWidth;
    const cur = Math.round(el.scrollLeft / step);
    const target = (cur + dir + count) % count; // wraps last→first and first→last
    slides[target].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="წინა"
        onClick={() => scrollByCard(-1)}
        className={`${arrowCls} flex sm:hidden w-10 h-10 absolute left-3 top-[38%] -translate-y-1/2 z-10`}
      >
        <AiOutlineLeft />
      </button>
      <button
        type="button"
        aria-label="შემდეგი"
        onClick={() => scrollByCard(1)}
        className={`${arrowCls} flex sm:hidden w-10 h-10 absolute right-3 top-[38%] -translate-y-1/2 z-10`}
      >
        <AiOutlineRight />
      </button>

      <div
        ref={scrollRef}
        className="flex w-full max-w-6xl gap-5 px-5 py-2 mx-auto overflow-x-auto snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:overflow-visible sm:snap-none sm:gap-8"
      >
        {team.map((member) => (
          <TeamCard key={member.alt} member={member} />
        ))}
      </div>
    </div>
  );
}

export default TeamGrid;
