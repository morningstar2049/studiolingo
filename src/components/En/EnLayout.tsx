import Link from "next/link";
import type { ReactNode } from "react";

// Shared frame for the small English section (/en). The site's own header and
// footer stay Georgian, so these pages carry their own links plus a pointer
// back to the Georgian site.

const PAGES = [
  { href: "/en", label: "English courses" },
  { href: "/en/corporate", label: "Corporate training" },
  { href: "/en/prices", label: "Prices" },
  { href: "/en/contact", label: "Contact" },
];

export default function EnLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="max-w-3xl px-5 pt-8 pb-16 mx-auto sm:pt-12" lang="en">
      <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-bold text-lingo-green">
        {PAGES.map((p) => (
          <Link key={p.href} href={p.href}>
            {p.label}
          </Link>
        ))}
        <Link href="/" className="text-[#8a929d]">
          ქართულად →
        </Link>
      </nav>

      <h1 className="mt-6 text-[28px] sm:text-4xl font-bold leading-tight text-lingo-black">
        {title}
      </h1>
      <p className="mt-4 text-[15px] sm:text-[17px] leading-relaxed text-[#4b5563]">
        {intro}
      </p>

      {children}

      <div className="flex flex-wrap gap-3 mt-12">
        <Link
          href="/language-test"
          className="px-6 py-3 font-bold rounded-xl bg-lingo-green text-[#fff]"
        >
          Take the free level test
        </Link>
        <Link
          href="/en/contact"
          className="px-6 py-3 font-bold rounded-xl ring-1 ring-[#d7dbe3] text-lingo-black"
        >
          Contact us
        </Link>
      </div>
    </main>
  );
}

// Small shared pieces so the four pages look alike.
export function Section({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold sm:text-2xl text-lingo-black">
        {heading}
      </h2>
      <div className="mt-3 text-[15px] leading-relaxed text-[#4b5563] space-y-3">
        {children}
      </div>
    </section>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="pl-5 space-y-2 list-disc">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
