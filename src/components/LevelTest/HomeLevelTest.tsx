import Link from "next/link";
import { FaLanguage, FaCheck } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import RevealOnScroll from "../RevealOnScroll";

const features = [
  "48 ადაპტირებული კითხვა — ჩერდება შენს დონეზე",
  "მოსმენისა და მართლწერის შემოწმება",
  "შედეგს მაშინვე იღებ — დონე A1-დან C1-მდე",
];

const levels = [
  { l: "A1", h: 30 },
  { l: "A2", h: 46 },
  { l: "B1", h: 62 },
  { l: "B2", h: 80 },
  { l: "C1", h: 100 },
];

export default function HomeLevelTest() {
  return (
    <section className="max-w-6xl px-5 mx-auto my-16 sm:my-20">
      <RevealOnScroll revealClass="blog-rise">
        <div
          className="relative grid overflow-hidden lg:grid-cols-2 rounded-[28px] border border-[#d3ebdc] shadow-[0_30px_64px_-30px_rgba(47,158,77,0.32)]"
          style={{
            background: "linear-gradient(135deg,#ffffff 0%,#f0f8f3 55%,#e8f5ed 100%)",
            fontFeatureSettings: "'case' on",
          }}
        >
          {/* brand-green glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(520px 260px at 100% 0%, rgba(47,158,77,0.14), transparent 60%), radial-gradient(420px 240px at 0% 100%, rgba(47,158,77,0.08), transparent 60%)",
            }}
          />

          {/* Left: copy + CTA */}
          <div className="relative z-10 p-7 sm:p-11">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-full sm:text-sm text-lingo-green bg-[#eaf6ee] border border-[#bfe6cb]">
              <FaLanguage className="text-base" />
              ინგლისურის დონის ტესტი
            </span>

            <h2 className="mt-5 text-2xl font-bold leading-tight text-lingo-black sm:text-4xl">
              შეამოწმე შენი ინგლისურის დონე{" "}
              <span className="text-lingo-green">უფასოდ</span>
            </h2>

            <p className="mt-3 text-[15px] leading-relaxed text-[#59636d] sm:text-base">
              მორგებული ტესტი, რომელიც შენს დონეზე ჩერდება — სულ რამდენიმე წუთში
              გაიგებ, დაახლოებით რა დონეზე ხარ.
            </p>

            <ul className="flex flex-col gap-3 mt-6">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[14px] text-[#3f4a52]">
                  <span className="flex items-center justify-center w-5 h-5 mt-0.5 text-[10px] rounded-full shrink-0 bg-lingo-green text-[#fff]">
                    <FaCheck />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/language-test"
              className="inline-flex items-center gap-2 px-7 py-3.5 mt-8 text-[15px] font-bold transition-transform rounded-xl text-[#fff] bg-lingo-green shadow-[0_16px_36px_-14px_rgba(47,158,77,0.7)] hover:scale-[1.03]"
            >
              დაიწყე ტესტი
              <AiOutlineArrowRight className="shrink-0" />
            </Link>
          </div>

          {/* Right: CEFR level ladder (desktop only) */}
          <div className="relative z-10 items-center justify-center hidden p-11 lg:flex">
            <div className="w-full max-w-sm p-6 rounded-2xl bg-[#f5faf7] border border-[#d9ebe0]">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-lingo-black">
                  ინგლისურის დონეები
                </span>
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-full text-[#fff] bg-lingo-green">
                  A1–C1
                </span>
              </div>
              <div className="flex items-end justify-between h-44 gap-3">
                {levels.map((lv, i) => (
                  <div key={lv.l} className="flex flex-col items-center flex-1 h-full">
                    <div className="flex items-end w-full h-full">
                      <div
                        className="w-full rounded-t-lg"
                        style={{
                          height: `${lv.h}%`,
                          background:
                            i === levels.length - 1
                              ? "linear-gradient(180deg,#5fd07f,#2f9e4d)"
                              : "linear-gradient(180deg,#3bb85e,#217e3b)",
                          opacity: i === levels.length - 1 ? 1 : 0.65 + i * 0.08,
                        }}
                      />
                    </div>
                    <span className="mt-2 text-[12px] font-bold text-[#5f6b74]">
                      {lv.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* floating result chip */}
            <span className="absolute top-8 right-8 hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold rounded-full text-[#fff] bg-lingo-green shadow-lg content-float">
              <FaCheck className="text-[10px]" /> უფასო
            </span>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
