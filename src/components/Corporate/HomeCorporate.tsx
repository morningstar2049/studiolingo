import Image from "next/image";
import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import RevealOnScroll from "../RevealOnScroll";

const topics = [
  "ფინანსები და ბუღალტერია",
  "მარკეტინგი",
  "ადამიანური რესურსები (HR)",
  "ბიზნეს სამართალი",
  "ლოჯისტიკა",
];

export default function HomeCorporate() {
  return (
    <section className="max-w-6xl px-5 mx-auto my-16 sm:my-20">
      <RevealOnScroll revealClass="blog-rise" once>
        <div
          className="relative grid overflow-hidden lg:grid-cols-2 rounded-[28px] shadow-[0_30px_64px_-28px_rgba(10,14,24,0.7)]"
          style={{
            background:
              "linear-gradient(135deg,#1e2a48 0%,#151d33 55%,#0d1322 100%)",
            fontFeatureSettings: "'case' on",
          }}
        >
          {/* brand-green glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(520px 260px at 0% 0%, rgba(47,158,77,0.35), transparent 60%), radial-gradient(420px 240px at 100% 100%, rgba(47,158,77,0.14), transparent 60%)",
            }}
          />

          {/* Left: copy + CTA */}
          <div className="relative z-10 p-7 sm:p-11">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-full sm:text-sm text-[#5fd07f] bg-[#2f9e4d1f] border border-[#2f9e4d40]">
              <FaBriefcase className="text-sm" />
              ბიზნესისთვის · A1–C1
            </span>

            <h2 className="mt-5 text-2xl font-bold leading-tight text-[#fff] sm:text-4xl">
              კორპორაციული <span className="text-lingo-green">ინგლისური</span>
            </h2>

            <p className="mt-3 text-[15px] leading-relaxed text-[#aab2c2] sm:text-base">
              ინგლისური კომპანიებისა და გუნდებისთვის — ზოგადი და სასაუბრო
              ინგლისურიდან ბიზნეს ლექსიკამდე, თქვენს სფეროზე მორგებული.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {topics.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1.5 text-[12px] font-bold text-[#cfe8d7] bg-[#ffffff0d] border border-[#ffffff1f]"
                >
                  {t}
                </span>
              ))}
            </div>

            <Link
              href="/corporate"
              className="inline-flex items-center gap-2 px-7 py-3.5 mt-8 text-[15px] font-bold transition-transform rounded-xl text-[#fff] bg-lingo-green shadow-[0_16px_36px_-14px_rgba(47,158,77,0.7)] hover:scale-[1.03]"
            >
              დეტალურად
              <AiOutlineArrowRight className="shrink-0" />
            </Link>
          </div>

          {/* Right: photo (desktop only), blended into the card */}
          <div className="relative hidden lg:block min-h-[360px]">
            <Image
              src="/corporate-pic.png"
              alt="კორპორაციული ინგლისურის ტრენინგი"
              fill
              className="object-cover"
              sizes="(min-width:1024px) 50vw, 0px"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg,#141d33 0%,rgba(20,29,51,0.35) 26%,transparent 60%)",
              }}
            />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
