import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/lib/schema";
import EnLayout, { Bullets, Section } from "@/components/En/EnLayout";

export const revalidate = 60;

const title = "English Courses in Tbilisi and Online | Studio Lingo";
const description =
  "English courses in Tbilisi (Saburtalo) and online, levels A1 to C1 — small groups, pair and one-to-one lessons, a free level test and a monthly lesson with a British teacher.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en",
    languages: { "ka-GE": "/", en: "/en" },
  },
  openGraph: { title, description, url: `${SITE_URL}/en`, locale: "en" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "English courses at Studio Lingo",
  description,
  url: `${SITE_URL}/en`,
  inLanguage: "en",
  educationalLevel: "A1–C1",
  provider: { "@id": `${SITE_URL}/#organization` },
  hasCourseInstance: [
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
    { "@type": "CourseInstance", courseMode: "online" },
  ],
};

export default function EnHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <EnLayout
        title="English courses in Tbilisi and online"
        intro="Studio Lingo is an English language school in Tbilisi. We teach adults and teenagers from complete beginner (A1) to advanced (C1), in small groups at our Saburtalo space and online. Lessons are built around speaking: you use what you learn in conversation from the first class."
      >
        <Section heading="How we teach">
          <p>
            Every course keeps speaking at the centre. Grammar and vocabulary
            are introduced in short blocks and then used immediately in
            dialogue, so the lesson is practice rather than a lecture. Teachers
            correct mistakes after you finish your thought, not in the middle of
            it — the aim is that you keep talking.
          </p>
          <p>
            Groups are deliberately small: four students online and seven to
            eight in the classroom. That is small enough for everyone to speak
            in every lesson.
          </p>
        </Section>

        <Section heading="Course formats">
          <Bullets
            items={[
              <>
                <strong>Group online</strong> — four students, lessons of 1 hour
                30 minutes, twice a week. The most popular format.
              </>,
              <>
                <strong>Group in our classroom</strong> (Tbilisi, Saburtalo) —
                seven to eight students, 1 hour 30 minutes, twice a week, plus
                one lesson a month with a British teacher.
              </>,
              <>
                <strong>Pair lessons online</strong> — you and one other student,
                1 hour, twice a week.
              </>,
              <>
                <strong>One-to-one online</strong> — 1 hour, twice or three
                times a week, for a fixed deadline or a schedule that does not
                fit a group.
              </>,
            ]}
          />
          <p>
            The minimum study period is three months for classroom courses and
            four months online. See{" "}
            <Link href="/en/prices" className="underline text-lingo-green">
              prices
            </Link>{" "}
            for the exact figures.
          </p>
        </Section>

        <Section heading="The British teacher lesson">
          <p>
            Students in our classroom groups have one lesson a month with a
            British teacher (a native speaker). It is not a free-form
            conversation hour: the British teacher works through the material
            the group has already covered with their Georgian teacher, using
            that same vocabulary and grammar, so you test what you actually
            know against a native speaker.
          </p>
        </Section>

        <Section heading="Levels and the free test">
          <p>
            We teach the full range from A1 to C1. Before a course starts you
            take a{" "}
            <Link href="/language-test" className="underline text-lingo-green">
              free online level test
            </Link>
            : around 48 questions including listening, and it stops at your
            level. You get the result immediately, and group placement is based
            on it, so you are neither lost nor bored in your group.
          </p>
        </Section>

        <Section heading="Who studies with us">
          <p>
            Adults from 16 and teenagers aged 9 to 15. Most of our students are
            Georgian speakers learning English for work, study or travel, and
            lessons are explained in Georgian where that helps. We also train
            company teams — see{" "}
            <Link href="/en/corporate" className="underline text-lingo-green">
              corporate training
            </Link>
            .
          </p>
          <p>
            More than 3,000 students have studied with us, and the school has
            over 85 reviews on Google Maps.
          </p>
        </Section>
      </EnLayout>
    </>
  );
}
