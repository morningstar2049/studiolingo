import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import VideoCourseAccordion from "@/components/Courses/VideoCourseAccordion";
import VideoCourseParts from "@/components/Courses/VideoCourseParts";
import VideoCourseProgram from "@/components/Courses/VideoCourseProgram";
import VideoCoursePrice from "@/components/Courses/VideoCoursePrice";
import HeroPriceChip from "@/components/Courses/HeroPriceChip";
import CourseVideo from "@/components/Courses/CourseVideo";
import SpeakingBanner from "@/components/Courses/SpeakingBanner";

import { SITE_URL, courseSchema, breadcrumbSchema } from "@/lib/schema";
import { getVideoCoursePage } from "@/sanity/queries";
import { getYoutubeId } from "@/lib/youtube";

export const revalidate = 60;

// The self-paced video course. It is sold as one product rather than a
// timetable, so this page does not use the course calculator the live courses
// share. Sign-up goes to a Google Form for now instead of a form on the site.
//
// Everything that changes over time — prices, the promo video, the lessons
// already filmed, the FAQ — is edited in Sanity ("ვიდეო კურსის გვერდი"). The
// constants below are the fallback: they are what the page shows when a field
// is empty or Sanity cannot be reached, so the page is never blank.
const PRICE = 350;
const PRESALE_PRICE = 250;
const PROMO_VIDEO_ID = "fbodAICVKa0";
const SAMPLE_VIDEO_ID = "lgKbPyt74kI";
const EXTRA_MONTH = 80;
const LESSONS = 20;
const ACCESS_MONTHS = 4;
const SIGNUP_URL = "https://forms.gle/eYCQNNBYKCmJA1RC6";

// One resolved set of page values, Sanity first and code second. Called by both
// generateMetadata and the page so the two can never disagree — a price in the
// meta description that the page contradicts is worse than no price at all.
type Settings = Awaited<ReturnType<typeof loadSettings>>;

async function loadSettings() {
  const doc = await getVideoCoursePage();
  const presaleActive = doc?.presaleActive ?? true;

  return {
    price: doc?.price ?? PRICE,
    presaleActive,
    presalePrice: presaleActive ? (doc?.presalePrice ?? PRESALE_PRICE) : null,
    extraMonth: doc?.extraMonthPrice ?? EXTRA_MONTH,
    lessonCount: doc?.lessonCount ?? LESSONS,
    accessMonths: doc?.accessMonths ?? ACCESS_MONTHS,
    signupUrl: doc?.signupUrl ?? SIGNUP_URL,
    videoId: getYoutubeId(doc?.promoVideo) ?? PROMO_VIDEO_ID,
    sampleVideoId: getYoutubeId(doc?.sampleVideo) ?? SAMPLE_VIDEO_ID,
    lessons:
      doc?.lessons?.length
        ? doc.lessons.map((l) => ({ title: l.title ?? "", note: l.note ?? "" }))
        : null,
    faq:
      doc?.faq?.length
        ? doc.faq.map((f) => ({ q: f.question ?? "", a: f.answer ?? "" }))
        : null,
  };
}

const CHIP =
  "px-3.5 py-1.5 text-[13px] font-medium rounded-full text-[#fff] bg-[#ffffff1f]";

const COURSE_NAME = "ინგლისურის ვიდეო კურსი ილიკოსთან";
const title = `${COURSE_NAME} | Studio Lingo`;

// The price sentence changes with the presale, so the description is built
// from the resolved settings rather than written out once.
const describe = (s: Settings) =>
  `${COURSE_NAME} A2–B1 დონეზე: ${s.lessonCount} გაკვეთილი, თითოეულში ლექსიკა, გრამატიკა და საუბრის პრაქტიკა. ${s.accessMonths} თვიანი წვდომა, ${
    s.presalePrice
      ? `პრესეილის ფასი ${s.presalePrice} ₾`
      : `ფასი ${s.price} ₾`
  }.`;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSettings();
  const description = describe(settings);

  return {
  title,
  description,
  keywords: [
    "ინგლისურის ვიდეო კურსი ილიკოსთან",
    "ინგლისურის ვიდეო კურსი",
    "ინგლისური ონლაინ ვიდეო გაკვეთილები",
    "ინგლისურის სწავლა ვიდეოთი",
    "ინგლისური A2 B1",
    "Studio Lingo",
  ],
  alternates: { canonical: "/courses/video-course" },
  openGraph: { title, description, images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
  };
}

// Structured data quotes the price people actually pay, so it is built from
// the same settings — a schema price Google can see contradicted on the page
// is worse than none.
const buildSchema = (s: Settings) => ({
  ...courseSchema({
    name: COURSE_NAME,
    description: describe(s),
    path: "/courses/video-course",
    mode: "online",
  }),
  offers: {
    "@type": "Offer",
    price: s.presalePrice ?? s.price,
    priceCurrency: "GEL",
    category: "ვიდეო კურსი",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/courses/video-course`,
  },
});


// Lessons already filmed. Only the theme is listed; the grammar detail is in
// the lesson itself.
const READY_LESSONS = [
  { title: "გაკვეთილი 1 — ადამიანები", note: "გარეგნობა, ხასიათი, ადამიანების აღწერა" },
  { title: "გაკვეთილი 2 — ყოველდღიური ცხოვრება", note: "დღის რეჟიმი, ჩვევები, დრო" },
  { title: "გაკვეთილი 3 — საჭმელი", note: "პროდუქტები, კერძები, სასმელები" },
  { title: "გაკვეთილი 4 — ტანსაცმელი და შოპინგი", note: "ტანსაცმელი, სტილი, ფასები" },
];

// Fallback FAQ. The answers quote the numbers, so they are built from the
// resolved settings; once the FAQ is filled in Sanity, that list wins and the
// numbers in it are typed by hand.
const defaultFaq = (s: Settings) => [
  {
    q: "რამდენი ხნით მაქვს წვდომა?",
    a: `${s.accessMonths} თვის განმავლობაში${
      s.presalePrice
        ? " — დროის ათვლა დაიწყება პრესეილის დასრულების შემდეგ, როცა კურსი სრულად ხელმისაწვდომი გახდება"
        : ""
    }. თუ მეტი დრო დაგჭირდა, წვდომის გაგრძელება შესაძლებელია დამატებით — ერთი თვე ${s.extraMonth} ₾.`,
  },
  {
    q: "რა დონეზეა კურსი?",
    a: "A2–B1. ანუ გამოგადგება, თუ საბაზისო ინგლისური უკვე იცი და გინდა, რომ თავისუფლად ალაპარაკდე. სრული დამწყებისთვის ჯერ A1 დონეა საჭირო.",
  },
  {
    q: "დამეხმარებით, რომ არ შევწყვიტო კურსი?",
    a: "დიახ. კურსის განმავლობაში ელფოსტაზე მიიღებ შეხსენებებს — რამდენი დრო გრჩება წვდომიდან და შეხსენებას, რომ რეგულარულად განაგრძო ყურება. ვიდეო კურსის მიტოვება ყველაზე ხშირად იმიტომ ხდება, რომ არავინ გახსენებს.",
  },
  {
    q: "ცოცხალი გაკვეთილები შედის კურსში?",
    a: "არა, ეს თვითსწავლების კურსია — ვიდეოებს შენი ტემპით უყურებ. თუ მასწავლებელთან ცოცხალი პრაქტიკაც გინდა, ჯგუფური კურსი ცალკე ვარიანტია.",
  },
  {
    q: "როგორ შევიძინო?",
    a: "შეავსე რეგისტრაციის ფორმა და ჩვენ დაგიკავშირდებით გადახდისა და წვდომის დეტალებისთვის.",
  },
];

// A page section. The heading is optional: some blocks (the sample lesson,
// the price card) speak for themselves and read better without one.
function Section({
  heading,
  children,
}: {
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      {heading && (
        <h2
          style={{ fontFeatureSettings: "'case' on" }}
          className="text-xl font-bold sm:text-2xl text-lingo-green"
        >
          {heading}
        </h2>
      )}
      <div
        className={`${heading ? "mt-4 " : ""}text-[15px] sm:text-base leading-relaxed text-[#4b5563]`}
      >
        {children}
      </div>
    </section>
  );
}

function SignUpButton({
  href,
  className = "",
}: {
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontFeatureSettings: "'case' on" }}
      className={`inline-flex items-center justify-center px-7 py-3 text-[15px] font-bold tracking-[0.04em] text-[#fff] transition-transform rounded-full bg-lingo-green hover:scale-105 ${className}`}
    >
      დარეგისტრირდი
    </a>
  );
}

export default async function VideoCoursePage() {
  const s = await loadSettings();
  const lessons = s.lessons ?? READY_LESSONS;
  const faq = s.faq ?? defaultFaq(s);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildSchema(s),
            breadcrumbSchema([
              { name: "მთავარი", path: "/" },
              { name: "კურსები", path: "/courses" },
              { name: "ვიდეო კურსი", path: "/courses/video-course" },
            ]),
          ]),
        }}
      />

      <div
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(120deg, #2a375c, #181f33)" }}
      >
        <div className="max-w-3xl px-5 py-10 mx-auto text-center sm:py-14">
          <h1
            style={{ fontFeatureSettings: "'case' on" }}
            className="text-[26px] font-bold leading-tight text-[#fff] sm:text-4xl"
          >
            ინგლისურის ვიდეო კურსი ილიკოსთან
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-[#c3c9d4]">
            ისწავლე შენი ტემპით — {s.lessonCount} გაკვეთილი, თითოეულში
            ლექსიკა, გრამატიკა და საუბრის პრაქტიკა.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {/* While the presale runs the price chip draws a line across the
                old price on load, so the saving is watched rather than read.
                Once it ends there is nothing to strike, so it is a plain
                chip. */}
            {s.presalePrice ? (
              <HeroPriceChip
                full={s.price}
                presale={s.presalePrice}
                className={CHIP}
              />
            ) : (
              <span className={CHIP}>{s.price} ₾</span>
            )}
            {[
              `${s.lessonCount} გაკვეთილი`,
              "A2–B1",
              `${s.accessMonths} თვიანი წვდომა`,
            ].map((chip) => (
              <span key={chip} className={CHIP}>
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <SignUpButton href={s.signupUrl} />
          </div>
        </div>
      </div>

      <main className="max-w-3xl px-5 pb-20 mx-auto">
        {/* Promo video: same player as the other course pages — desktop
            opens a lightbox, phones play inline. */}
        <div className="mt-6">
          <CourseVideo videoId={s.videoId} />
        </div>

        <Section heading="რა არის ეს კურსი">
          <p>
            <span className="font-bold text-lingo-green">
              ინგლისურის ვიდეო კურსი ილიკოსთან
            </span>{" "}
            არის სრული პროგრამა A2–B1 დონისთვის, რომელსაც შენი ტემპით გადიხარ.
            არ არის ფიქსირებული გრაფიკი და ჯგუფი — ვიდეოებს მაშინ უყურებ, როცა
            დრო გაქვს, და იმდენჯერ, რამდენჯერაც დაგჭირდება.
          </p>
          <Image
            src="/video-course/practical.webp"
            alt="პრაქტიკული და ინტერაქციული გაკვეთილები ილიკოსთან ერთად"
            width={1280}
            height={720}
            className="w-full h-auto my-6 rounded-2xl"
          />
          <p>
            კურსი აგებულია იმაზე, რომ თითოეულ გაკვეთილში სამივე უნარი ვითარდება
            ერთად: ახალი სიტყვები, ახალი წესი და მაშინვე მისი გამოყენება
            საუბარში. არცერთ გაკვეთილში არ შეგხვდება გრამატიკა, რომელიც ჯერ არ
            აგიხსნეს.
          </p>
        </Section>

        <Section heading="როგორ არის აწყობილი თითოეული გაკვეთილი">
          <VideoCourseParts />
        </Section>

        <SpeakingBanner />

        <Section heading="პროგრამა">
          <p>
            კურსი თემატურად არის დაყოფილი. ქვემოთ პირველი გაკვეთილებია — ყველა
            დანარჩენი იმავე სტრუქტურით მოდის.
          </p>
          <div className="mt-5">
            <VideoCourseProgram lessons={lessons} />
          </div>
        </Section>

        <Section heading="არ დაგტოვებთ შუა გზაზე">
          <p>
            ვიდეო კურსების მთავარი პრობლემა ისაა, რომ ადამიანები მათ ნახევრად
            ტოვებენ — არა იმიტომ, რომ რთულია, არამედ იმიტომ, რომ არავინ
            გახსენებს. აქ ასე არ იქნება: კურსის განმავლობაში ელფოსტაზე მიიღებ
            შეხსენებებს, რომ რეგულარულად განაგრძო ყურება, და შეგახსენებთ იმასაც,
            რამდენი დრო გრჩება წვდომის ვადიდან.
          </p>
        </Section>

        {/* A whole lesson, shown just before the price: the last thing to
            settle before deciding is what one actually looks like. */}
        <Section>
          <CourseVideo videoId={s.sampleVideoId} />
        </Section>

        <Section>
          <div className="p-6 border rounded-2xl border-[#e3e7ec] bg-[#fff]">
            {s.presalePrice ? (
              <VideoCoursePrice full={s.price} presale={s.presalePrice} />
            ) : (
              <p className="text-[40px] leading-none font-bold text-lingo-black">
                {s.price} ₾
              </p>
            )}
            <p className="mt-3 text-[14px] text-[#6b7280]">
              მთლიანი კურსი — {s.lessonCount} გაკვეთილი.
              {s.presalePrice
                ? " პრესეილის ფასი მოქმედებს, სანამ კურსი სრულად დასრულდება."
                : ""}
            </p>
            <ul className="mt-5 space-y-2 text-[15px] text-[#4b5563] list-disc pl-5">
              <li>
                {s.accessMonths} თვიანი წვდომა ყველა გაკვეთილზე{" "}
                {s.presalePrice && (
                  <span className="text-[#6b7280]">
                    (დროის ათვლა დაიწყება პრესეილის დასრულების შემდეგ)
                  </span>
                )}
              </li>
              <li>
                წვდომის გაგრძელება საჭიროების შემთხვევაში — ერთი თვე{" "}
                {s.extraMonth} ₾
              </li>
              <li>ლექსიკის აუდიო მასალა თითოეულ გაკვეთილში</li>
              <li>პროგრესის თვალყურის დევნება და შეხსენებები ელფოსტაზე</li>
            </ul>
            <div className="mt-6">
              <SignUpButton href={s.signupUrl} />
            </div>
          </div>
        </Section>

        <Section heading="ხშირად დასმული კითხვები">
          <VideoCourseAccordion
            items={faq.map((f) => ({ title: f.q, body: f.a }))}
          />
        </Section>

        <Section heading="ცოცხალი გაკვეთილები გირჩევნია?">
          <p>
            თუ მასწავლებელთან და ჯგუფთან ერთად სწავლა უფრო გიხდება,{" "}
            <Link href="/courses" className="underline text-lingo-green">
              ჩვენი კურსების გვერდზე
            </Link>{" "}
            ნახავ ჯგუფურ და ინდივიდუალურ ვარიანტებს, ონლაინ და ადგილზე.
          </p>
        </Section>
      </main>
    </>
  );
}
