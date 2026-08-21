import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

// Full-width navy cover for the FAQ page — same language as the course heroes.
export default function FaqHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(120deg, #2a375c, #181f33)" }}
    >
      {/* decorative oversized question marks */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden select-none sm:block pointer-events-none"
        style={{
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          color: "#ffffff12",
          fontSize: "230px",
          lineHeight: 1,
          paddingRight: "6%",
          display: "flex",
          alignItems: "center",
        }}
      >
        ?
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
          ხშირად დასმული <span className="text-lingo-green">კითხვები</span>
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-[#c3c9d4] blog-rise-2">
          ყველაზე ხშირი კითხვები სტუდიო ლინგოს კურსების, მეთოდებისა და
          რეგისტრაციის შესახებ — ერთ ადგილას.
        </p>
      </div>
    </div>
  );
}
