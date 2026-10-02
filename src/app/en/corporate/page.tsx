import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/lib/schema";
import EnLayout, { Bullets, Section } from "@/components/En/EnLayout";

export const revalidate = 60;

const title = "Corporate English Training in Tbilisi | Studio Lingo";
const description =
  "Corporate English training for companies and teams in Tbilisi and online — general, conversational and business English, built around your industry, with a placement test for every employee.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/corporate",
    languages: { "ka-GE": "/corporate", en: "/en/corporate" },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/en/corporate`,
    locale: "en",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Corporate English training",
  description,
  url: `${SITE_URL}/en/corporate`,
  inLanguage: "en",
  educationalLevel: "A1–C1",
  provider: { "@id": `${SITE_URL}/#organization` },
  hasCourseInstance: [
    { "@type": "CourseInstance", courseMode: "online" },
    {
      "@type": "CourseInstance",
      courseMode: "onsite",
      location: {
        "@type": "Place",
        name: "Studio Lingo",
        address: {
          "@type": "PostalAddress",
          streetAddress: "116 Tsereteli Ave",
          addressLocality: "Tbilisi",
          addressCountry: "GE",
        },
      },
    },
  ],
};

export default function EnCorporatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <EnLayout
        title="Corporate English training"
        intro="We train company teams in Tbilisi and online, from A1 to C1. The programme is built around what your people actually do in English — meetings with partners, email, reports, presentations — rather than a generic textbook."
      >
        <Section heading="How a corporate programme is set up">
          <Bullets
            items={[
              <>
                <strong>Placement.</strong> Every employee takes our level test,
                so groups are formed by real level rather than by department.
              </>,
              <>
                <strong>Goal and content.</strong> We agree what the team needs:
                general English, conversation practice, or business topics for a
                specific field.
              </>,
              <>
                <strong>Format and schedule.</strong> Lessons at your office, at
                our Saburtalo space, or online, at times that fit the working
                day.
              </>,
              <>
                <strong>Progress reports.</strong> You receive attendance and
                progress information for the group, so the investment is
                visible.
              </>,
            ]}
          />
        </Section>

        <Section heading="Business topics we cover">
          <p>
            Alongside general and conversational English, programmes can include
            practical business areas:
          </p>
          <Bullets
            items={[
              "Finance and accounting",
              "Marketing",
              "Human resources (HR)",
              "Business law",
              "Logistics",
            ]}
          />
          <p>
            Each block is taught in English and uses the vocabulary your team
            will meet in real documents and meetings.
          </p>
        </Section>

        <Section heading="Why companies choose us">
          <p>
            Our lessons are built on speaking, so employees practise in the
            situations they face at work rather than only reading about them.
            Group sizes stay small — four students online, seven to eight in a
            classroom — which means everyone speaks in every lesson.
          </p>
          <p>
            Studio Lingo has been teaching in Tbilisi for years, has more than
            3,000 students, and publishes free learning content on YouTube,
            Instagram and TikTok that your team can use between lessons.
          </p>
        </Section>

        <Section heading="Pricing and next step">
          <p>
            Corporate programmes are quoted per team, based on the number of
            employees, the format and the number of lessons per week. Our
            standard course prices are listed on the{" "}
            <Link href="/en/prices" className="underline text-lingo-green">
              prices page
            </Link>{" "}
            as a reference point.
          </p>
          <p>
            Write to{" "}
            <a
              href="mailto:info@studiolingo.ge"
              className="underline text-lingo-green"
            >
              info@studiolingo.ge
            </a>{" "}
            or call{" "}
            <a
              href="tel:+995322114623"
              className="underline text-lingo-green"
            >
              +995 32 2 114 623
            </a>{" "}
            with the size of your team and what you need, and we will prepare a
            proposal and a syllabus.
          </p>
        </Section>
      </EnLayout>
    </>
  );
}
