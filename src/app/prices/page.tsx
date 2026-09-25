import type { Metadata } from "next";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

import { SITE_URL } from "@/lib/schema";
import { loadPrices } from "@/lib/loadPrices";
import {
  fallbackPrices,
  monthsFor,
  type MonthsTable,
  type PriceTable,
} from "@/lib/priceTable";

// Public price list. The calculator on the course pages sits behind the
// booking flow, so this page is the one place where a visitor (or a search
// engine / AI assistant) can read the prices as plain text.

export const revalidate = 60;

const title = "ინგლისურის კურსების ფასები თბილისში და ონლაინ | Studio Lingo";
const description =
  "Studio Lingo-ს ინგლისურის კურსების ფასები: ჯგუფური, ორმოსწავლიანი და ინდივიდუალური გაკვეთილები ოფისში (საბურთალო) და ონლაინ — ზრდასრულებისა და მოზარდებისთვის.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/prices" },
  openGraph: { title, description, url: `${SITE_URL}/prices` },
};

// Course → audience label; the price key's first part.
const AUDIENCES = [
  { key: "english", label: "ზრდასრულები (16+ წელი)", path: "/courses" },
  {
    key: "englishForTeens",
    label: "მოზარდები (9–15 წელი)",
    path: "/courses/teenagers",
  },
  { key: "englishForKids", label: "ბავშვები (7–12 წელი)", path: "/courses" },
];

const LESSON_LENGTH: Record<string, string> = {
  ინდივიდუალური: "1 სთ",
  ორმოსწავლიანი: "1 სთ",
  ჯგუფური: "1 სთ 30 წთ",
};

type Row = {
  course: string;
  format: string;
  lessonType: string;
  frequency: string;
  price: number;
  months: number;
};

function toRows(table: PriceTable, months: MonthsTable): Row[] {
  return Object.entries(table)
    .map(([key, price]) => {
      // The frequency itself contains a hyphen ("კვირაში 2-ჯერ"), so only the
      // first three separators split the key.
      const [course, format, lessonType, ...rest] = key.split("-");
      const frequency = rest.join("-");
      return {
        course,
        format,
        lessonType,
        frequency,
        price,
        months: monthsFor(key, months),
      };
    })
    .sort((a, b) => a.price - b.price);
}

export default async function PricesPage() {
  const loaded = await loadPrices();
  const table = loaded?.prices ?? fallbackPrices;
  const rows = toRows(table, loaded?.months ?? {});
  const cheapest = rows.length ? Math.min(...rows.map((r) => r.price)) : 0;

  // One Offer per price, so the amounts are machine-readable too.
  const offersSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "ინგლისურის კურსები — Studio Lingo",
    description,
    url: `${SITE_URL}/prices`,
    inLanguage: "ka",
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: rows.map((r) => ({
      "@type": "Offer",
      name: `${r.lessonType} · ${r.format} · ${r.frequency}`,
      price: r.price,
      priceCurrency: "GEL",
      category: r.course,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/prices`,
      description: `${r.months} თვის კურსის ფასი`,
    })),
  };

  return (
    <main
      className="max-w-4xl px-5 pt-8 pb-16 mx-auto sm:pt-12"
      style={{ fontFeatureSettings: "'case' on" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }}
      />

      <h1 className="text-[28px] sm:text-4xl font-bold leading-tight text-lingo-black">
        ინგლისურის კურსების ფასები
      </h1>
      <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
        ქვემოთ მოცემულია Studio Lingo-ს ინგლისურის კურსების ფასები. ფასი მთელი
        კურსისაა — სწავლის მინიმალური პერიოდი თითოეულ ვარიანტთანაა მითითებული.
        გაკვეთილის ხანგრძლივობაა
        ჯგუფურში 1 საათი და 30 წუთი, ინდივიდუალურსა და ორმოსწავლიანში — 1 საათი.
        ჯგუფში ოფისში 7–8 მოსწავლეა, ონლაინ — 4. კურსები მიმდინარეობს თბილისში (საბურთალო,
        წერეთლის გამზ. 116) და ონლაინ, დონეებზე A1-დან C1-მდე.
      </p>

      {AUDIENCES.map(({ key, label, path }) => {
        const group = rows.filter((r) => r.course === key);
        if (!group.length) return null;
        return (
          <section key={key} className="mt-10">
            <h2 className="text-xl font-bold sm:text-2xl text-lingo-black">
              {label}
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-[14px] sm:text-[15px] border-collapse">
                <thead>
                  <tr className="text-left text-[#6b7280]">
                    <th className="py-2 pr-3 font-medium">ფორმატი</th>
                    <th className="px-3 py-2 font-medium">გაკვეთილის ტიპი</th>
                    <th className="px-3 py-2 font-medium">სიხშირე</th>
                    <th className="px-3 py-2 font-medium">ხანგრძლივობა</th>
                    <th className="py-2 pl-3 font-medium text-right">ფასი</th>
                  </tr>
                </thead>
                <tbody>
                  {group.map((r) => (
                    <tr
                      key={`${r.format}-${r.lessonType}-${r.frequency}`}
                      className="border-t border-[#eceef2] text-lingo-black"
                    >
                      <td className="py-3 pr-3">{r.format}</td>
                      <td className="px-3 py-3">{r.lessonType}</td>
                      <td className="px-3 py-3">{r.frequency}</td>
                      <td className="px-3 py-3">
                        {LESSON_LENGTH[r.lessonType] ?? "1 სთ 30 წთ"} ·{" "}
                        {r.months} თვე
                      </td>
                      <td className="py-3 pl-3 font-bold text-right whitespace-nowrap">
                        {r.price} ₾
                        <span className="block text-[12px] font-normal text-[#8a929d]">
                          ≈ {Math.round(r.price / r.months)} ₾ / თვე
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              href={path}
              className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-lingo-green"
            >
              კურსის დეტალები
              <AiOutlineArrowRight className="shrink-0" />
            </Link>
          </section>
        );
      })}

      <section className="p-5 mt-12 bg-[#f6f8f7] rounded-[20px]">
        <h2 className="text-lg font-bold sm:text-xl text-lingo-black">
          რა შედის ფასში?
        </h2>
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-[#4b5563] list-disc pl-5">
          <li>ყველა გაკვეთილი კურსის მანძილზე და სასწავლო მასალები.</li>
          <li>
            დონის განსაზღვრა კურსის დაწყებამდე —{" "}
            <Link href="/language-test" className="underline text-lingo-green">
              უფასო ონლაინ ტესტი
            </Link>
            .
          </li>
          <li>
            ადგილზე ჯგუფური კურსის მოსწავლეებს თვეში ერთხელ გაკვეთილს უტარებს
            ბრიტანელი მასწავლებელი.
          </li>
          <li>
            გადახდა შესაძლებელია ერთიანად ან ეტაპობრივად, ასევე უპროცენტო
            განვადებით.
          </li>
        </ul>
        <p className="mt-4 text-[13px] text-[#8a929d]">
          ფასები მოცემულია ქართულ ლარში (₾) და ვრცელდება{" "}
          {new Date().getFullYear()} წელს. ყველაზე ხელმისაწვდომი კურსი იწყება{" "}
          {cheapest} ₾-დან.
        </p>
      </section>

      <div className="flex flex-wrap gap-3 mt-10">
        <Link
          href="/register"
          className="px-6 py-3 font-bold rounded-xl bg-lingo-green text-[#fff]"
        >
          რეგისტრაცია კურსზე
        </Link>
        <Link
          href="/faq"
          className="px-6 py-3 font-bold rounded-xl ring-1 ring-[#d7dbe3] text-lingo-black"
        >
          ხშირი კითხვები
        </Link>
      </div>
    </main>
  );
}
