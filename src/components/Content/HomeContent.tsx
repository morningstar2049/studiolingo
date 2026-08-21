import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import RevealOnScroll from "../RevealOnScroll";

// Floating social icons on the dark navy visual — mirrors the /content hero.
const floats = [
  {
    icon: <FaYoutube />,
    color: "#ff3d33",
    glow: "rgba(255,61,51,0.4)",
    cls: "top-[10%] left-[12%]",
    big: true,
  },
  {
    icon: <FaInstagram />,
    color: "#ff5fa2",
    glow: "rgba(238,42,123,0.36)",
    cls: "bottom-[12%] left-[24%]",
    big: false,
  },
  {
    icon: <FaTiktok />,
    color: "#eaeef6",
    glow: "rgba(140,160,200,0.28)",
    cls: "top-[16%] right-[18%]",
    big: false,
  },
  {
    icon: <FaFacebookF />,
    color: "#4293f5",
    glow: "rgba(66,147,245,0.36)",
    cls: "bottom-[14%] right-[12%]",
    big: true,
  },
];

export default function HomeContent() {
  return (
    <section className="max-w-6xl px-5 mx-auto my-16 sm:my-20">
      <RevealOnScroll revealClass="blog-rise">
        <div
          className="relative grid overflow-hidden lg:grid-cols-2 rounded-[28px] shadow-[0_30px_64px_-28px_rgba(10,14,24,0.7)]"
          style={{
            background: "linear-gradient(135deg,#1e2a48 0%,#151d33 55%,#0d1322 100%)",
            fontFeatureSettings: "'case' on",
          }}
        >
          {/* Left: copy + CTA */}
          <div className="relative z-10 p-7 sm:p-11">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-full sm:text-sm text-[#5fd07f] bg-[#2f9e4d1f] border border-[#2f9e4d40]">
              სოციალური ქსელები
            </span>

            <h2 className="mt-5 text-2xl font-bold leading-tight text-[#fff] sm:text-4xl">
              ჩვენი <span className="text-lingo-green">კონტენტი</span>
            </h2>

            <p className="mt-3 text-[15px] leading-relaxed text-[#aab2c2] sm:text-base">
              300 000+ გამომწერი YouTube-ზე, Instagram-ზე, TikTok-სა და
              Facebook-ზე — ვქმნით საქართველოში #1 ინგლისურ ვიდეო კონტენტს,
              სახალისოდ და უფასოდ.
            </p>

            <Link
              href="/content"
              className="inline-flex items-center gap-2 px-7 py-3.5 mt-8 text-[15px] font-bold transition-transform rounded-xl text-[#fff] bg-lingo-green shadow-[0_16px_36px_-14px_rgba(47,158,77,0.7)] hover:scale-[1.03]"
            >
              ნახე ჩვენი კონტენტი
              <AiOutlineArrowRight className="shrink-0" />
            </Link>
          </div>

          {/* Floating social-icon graphic — behind the text on mobile (full
              card), a dedicated right column on desktop. */}
          <div className="absolute inset-0 z-0 lg:relative lg:inset-auto lg:z-auto">
            {floats.map((f, i) => (
              <span key={i}>
                <span
                  aria-hidden
                  className={`absolute ${f.cls} rounded-full blur-2xl ${
                    f.big ? "w-40 h-40" : "w-28 h-28"
                  }`}
                  style={{
                    background: `radial-gradient(circle, ${f.glow}, transparent 65%)`,
                    transform: "translate(-15%, -15%)",
                  }}
                />
                <span
                  className={`absolute ${f.cls} flex items-center justify-center rounded-2xl backdrop-blur-md content-float ${
                    f.big ? "w-16 h-16 text-3xl" : "w-14 h-14 text-2xl"
                  }`}
                  style={{
                    color: f.color,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    boxShadow: "0 12px 34px -16px rgba(0,0,0,0.6)",
                    animationDelay: `${i * 0.45}s`,
                  }}
                >
                  {f.icon}
                </span>
              </span>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
