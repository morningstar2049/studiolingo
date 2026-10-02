import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/lib/schema";
import EnLayout, { Bullets, Section } from "@/components/En/EnLayout";

export const revalidate = 60;

const title = "Contact Studio Lingo — English School in Tbilisi | Studio Lingo";
const description =
  "Studio Lingo English school: 116 Tsereteli Avenue, Saburtalo, Tbilisi. Phone +995 32 2 114 623, info@studiolingo.ge, open 11:00–22:00 every day.";

const MAP_URL = "https://maps.app.goo.gl/jjNmMYDcq6hFzN1VA";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/contact",
    languages: { "ka-GE": "/", en: "/en/contact" },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/en/contact`,
    locale: "en",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/en/contact`,
  inLanguage: "en",
  about: { "@id": `${SITE_URL}/#localbusiness` },
};

export default function EnContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <EnLayout
        title="Contact and location"
        intro="Studio Lingo is an English language school in Tbilisi. Our classroom is in Saburtalo, and online courses run from the same timetable."
      >
        <Section heading="Address">
          <p>
            116 Tsereteli Avenue, Tbilisi 0119, Georgia (Saburtalo district).
          </p>
          <p>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-lingo-green"
            >
              Open in Google Maps
            </a>
          </p>
        </Section>

        <Section heading="Phone and email">
          <Bullets
            items={[
              <>
                Phone:{" "}
                <a
                  href="tel:+995322114623"
                  className="underline text-lingo-green"
                >
                  +995 32 2 114 623
                </a>
              </>,
              <>
                Email:{" "}
                <a
                  href="mailto:info@studiolingo.ge"
                  className="underline text-lingo-green"
                >
                  info@studiolingo.ge
                </a>
              </>,
              <>
                Messenger:{" "}
                <a
                  href="https://m.me/studiolingo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-lingo-green"
                >
                  m.me/studiolingo
                </a>
              </>,
            ]}
          />
        </Section>

        <Section heading="Opening hours">
          <p>Every day, 11:00–22:00 (Tbilisi time, GMT+4).</p>
        </Section>

        <Section heading="How to enrol">
          <p>
            Start with the{" "}
            <Link href="/language-test" className="underline text-lingo-green">
              free online level test
            </Link>
            . It takes a few minutes and tells you your level from A1 to C1.
            Then write or call us and we will offer the group times that match
            your level, or agree a one-to-one schedule with you.
          </p>
          <p>
            The registration form and the rest of the website are in Georgian.
            If you prefer to continue in English, email or call us and we will
            handle everything that way.
          </p>
        </Section>

        <Section heading="Other pages in English">
          <Bullets
            items={[
              <>
                <Link href="/en" className="underline text-lingo-green">
                  English courses
                </Link>{" "}
                — formats, levels and how we teach
              </>,
              <>
                <Link
                  href="/en/corporate"
                  className="underline text-lingo-green"
                >
                  Corporate training
                </Link>{" "}
                — programmes for company teams
              </>,
              <>
                <Link href="/en/prices" className="underline text-lingo-green">
                  Prices
                </Link>{" "}
                — all course prices in lari
              </>,
            ]}
          />
        </Section>
      </EnLayout>
    </>
  );
}
