import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";

const features = [
  "ინდივიდუალური და ჯგუფური კურსები",
  "ონლაინ და ადგილზე",
  "სასაუბრო და ზოგადი",
];

// Courses CTA shown next to blog articles on desktop (pinned by the page).
export default function BlogCoursesCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] p-7 border border-[#cfead8] shadow-[0_24px_54px_-28px_rgba(47,158,77,0.38)]"
      style={{
        background: "linear-gradient(160deg,#ffffff 0%,#eef8f1 100%)",
        fontFeatureSettings: "'case' on",
      }}
    >
      {/* soft green glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(320px 190px at 100% 0%, rgba(47,158,77,0.16), transparent 62%)",
        }}
      />
      <div className="relative z-10">
          <span className="inline-flex items-center px-3.5 py-1.5 text-xs font-bold rounded-full text-lingo-green bg-[#eaf6ee] border border-[#bfe6cb]">
            სტუდიო ლინგო
          </span>

          <h3 className="mt-4 text-xl font-bold leading-snug text-lingo-black">
            ისწავლე ინგლისური <span className="text-lingo-green">სწორად</span>
          </h3>

          <p className="mt-3 text-[14px] leading-relaxed text-[#59636d]">
            #1 ინგლისურის სკოლა საქართველოში — ვასწავლით ბუნებრივ, თავისუფალ
            მეტყველებას შენს დონეზე მორგებული მეთოდით.
          </p>

          <ul className="flex flex-col gap-2.5 mt-5">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-[13.5px] text-[#3f4a52]"
              >
                <span className="flex items-center justify-center w-5 h-5 mt-0.5 text-[10px] rounded-full shrink-0 bg-lingo-green text-[#fff]">
                  <FaCheck />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <Link
            href="/courses"
            className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 mt-6 text-[15px] font-bold transition-transform rounded-xl text-[#fff] bg-lingo-green shadow-[0_16px_36px_-14px_rgba(47,158,77,0.7)] hover:scale-[1.02]"
          >
            გაეცანი კურსებს
            <AiOutlineArrowRight className="shrink-0" />
          </Link>
        </div>
      </div>
  );
}
