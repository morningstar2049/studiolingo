import type { Metadata } from "next";
import CourseHero from "@/components/Courses/CourseHero";
import CourseDetails from "@/components/Courses/CourseDetails";
import CourseVideo from "@/components/Courses/CourseVideo";
import CourseReviews from "@/components/Courses/CourseReviews";
import CourseSubhead from "@/components/Courses/CourseSubhead";
import CourseToolsSection from "@/components/Courses/CourseToolsSection";
import CourseHomeworkSection from "@/components/Courses/CourseHomeworkSection";
import { courses } from "@/components/Courses/coursesData";
import { courseSchema, breadcrumbSchema } from "@/lib/schema";

const course = courses.find(
  (c) => c.slug === "/courses/individual-online",
)!;

const title = "ინდივიდუალური ინგლისურის ონლაინ კურსი | Studio Lingo";
const description =
  "ინდივიდუალური ინგლისურის ონლაინ კურსი — პერსონალური, ერთ-ერთზე გაკვეთილები შენს ტემპზე მორგებული, მოქნილი გრაფიკით და სწრაფი პროგრესით. დონეები A1-C1. Studio Lingo.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ინდივიდუალური ინგლისურის კურსი",
    "ინდივიდუალური ინგლისური ონლაინ",
    "პერსონალური ინგლისურის გაკვეთილები",
    "ინგლისური ონლაინ",
    "ინგლისურის კურსები",
    "Studio Lingo",
  ],
  alternates: { canonical: "/courses/individual-online" },
  openGraph: { title, description, images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

const individualOnlineDescription = (
  <div style={{ fontFeatureSettings: "normal" }}>
    <CourseVideo videoId="ul1FcubGI9c" />
    <p>
      <span className="font-bold text-lingo-green">
        ინდივიდუალური ინგლისურის ონლაინ კურსი
      </span>{" "}
      შექმნილია მათთვის, ვისაც სურს მაქსიმალურად სწრაფი პროგრესი და ინდივიდუალური
      მიდგომა. გაკვეთილები სრულად მორგებულია შენს ტემპზე, დონესა და მიზნებზე, ხოლო
      მასწავლებლის მთელი ყურადღება მხოლოდ შენზეა.
    </p>
    <br />
    <p>
      ინდივიდუალური ფორმატის მთავარი უპირატესობა{" "}
      <span className="font-bold text-lingo-green">მოქნილი გრაფიკია</span> — შენ
      ირჩევ გაკვეთილების მოსახერხებელ დღეებსა და საათებს, ხოლო სწავლის ტემპსაც
      თავად განსაზღვრავ. ეს კი უზრუნველყოფს ეფექტურ და დაუბრკოლებელ პროგრესს.
    </p>
    <br />
    <p>
      ონლაინ ინგლისურის კურსი მოიცავს ენის{" "}
      <span className="font-bold text-lingo-green">ყველა კომპონენტს</span>:
      Speaking (საუბარი), Listening (მოსმენა), Reading (კითხვა), Writing
      (წერა), Grammar (გრამატიკა) და Vocabulary (ლექსიკა).{" "}
      <span className="font-bold text-lingo-green">განსაკუთრებული აქცენტი</span>{" "}
      საუბარზეა — ჩვენს კურსებზე ყველაზე მეტ დროს სწორედ საუბრის უნარის
      განვითარებას ვუთმობთ, რადგან თავისუფალი მეტყველება ენის ცოდნის მთავარი
      მაჩვენებელია. სწავლება სრულად მორგებულია ქართველ მოსწავლეზე და
      ითვალისწინებს დონეებს A1-დან C1-მდე.
    </p>
    <CourseSubhead>მასალები</CourseSubhead>
    <p>
      კურსის{" "}
      <span className="font-bold text-lingo-green">ძირითადი მასალები</span>{" "}
      შედგება Cambridge-ის უახლესი სახელმძღვანელოებისგან, ორიგინალური ციფრული სასწავლო
      პლატფორმისა და დიდი ვიდეოთეკისგან — ამერიკული და ბრიტანული აქცენტის
      აუდიოებით. მასწავლებელი დამატებით მასალებსაც შეარჩევს სწორედ შენს
      ინტერესებსა და მიზნებზე მორგებით.
    </p>
    <CourseVideo />
    <CourseToolsSection />
    <CourseHomeworkSection />
    <br />
    <p>
      შემოგვიერთდი „სტუდიო ლინგოს“ ინდივიდუალურ ონლაინ კურსზე და ისწავლე
      ინგლისური შენს ტემპზე, პერსონალური მიდგომით.
    </p>
  </div>
);

export default function IndividualOnlinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            courseSchema({
              name: course.title,
              description,
              path: "/courses/individual-online",
              mode: "online",
            }),
            breadcrumbSchema([
              { name: "მთავარი", path: "/" },
              { name: "კურსები", path: "/courses" },
              { name: course.title, path: "/courses/individual-online" },
            ]),
          ]),
        }}
      />
      <CourseHero
        title={course.title}
        subtitle="პერსონალური გაკვეთილები, შენს ტემპსა და მიზნებზე მორგებული — მთელი ყურადღება მხოლოდ შენზეა."
        art={course.art}
        from="#2a375c"
        to="#181f33"
      />

      <main className="pt-10 pb-20">
        <div className="max-w-3xl px-5 mx-auto">
          <CourseDetails
            courseTitle="english"
            gatedCalculator
            description={individualOnlineDescription}
          />
        </div>
        <CourseReviews
          authors={["ბაჩო შენგელია", "გიორგი ბართია", "გუჯა გუჯაბიძე"]}
        />
      </main>
    </>
  );
}
