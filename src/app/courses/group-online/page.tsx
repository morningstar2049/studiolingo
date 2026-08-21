import type { Metadata } from "next";
import CourseHero from "@/components/Courses/CourseHero";
import CourseDetails from "@/components/Courses/CourseDetails";
import CourseVideo from "@/components/Courses/CourseVideo";
import CourseReviews from "@/components/Courses/CourseReviews";
import CourseSubhead from "@/components/Courses/CourseSubhead";
import CourseToolsSection from "@/components/Courses/CourseToolsSection";
import CourseHomeworkSection from "@/components/Courses/CourseHomeworkSection";
import { courses } from "@/components/Courses/coursesData";
import { courseSchema } from "@/lib/schema";

const course = courses.find((c) => c.slug === "/courses/group-online")!;

const title = "ჯგუფური ინგლისურის ონლაინ კურსი | Studio Lingo";
const description =
  "ჯგუფური ინგლისურის ონლაინ კურსი მცირე ჯგუფებში — ცოცხალი კომუნიკაცია, ინტერაქციული გაკვეთილები და ხელმისაწვდომი ფასი. დონეები A1-C1. ისწავლე ინგლისური ონლაინ Studio Lingo-სთან.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ჯგუფური ინგლისურის კურსი",
    "ინგლისური ონლაინ",
    "ონლაინ ინგლისურის კურსი",
    "ინგლისურის შესწავლა ჯგუფში",
    "ინგლისურის კურსები",
    "Studio Lingo",
  ],
  alternates: { canonical: "/courses/group-online" },
  openGraph: { title, description, images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

const groupOnlineDescription = (
  <div style={{ fontFeatureSettings: "normal" }}>
    <p>
      <span className="font-bold text-lingo-green">
        ჯგუფური ინგლისურის ონლაინ კურსი
      </span>{" "}
      იდეალური არჩევანია მათთვის, ვისაც სურს ინგლისურის შესწავლა
      თანამოსწავლეებთან ერთად, სახლიდან გაუსვლელად. მცირე ჯგუფებში (მაქსიმუმ 4
      მოსწავლე) სწავლა
      აერთიანებს ცოცხალ კომუნიკაციას, ინტერაქციულ გარემოსა და ხელმისაწვდომ ფასს.
    </p>
    <br />
    <p>
      გაკვეთილები მიმდინარეობს პრაქტიკულად და ინტერაქციულად — მოსწავლეები
      აქტიურად საუბრობენ, მართავენ{" "}
      <span className="font-bold text-lingo-green">დიალოგებს</span> და ერთმანეთთან
      ვარჯიშობენ. ჯგუფური დინამიკა ზრდის მოტივაციას და ეხმარება მოსწავლეს, დაძლიოს
      უცხო ენაზე საუბრის ბარიერი და ალაპარაკდეს თავისუფლად.
    </p>
    <br />
    <p>
      ონლაინ ინგლისურის კურსი მოიცავს ენის{" "}
      <span className="font-bold text-lingo-green">ყველა კომპონენტს</span>:
      speaking, listening, reading, writing, grammar და vocabulary.{" "}
      <span className="font-bold text-lingo-green">განსაკუთრებული აქცენტი</span>{" "}
      speaking-ზეა — ჯგუფურ კურსზე ყველაზე მეტ დროს სწორედ საუბარსა და ცოცხალ
      კომუნიკაციას ვუთმობთ, რადგან თავისუფალი მეტყველება ენის ცოდნის მთავარი
      მაჩვენებელია. სწავლება სრულად მორგებულია ქართველ მოსწავლეზე და
      ითვალისწინებს დონეებს A1-დან C1-მდე.
    </p>
    <CourseSubhead>მასალები</CourseSubhead>
    <p>
      კურსის{" "}
      <span className="font-bold text-lingo-green">ძირითადი მასალები</span> შედგება
      Cambridge-ის უახლესი სახელმძღვანელოებისგან, ორიგინალური ციფრული სასწავლო პლატფორმისა და
      დიდი ვიდეოთეკისგან — აუდიოებით როგორც ამერიკული, ასევე ბრიტანული აქცენტით.
      ონლაინ ფორმატი სრულად ინარჩუნებს გაკვეთილის ინტერაქტიულობასა და ჩართულობას.
    </p>
    <CourseVideo />
    <CourseToolsSection />
    <CourseHomeworkSection />
    <br />
    <p>
      შემოგვიერთდი „სტუდიო ლინგოს“ ჯგუფურ ონლაინ კურსზე და ისწავლე ინგლისური
      ეფექტურად, თანამოსწავლეებთან ერთად — სახლიდან გაუსვლელად.
    </p>
  </div>
);

export default function GroupOnlinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            courseSchema({
              name: course.title,
              description,
              path: "/courses/group-online",
              mode: "online",
            }),
          ),
        }}
      />
      <CourseHero
        title={course.title}
        subtitle="ისწავლე პატარა ჯგუფში, სახლიდან — ცოცხალი კომუნიკაცია, თანაგუნდელებთან პრაქტიკა და ხელმისაწვდომი ფასი."
        art={course.art}
        from="#2a375c"
        to="#181f33"
      />

      <main className="pt-10 pb-20">
        <div className="max-w-3xl px-5 mx-auto">
          <CourseDetails
            courseTitle="english"
            gatedCalculator
            description={groupOnlineDescription}
          />
        </div>
        <CourseReviews
          authors={["გუჯა გუჯაბიძე", "ნინი ნადირაძე", "დეა ფირცხალაიშვილი"]}
        />
      </main>
    </>
  );
}
