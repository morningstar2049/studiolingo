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
  "ჯგუფური ინგლისურის კურსი ადგილზე თბილისში — ცოცხალი გაკვეთილები მცირე ჯგუფებში და თვეში ერთხელ პრაქტიკა ბრიტანელ მასწავლებელთან (native speaker). დონეები A1-C1. Studio Lingo.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ჯგუფური ინგლისურის კურსი",
    "ინგლისურის კურსები თბილისში",
    "ინგლისურის კურსი ადგილზე",
    "საკლასო ინგლისურის კურსი",
    "ინგლისურის შესწავლა ჯგუფში",
    "ინგლისური native speaker-თან",
    "ბრიტანელი მასწავლებელი თბილისში",
    "სასაუბრო პრაქტიკა ინგლისელთან",
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
    <CourseVideo videoId="ul1FcubGI9c" />
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
      Speaking (საუბარი), Listening (მოსმენა), Reading (კითხვა), Writing
      (წერა), Grammar (გრამატიკა) და Vocabulary (ლექსიკა).{" "}
      <span className="font-bold text-lingo-green">განსაკუთრებული აქცენტი</span>{" "}
      საუბარზეა — საკლასო კურსზე ყველაზე მეტ დროს სწორედ ცოცხალ საუბარსა და
      კომუნიკაციას ვუთმობთ, რადგან თავისუფალი მეტყველება ენის ცოდნის მთავარი
      მაჩვენებელია. ამიტომ, ზოგად ინგლისურთან ერთად დიდ ყურადღებას ვუთმობთ{" "}
      <span className="font-bold text-lingo-green">სასაუბრო ინგლისურს</span> — რომ
      თავისუფლად და თავდაჯერებულად ალაპარაკდე. სწავლება სრულად მორგებულია
      ქართველ მოსწავლეზე და ითვალისწინებს დონეებს A1-დან C1-მდე.
    </p>
    <CourseSubhead>პრაქტიკა ბრიტანელ მასწავლებელთან</CourseSubhead>
    <p>
      საკლასო ჯგუფური კურსის მოსწავლეებს{" "}
      <span className="font-bold text-lingo-green">
        თვეში ერთხელ გაკვეთილს უტარებს ბრიტანელი მასწავლებელი (native speaker)
      </span>
      . ეს არ არის უბრალო „საუბრის საათი“ — გაკვეთილს მკაფიო წესი აქვს:
      ბრიტანელი მასწავლებელი აჯამებს ყველა იმ მასალას, რომელიც ჯგუფმა ქართველ
      მასწავლებელთან ერთად გაიარა, და საუბარში სწორედ იმ ლექსიკასა და
      გრამატიკას იყენებს. ქართველი მასწავლებელი კი აკვირდება და ამოწმებს,
      რამდენად შეუძლიათ მოსწავლეებს ნასწავლის პრაქტიკაში გამოყენება ნამდვილ
      ინგლისელთან საუბრისას. ასე სტუდიო ლინგოს საკლასო კურსზე ინგლისურის
      სწავლა თბილისში ბუნებრივ ინგლისურ მეტყველებასთან რეგულარულ შეხებას
      ნიშნავს — და თავდაჯერებულობას, რომ ნასწავლი რეალურ სიტუაციაშიც
      გამოგადგება.
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
        subtitle="ცოცხალი გაკვეთილები ჩვენს სივრცეში — ენერგიული გარემო, მოტივირებული ჯგუფი და თვეში ერთხელ პრაქტიკა ბრიტანელ მასწავლებელთან."
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
