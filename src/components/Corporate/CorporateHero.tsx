import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

// Full-width navy cover for the corporate page — same language as the FAQ /
// materials heroes.
export default function CorporateHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(120deg, #2a375c, #181f33)" }}
    >
      {/* decorative oversized icon */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 items-center hidden pr-[6%] sm:flex pointer-events-none"
      >
        <FaBriefcase style={{ fontSize: 160, color: "#ffffff12" }} />
      </div>

      <div className="relative z-10 max-w-3xl px-5 mx-auto py-9 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-4 text-sm font-bold transition-colors text-[#ffffffd9] hover:text-[#fff]"
        >
          <AiOutlineArrowLeft />
          მთავარი
        </Link>
        <h1
          style={{ fontFeatureSettings: "'case' on" }}
          className="text-2xl font-bold text-[#fff] sm:text-[30px] blog-rise"
        >
          კორპორაციული <span className="text-lingo-green">ინგლისური</span>
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-[#c3c9d4] blog-rise-2">
          ინგლისური კომპანიებისა და გუნდებისთვის — ბიზნესის საჭიროებებზე
          მორგებული სწავლება.
        </p>
        <a
          href="https://canva.link/aqs6m3c09y16opf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-[15px] font-bold transition-transform rounded-xl text-[#fff] bg-lingo-green shadow-[0_16px_36px_-14px_rgba(47,158,77,0.7)] hover:scale-[1.03]"
        >
          ნახე ჩვენი შეთავაზება
          <FiExternalLink className="shrink-0" />
        </a>
      </div>
    </div>
  );
}
