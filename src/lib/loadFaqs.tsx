import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { getFaqs } from "@/sanity/queries";
import { faqs as fallbackFaqs, type Faq } from "@/components/FAQ/faqData";
import { loadPrices } from "./loadPrices";
import {
  fallbackPrices,
  monthsFor,
  type MonthsTable,
  type PriceTable,
} from "./priceTable";

// The main FAQ, from Sanity ("ხშირად დასმული კითხვა") or the code fallback.
// `plain` mirrors the visible answer and feeds the FAQPage structured data,
// so Google and AI assistants quote exactly what the page shows.

const bodyStyle = { fontFeatureSettings: "normal" as const };

type PriceLine = { label: string; price: number; months: number };

function priceLines(table: PriceTable, months: MonthsTable): PriceLine[] {
  return Object.entries(table)
    .filter(([key]) => key.startsWith("english-"))
    .map(([key, price]) => {
      const [, format, lessonType, ...rest] = key.split("-");
      return {
        label: `${lessonType} ${format}, ${rest.join("-")}`,
        price,
        months: monthsFor(key, months),
      };
    })
    .sort((a, b) => a.price - b.price);
}

const priceSentence = (lines: PriceLine[]) =>
  lines
    .map(
      (l) =>
        `${l.label} — ${l.price} ₾ (${l.months} თვე, დაახლოებით ${Math.round(
          l.price / l.months,
        )} ₾ თვეში)`,
    )
    .join("; ");

function PriceSummary({ lines }: { lines: PriceLine[] }) {
  return (
    <>
      <ul className="pl-5 my-2 space-y-1 list-disc" style={bodyStyle}>
        {lines.map((l) => (
          <li key={l.label}>
            {l.label} — <strong>{l.price} ₾</strong> ({l.months} თვე, ≈{" "}
            {Math.round(l.price / l.months)} ₾ თვეში)
          </li>
        ))}
      </ul>
      <p style={bodyStyle} className="leading-relaxed">
        ყველა ვარიანტი, მოზარდების ჯგუფების ჩათვლით, იხილეთ{" "}
        <Link href="/prices" className="underline text-lingo-green">
          კურსების ფასების გვერდზე
        </Link>
        .
      </p>
    </>
  );
}

const components = (lines: PriceLine[]): PortableTextComponents => ({
  block: {
    normal: ({ children }) => (
      <p style={bodyStyle} className="leading-relaxed">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="pl-5 my-2 space-y-1 list-disc" style={bodyStyle}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="pl-5 my-2 space-y-1 list-decimal" style={bodyStyle}>
        {children}
      </ol>
    ),
  },
  marks: {
    green: ({ children }) => (
      <span className="text-lingo-green">{children}</span>
    ),
    link: ({ children, value }) => (
      <Link href={value?.href ?? "#"} className="underline text-lingo-green">
        {children}
      </Link>
    ),
  },
  types: {
    priceSummary: () => <PriceSummary lines={lines} />,
  },
});

// Plain text of one answer (for the structured data).
type PlainBlock = { _type?: string; children?: { text?: string }[] };

function toPlain(blocks: unknown[], lines: PriceLine[]) {
  return (blocks as PlainBlock[])
    .map((b) => {
      if (b._type === "priceSummary") {
        return `${priceSentence(lines)}. ყველა ვარიანტი იხილეთ კურსების ფასების გვერდზე: https://www.studiolingo.ge/prices`;
      }
      return (b.children ?? []).map((c) => c.text ?? "").join("");
    })
    .map((t) => t.trim())
    .filter(Boolean)
    .join(" ");
}

export async function loadFaqs(): Promise<Faq[]> {
  const res = await getFaqs();
  if (!res || res.total === 0) return fallbackFaqs;

  const loaded = await loadPrices();
  const lines = priceLines(
    loaded?.prices ?? fallbackPrices,
    loaded?.months ?? {},
  );
  const parts = components(lines);

  return res.faqs
    .filter((f) => f.question && f.answer?.length)
    .map((f) => ({
      q: f.question,
      a: <PortableText value={f.answer} components={parts} />,
      plain: toPlain(f.answer, lines),
    }));
}
