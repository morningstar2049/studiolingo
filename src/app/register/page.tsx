import type { Metadata } from "next";
import Link from "next/link";
import { PiBackpackBold, PiBriefcaseBold } from "react-icons/pi";
import { AiOutlineArrowRight } from "react-icons/ai";

const title = "რეგისტრაცია | Studio Lingo";
const description =
  "დარეგისტრირდი ინგლისურის კურსზე — აირჩიე მოზარდების ან ზრდასრულების კურსი.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/register" },
  openGraph: { title, description, images: ["/og-logo.png"] },
};

const options = [
  {
    href: "/register/teens",
    icon: <PiBackpackBold />,
    title: "მოზარდები",
    text: "ინგლისური მოზარდებისთვის",
    age: "9–16 წელი",
  },
  {
    href: "/register/adults",
    icon: <PiBriefcaseBold />,
    title: "ზრდასრულები",
    text: "ინგლისური ზრდასრულთათვის",
    age: "17 წლიდან",
  },
];

export default function RegisterChooserPage() {
  return (
    <>
      <div
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(120deg, #2a375c, #181f33)" }}
      >
        <div className="max-w-3xl px-5 mx-auto py-8 text-center sm:py-11">
          <h1
            style={{ fontFeatureSettings: "'case' on" }}
            className="text-2xl font-bold text-[#fff] sm:text-3xl"
          >
            რეგისტრაცია
          </h1>
          <p className="mt-2 text-[15px] text-[#c3c9d4]">
            აირჩიე კურსი და შეავსე სარეგისტრაციო ფორმა.
          </p>
        </div>
      </div>

      <main className="px-5 py-10 sm:py-14">
        <div className="grid max-w-3xl gap-5 mx-auto sm:grid-cols-2">
          {options.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className="group flex flex-col items-start gap-4 p-7 sm:p-8 bg-[#fff] border border-[#eceef2] rounded-[24px] shadow-[0_24px_54px_-26px_rgba(41,49,66,0.3)] transition-all hover:-translate-y-1 hover:border-lingo-green hover:shadow-[0_28px_60px_-24px_rgba(47,158,77,0.35)]"
            >
              <div className="flex items-center justify-between w-full">
                <span className="flex items-center justify-center w-14 h-14 text-2xl rounded-2xl bg-lingo-green/10 text-lingo-green">
                  {o.icon}
                </span>
                <span className="px-3 py-1 text-[13px] font-bold rounded-full bg-lingo-green/10 text-lingo-green">
                  {o.age}
                </span>
              </div>
              <div>
                <h2
                  style={{ fontFeatureSettings: "'case' on" }}
                  className="text-xl font-bold sm:text-2xl text-lingo-black"
                >
                  {o.title}
                </h2>
                <p className="mt-1 text-[15px] text-[#5f6b74]">{o.text}</p>
              </div>
              <span className="inline-flex items-center gap-2 mt-2 text-[15px] font-bold text-lingo-green">
                რეგისტრაცია
                <AiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
