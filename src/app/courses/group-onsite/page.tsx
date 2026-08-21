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

const course = courses.find((c) => c.slug === "/courses/group-onsite")!;

const title = "ჯგუფური ინგლისურის კურსი ადგილზე | Studio Lingo";
const description =
  "ჯგუფური ინგლისურის კურსი ადგილზე — ცოცხალი საკლასო გაკვეთილები მცირე ჯგუფებში, პირდაპირი კონტაქტი მასწავლებელთან და ენერგიული გარემო. დონეები A1-C1. Studio Lingo თბილისში.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ჯგუფური ინგლისურის კურსი",
    "ინგლისურის კურსები თბილისში",
    "ინგლისურის კურსი ადგილზე",
    "საკლასო ინგლისურის კურსი",
    "ინგლისურის შესწავლა ჯგუფში",
    "Studio Lingo",
  ],
  alternates: { canonical: "/courses/group-onsite" },
  openGraph: { title, description, images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

const groupOnsiteDescription = (
  <div style={{ fontFeatureSettings: "normal" }}>
    <p>
      <span className="font-bold text-lingo-green">
        ჯგუფური ინგლისურის კურსი ადგილზე
      </span>{" "}
      იდეალურია მათთვის, ვისაც ურჩევნია ცოცხალ, საკლასო გარემოში სწავლა. ჩვენს
      სივრცეში, მცირე ჯგუფებში (ჯგუფში 7-8 მოსწავლე), გაკვეთილები აერთიანებს
      პირდაპირ კონტაქტს მასწავლებელთან, ენერგიულ გარემოსა და მოტივირებულ ჯგუფს.
    </p>
    <br />
    <p>
      საკლასო გაკვეთილები მიმდინარეობს პრაქტიკულად და ინტერაქციულად —
      მოსწავლეები აქტიურად საუბრობენ, მართავენ{" "}
      <span className="font-bold text-lingo-green">დიალოგებს</span> და
      ვარჯიშობენ ერთმანეთთან. პირისპირ კომუნიკაცია აჩქარებს ენის ათვისებას და
      ეხმარება მოსწავლეს, დაძლიოს საუბრის ბარიერი.
    </p>
    <br />
    <p>
      კურსი მოიცავს ინგლისური ენის{" "}
      <span className="font-bold text-lingo-green">ყველა კომპონენტს</span>:
      speaking, listening, reading, writing, grammar და vocabulary.{" "}
      <span className="font-bold text-lingo-green">განსაკუთრებული აქცენტი</span>{" "}
      speaking-ზეა — საკლასო კურსზე ყველაზე მეტ დროს სწორედ ცოცხალ საუბარსა და
      კომუნიკაციას ვუთმობთ, რადგან თავისუფალი მეტყველება ენის ცოდნის მთავარი
      მაჩვენებელია. სწავლება სრულად მორგებულია ქართველ მოსწავლეზე და
      ითვალისწინებს დონეებს A1-დან C1-მდე.
    </p>
    <CourseSubhead>მასალები</CourseSubhead>
    <p>
      კურსის{" "}
      <span className="font-bold text-lingo-green">ძირითადი მასალები</span>{" "}
      შედგება Cambridge-ის უახლესი სახელმძღვანელოებისგან, ორიგინალური ციფრული სასწავლო
      პლატფორმისა და დიდი ვიდეოთეკისგან — ამერიკული და ბრიტანული აქცენტის
      აუდიოებით. საკლასო აქტივობები, სამაგიდო თამაშები და ჯგუფური პროექტები
      სწავლას სახალისოსა და ეფექტურს ხდის.
    </p>
    <CourseVideo />
    <CourseToolsSection />
    <CourseHomeworkSection />
    <br />
    <p>
      შემოგვიერთდი „სტუდიო ლინგოს“ ჯგუფურ საკლასო კურსზე და ისწავლე ინგლისური
      ცოცხალ, მოტივირებულ გარემოში, თანამოსწავლეებთან ერთად.
    </p>
  </div>
);

export default function GroupOnsitePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            courseSchema({
              name: course.title,
              description,
              path: "/courses/group-onsite",
              mode: "onsite",
            }),
            breadcrumbSchema([
              { name: "მთავარი", path: "/" },
              { name: "კურსები", path: "/courses" },
              { name: course.title, path: "/courses/group-onsite" },
            ]),
          ]),
        }}
      />
      <CourseHero
        title={course.title}
        subtitle="ცოცხალი გაკვეთილები ჩვენს სივრცეში — ენერგიული გარემო, პირდაპირი კონტაქტი მასწავლებელთან და მოტივირებულ ჯგუფთან ერთად სწავლა."
        art={course.art}
        from="#2a375c"
        to="#181f33"
      />

      <main className="pt-10 pb-20">
        <div className="max-w-3xl px-5 mx-auto">
          <CourseDetails
            courseTitle="english"
            gatedCalculator
            description={groupOnsiteDescription}
          />
        </div>
        <CourseReviews
          authors={["დეა ფირცხალაიშვილი", "ირაკლი ნანობაშვილი", "ნინო ჯახველაძე"]}
        />
      </main>
    </>
  );
}
