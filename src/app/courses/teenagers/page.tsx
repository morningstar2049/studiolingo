import type { Metadata } from "next";
import CourseHero from "@/components/Courses/CourseHero";
import CourseDetails from "@/components/Courses/CourseDetails";
import CourseVideo from "@/components/Courses/CourseVideo";
import CourseReviews from "@/components/Courses/CourseReviews";
import { courses } from "@/components/Courses/coursesData";
import { courseSchema } from "@/lib/schema";

const course = courses.find((c) => c.slug === "/courses/teenagers")!;

const title = "ინგლისური მოზარდებისთვის — ონლაინ კურსი | Studio Lingo";
const description =
  "ინგლისურის ონლაინ კურსი მოზარდებისთვის (9-16 წელი) — ინტერაქტიული, მეგობრული და ფერადი გარემო, ასაკის შესაბამისი მეთოდები. დონეები ნულიდან. Studio Lingo.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ინგლისური მოზარდებისთვის",
    "ინგლისურის კურსი მოზარდებისთვის",
    "ინგლისური ბავშვებისთვის ონლაინ",
    "ინგლისურის კურსები მოზარდები",
    "ინგლისური ონლაინ",
    "Studio Lingo",
  ],
  alternates: { canonical: "/courses/teenagers" },
  openGraph: { title, description, images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

const teenagersDescription = (
  <div style={{ fontFeatureSettings: "normal" }}>
    <p>
      <span className="font-bold text-lingo-green">
        ინგლისური მოზარდებისთვის
      </span>{" "}
      სპეციალურად შექმნილი ონლაინ კურსია 9-დან 16 წლამდე ასაკის მოსწავლეებისთვის.
      სწავლა მიმდინარეობს არაფორმალურ, მეგობრულ და ფერად გარემოში, ასაკის
      შესაბამისი მეთოდებითა და თემებით.
    </p>
    <br />
    <p>
      გაკვეთილები ტარდება{" "}
      <span className="font-bold text-lingo-green">
        ინტერაქტიული და შემოქმედებითი
      </span>{" "}
      მიდგომებით — როლური თამაშები, დისკუსიები და ჯგუფური პროექტები ზრდის
      მოზარდის მოტივაციას და უზრუნველყოფს ნასწავლის პრაქტიკაში გამოყენებას.
    </p>
    <br />
    <p>
      კურსი მოიცავს ინგლისური ენის{" "}
      <span className="font-bold text-lingo-green">ყველა კომპონენტს</span>:
      speaking, listening, reading, writing, grammar და vocabulary. მასწავლებელი
      მუდმივად კონცენტრირდება გრამატიკულ წესებზე, მდიდარი ლექსიკის შესწავლასა და
      მათ სწორ გამოყენებაზე.
    </p>
    <br />
    <p>
      კურსის{" "}
      <span className="font-bold text-lingo-green">ძირითადი მასალები</span>{" "}
      შედგება Cambridge-ის უახლესი სახელმძღვანელოებისგან დონეების მიხედვით,
      ორიგინალური ციფრული სასწავლო პლატფორმისა და დიდი ვიდეოთეკისგან — აუდიო და
      ვიდეო მასალებით, ასევე სპეციალური ვიდეო თამაშებით ინგლისურის
      გასაუმჯობესებლად.
    </p>
    <CourseVideo />
    <br />
    <p>
      კურსი ქმნის მოსწავლეებისთვის{" "}
      <span className="font-bold text-lingo-green">
        მეგობრულ, მხარდაჭერილ გარემოს
      </span>
      , სადაც მოზარდი შეძლებს ენის სწავლის პროცესში წინსვლასა და საკუთარი თავის
      განვითარებას.
    </p>
    <br />
    <p>
      სწავლის პერიოდი ინდივიდუალურია, ვასწავლით დონეებს სრულიად ნულიდან მოწინავე
      დონემდე (A1-B2). შემოგვიერთდი „სტუდიო ლინგოს“ კურსზე მოზარდებისთვის და მიეცი
      შენს შვილს ინგლისურის სწავლის საუკეთესო გამოცდილება.
    </p>
  </div>
);

export default function TeenagersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            courseSchema({
              name: course.title,
              description,
              path: "/courses/teenagers",
              mode: "online",
            }),
          ),
        }}
      />
      <CourseHero
        title={course.title}
        subtitle="სპეციალურად მოზარდებზე მორგებული კურსი — არაფორმალურ, მეგობრულ და ფერად გარემოში, ასაკის შესაბამისი მეთოდებით."
        art={course.art}
        from="#2a375c"
        to="#181f33"
      />

      <main className="pt-10 pb-20">
        <div className="max-w-3xl px-5 mx-auto">
          <CourseDetails
            courseTitle="englishForTeens"
            gatedCalculator
            description={teenagersDescription}
          />
        </div>
        <CourseReviews
          authors={["ირაკლი ნანობაშვილი", "გუჯა გუჯაბიძე", "ბაჩო შენგელია"]}
        />
      </main>
    </>
  );
}
