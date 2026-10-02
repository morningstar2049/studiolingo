import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/lib/schema";
import { loadPrices } from "@/lib/loadPrices";
import { fallbackPrices, monthsFor } from "@/lib/priceTable";
import EnLayout, { Bullets, Section } from "@/components/En/EnLayout";

export const revalidate = 60;

const title = "English Course Prices in Tbilisi (GEL) | Studio Lingo";
const description =
  "Studio Lingo English course prices in Georgian lari: group, pair and one-to-one lessons, in Tbilisi and online, with the price per month and what is included.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/prices",
    languages: { "ka-GE": "/prices", en: "/en/prices" },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/en/prices`,
    locale: "en",
  },
};

// Georgian values in the price keys → English labels.
const FORMAT: Record<string, string> = {
  ოფისში: "In our classroom",
  ონლაინ: "Online",
};
const LESSON_TYPE: Record<string, string> = {
  ჯგუფური: "Group",
  ორმოსწავლიანი: "Pair",
  ინდივიდუალური: "One-to-one",
};
const FREQUENCY: Record<string, string> = {
  "კვირაში 2-ჯერ": "2× a week",
  "კვირაში 3-ჯერ": "3× a week",
};
const AUDIENCE: Record<string, string> = {
  english: "Adults (16+)",
  englishForTeens: "Teenagers (9–15)",
  englishForKids: "Children (7–12)",
};
const LESSON_LENGTH: Record<string, string> = {
  ჯგუფური: "1 h 30 min",
  ორმოსწავლიანი: "1 h",
  ინდივიდუალური: "1 h",
};

export default async function EnPricesPage() {
  const loaded = await loadPrices();
  const table = loaded?.prices ?? fallbackPrices;
  const rows = Object.entries(table)
    .map(([key, price]) => {
      const [course, format, lessonType, ...rest] = key.split("-");
      return {
        course,
        format,
        lessonType,
        frequency: rest.join("-"),
        price,
        months: monthsFor(key, loaded?.months ?? {}),
      };
    })
    .sort((a, b) => a.price - b.price);

  const cheapest = rows.length ? Math.min(...rows.map((r) => r.price)) : 0;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "English courses at Studio Lingo",
    description,
    url: `${SITE_URL}/en/prices`,
    inLanguage: "en",
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: rows.map((r) => ({
      "@type": "Offer",
      name: `${LESSON_TYPE[r.lessonType] ?? r.lessonType} · ${
        FORMAT[r.format] ?? r.format
      } · ${FREQUENCY[r.frequency] ?? r.frequency}`,
      price: r.price,
      priceCurrency: "GEL",
      category: r.course,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/en/prices`,
      description: `Price for a ${r.months}-month course`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <EnLayout
        title="English course prices"
        intro={`All prices are in Georgian lari (₾) and cover a whole course, not a single lesson: three months for classroom courses and four months online. Courses start from ${cheapest} ₾.`}
      >
        {Object.entries(AUDIENCE).map(([key, label]) => {
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
                      <th className="py-2 pr-3 font-medium">Format</th>
                      <th className="px-3 py-2 font-medium">Lessons</th>
                      <th className="px-3 py-2 font-medium">Frequency</th>
                      <th className="px-3 py-2 font-medium">Length</th>
                      <th className="py-2 pl-3 font-medium text-right">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.map((r) => (
                      <tr
                        key={`${r.format}-${r.lessonType}-${r.frequency}`}
                        className="border-t border-[#eceef2] text-lingo-black"
                      >
                        <td className="py-3 pr-3">
                          {FORMAT[r.format] ?? r.format}
                        </td>
                        <td className="px-3 py-3">
                          {LESSON_TYPE[r.lessonType] ?? r.lessonType}
                        </td>
                        <td className="px-3 py-3">
                          {FREQUENCY[r.frequency] ?? r.frequency}
                        </td>
                        <td className="px-3 py-3">
                          {LESSON_LENGTH[r.lessonType] ?? "1 h 30 min"} ·{" "}
                          {r.months} months
                        </td>
                        <td className="py-3 pl-3 font-bold text-right whitespace-nowrap">
                          {r.price} ₾
                          <span className="block text-[12px] font-normal text-[#8a929d]">
                            ≈ {Math.round(r.price / r.months)} ₾ / month
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        <Section heading="What the price includes">
          <Bullets
            items={[
              "Every lesson of the course and all study materials, sent by email before the course starts.",
              <>
                A level test before you start — the{" "}
                <Link
                  href="/language-test"
                  className="underline text-lingo-green"
                >
                  online test
                </Link>{" "}
                is free for everyone.
              </>,
              "For classroom group courses, one lesson a month with a British teacher.",
              "Payment in full, or in interest-free instalments through Bank of Georgia.",
            ]}
          />
        </Section>

        <Section heading="Group sizes">
          <p>
            Online groups have four students and classroom groups seven to
            eight. Pair lessons are two students, and one-to-one lessons are
            just you and the teacher.
          </p>
        </Section>
      </EnLayout>
    </>
  );
}
