import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import VideoCourseAccordion from "@/components/Courses/VideoCourseAccordion";
import VideoCourseParts from "@/components/Courses/VideoCourseParts";
import VideoCourseProgram from "@/components/Courses/VideoCourseProgram";
import VideoCoursePrice from "@/components/Courses/VideoCoursePrice";
import CourseVideo from "@/components/Courses/CourseVideo";
import SpeakingBanner from "@/components/Courses/SpeakingBanner";

import { SITE_URL, courseSchema, breadcrumbSchema } from "@/lib/schema";

export const revalidate = 60;

// The self-paced video course. It is sold as one product rather than a
// timetable, so this page does not use the course calculator the live courses
// share. Sign-up goes to a Google Form for now instead of a form on the site.
const PRICE = 350;
const PRESALE_PRICE = 250;
const PROMO_VIDEO_ID = "fbodAICVKa0";
const EXTRA_MONTH = 80;
const LESSONS = 20;
const ACCESS_MONTHS = 4;
const SIGNUP_URL = "https://forms.gle/eYCQNNBYKCmJA1RC6";

const title = "ინგლისურის ვიდეო კურსი — ისწავლე შენი ტემპით | Studio Lingo";
const description = `ინგლისურის ვიდეო კურსი A2–B1 დონეზე: ${LESSONS} გაკვეთილი, თითოეულში ლექსიკა, გრამატიკა და საუბრის პრაქტიკა. ${ACCESS_MONTHS} თვიანი წვდომა, პრესეილის ფასი ${PRESALE_PRICE} ₾.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
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

const schema = {
  ...courseSchema({
    name: "ინგლისურის ვიდეო კურსი",
    description,
    path: "/courses/video-course",
    mode: "online",
  }),
  offers: {
    "@type": "Offer",
    price: PRESALE_PRICE,
    priceCurrency: "GEL",
    category: "ვიდეო კურსი",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/courses/video-course`,
  },
};


// Lessons already filmed. Only the theme is listed; the grammar detail is in
// the lesson itself.
const READY_LESSONS = [
  { title: "გაკვეთილი 1 — ადამიანები", note: "გარეგნობა, ხასიათი, ადამიანების აღწერა" },
  { title: "გაკვეთილი 2 — ყოველდღიური ცხოვრება", note: "დღის რეჟიმი, ჩვევები, დრო" },
  { title: "გაკვეთილი 3 — საჭმელი", note: "პროდუქტები, კერძები, სასმელები" },
  { title: "გაკვეთილი 4 — ტანსაცმელი და შოპინგი", note: "ტანსაცმელი, სტილი, ფასები" },
];

const FAQ = [
  {
    q: "რამდენი ხნით მაქვს წვდომა?",
    a: `${ACCESS_MONTHS} თვის განმავლობაში — დროის ათვლა დაიწყება პრესეილის დასრულების შემდეგ, როცა კურსი სრულად ხელმისაწვდომი გახდება. თუ მეტი დრო დაგჭირდა, წვდომის გაგრძელება შესაძლებელია დამატებით — ერთი თვე ${EXTRA_MONTH} ₾.`,
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

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2
        style={{ fontFeatureSettings: "'case' on" }}
        className="text-xl font-bold sm:text-2xl text-lingo-green"
      >
        {heading}
      </h2>
      <div className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
        {children}
      </div>
    </section>
  );
}

function SignUpButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={SIGNUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontFeatureSettings: "'case' on" }}
      className={`inline-flex items-center justify-center px-7 py-3 text-[15px] font-bold tracking-[0.04em] text-[#fff] transition-transform rounded-full bg-lingo-green hover:scale-105 ${className}`}
    >
      დარეგისტრირდი
    </a>
  );
}

export default function VideoCoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schema,
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
            ინგლისურის ვიდეო კურსი
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-[#c3c9d4]">
            ისწავლე შენი ტემპით — {LESSONS} გაკვეთილი, თითოეულში ლექსიკა,
            გრამატიკა და საუბრის პრაქტიკა.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {[
              `${PRESALE_PRICE} ₾`,
              `${LESSONS} გაკვეთილი`,
              "A2–B1",
              `${ACCESS_MONTHS} თვიანი წვდომა`,
            ].map((chip) => (
              <span
                key={chip}
                className="px-3.5 py-1.5 text-[13px] font-medium rounded-full text-[#fff] bg-[#ffffff1f]"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <SignUpButton />
          </div>
        </div>
      </div>

      <main className="max-w-3xl px-5 pb-20 mx-auto">
        {/* Promo video: same player as the other course pages — desktop
            opens a lightbox, phones play inline. */}
        <div className="mt-6">
          <CourseVideo videoId={PROMO_VIDEO_ID} />
        </div>

        <Section heading="რა არის ეს კურსი">
          <p>
            <span className="font-bold text-lingo-green">
              ინგლისურის ვიდეო კურსი
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
            <VideoCourseProgram lessons={READY_LESSONS} />
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

        <Section heading="ფასი და წვდომა">
          <div className="p-6 border rounded-2xl border-[#e3e7ec] bg-[#fff]">
            <VideoCoursePrice full={PRICE} presale={PRESALE_PRICE} />
            <p className="mt-3 text-[14px] text-[#6b7280]">
              მთლიანი კურსი — {LESSONS} გაკვეთილი. პრესეილის ფასი მოქმედებს,
              სანამ კურსი სრულად დასრულდება.
            </p>
            <ul className="mt-5 space-y-2 text-[15px] text-[#4b5563] list-disc pl-5">
              <li>
                {ACCESS_MONTHS} თვიანი წვდომა ყველა გაკვეთილზე{" "}
                <span className="text-[#6b7280]">
                  (დროის ათვლა დაიწყება პრესეილის დასრულების შემდეგ)
                </span>
              </li>
              <li>
                წვდომის გაგრძელება საჭიროების შემთხვევაში — ერთი თვე{" "}
                {EXTRA_MONTH} ₾
              </li>
              <li>ლექსიკის აუდიო მასალა თითოეულ გაკვეთილში</li>
              <li>პროგრესის თვალყურის დევნება და შეხსენებები ელფოსტაზე</li>
            </ul>
            <div className="mt-6">
              <SignUpButton />
            </div>
          </div>
        </Section>

        <Section heading="ხშირად დასმული კითხვები">
          <VideoCourseAccordion
            items={FAQ.map((f) => ({ title: f.q, body: f.a }))}
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
