import type { Metadata } from "next";
import CourseHero from "@/components/Courses/CourseHero";
import CourseDetails from "@/components/Courses/CourseDetails";
import CourseVideo from "@/components/Courses/CourseVideo";
import CoursePhoto from "@/components/Courses/CoursePhoto";
import CourseReviews from "@/components/Courses/CourseReviews";
import CourseSubhead from "@/components/Courses/CourseSubhead";
import CourseToolsSection from "@/components/Courses/CourseToolsSection";
import CourseHomeworkSection from "@/components/Courses/CourseHomeworkSection";
import CourseBody from "@/components/Courses/CourseBody";
import { courses } from "@/components/Courses/coursesData";
import { getCourse } from "@/sanity/queries";
import { PricesProvider } from "@/components/Prices/PricesProvider";
import { loadPriceTable } from "@/lib/loadPrices";
import { courseSchema, breadcrumbSchema } from "@/lib/schema";

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
    <CourseVideo videoId="mzBYooZVE88" />
    <p>
      <span className="font-bold text-lingo-green">
        ჯგუფური ინგლისურის ონლაინ კურსი
      </span>{" "}
      იდეალური არჩევანია მათთვის, ვისაც სურს ინგლისურის შესწავლა
      თანამოსწავლეებთან ერთად, სახლიდან გაუსვლელად. მცირე ჯგუფებში (მაქსიმუმ 4
      მოსწავლე) სწავლა აერთიანებს ცოცხალ კომუნიკაციას, ინტერაქციულ გარემოსა და
      ხელმისაწვდომ ფასს.
    </p>
    <br />
    <p>
      გაკვეთილები მიმდინარეობს პრაქტიკულად და ინტერაქციულად — მოსწავლეები
      აქტიურად საუბრობენ, მართავენ{" "}
      <span className="font-bold text-lingo-green">დიალოგებს</span> და
      ერთმანეთთან ვარჯიშობენ. ჯგუფური დინამიკა ზრდის მოტივაციას და ეხმარება
      მოსწავლეს, დაძლიოს უცხო ენაზე საუბრის ბარიერი და ალაპარაკდეს თავისუფლად.
    </p>
    <CoursePhoto
      src="/course-photo-group-online.jpg"
      alt="ჯგუფური ინგლისურის ონლაინ გაკვეთილი სტუდიო ლინგოში — მასწავლებელი და მოსწავლეები ლეპტოპთან"
    />
    <p>
      ონლაინ ინგლისურის კურსი მოიცავს ენის{" "}
      <span className="font-bold text-lingo-green">ყველა კომპონენტს</span>:
      Speaking (საუბარი), Listening (მოსმენა), Reading (კითხვა), Writing (წერა),
      Grammar (გრამატიკა) და Vocabulary (ლექსიკა).{" "}
      <span className="font-bold text-lingo-green">განსაკუთრებული აქცენტი</span>{" "}
      საუბარზეა — ჯგუფურ კურსზე ყველაზე მეტ დროს სწორედ საუბარსა და ცოცხალ
      კომუნიკაციას ვუთმობთ, რადგან თავისუფალი მეტყველება ენის ცოდნის მთავარი
      მაჩვენებელია. ამიტომ, ზოგად ინგლისურთან ერთად დიდ ყურადღებას ვუთმობთ{" "}
      <span className="font-bold text-lingo-green">სასაუბრო ინგლისურს</span> —
      რომ თავისუფლად და თავდაჯერებულად ალაპარაკდე. სწავლება სრულად მორგებულია
      ქართველ მოსწავლეზე და ითვალისწინებს დონეებს A1-დან C1-მდე.
    </p>
    <CourseSubhead>მასალები</CourseSubhead>
    <p>
      კურსის{" "}
      <span className="font-bold text-lingo-green">ძირითადი მასალები</span>{" "}
      შედგება Cambridge-ის უახლესი სახელმძღვანელოებისგან, ორიგინალური ციფრული
      სასწავლო პლატფორმისა და დიდი ვიდეოთეკისგან — აუდიოებით როგორც ამერიკული,
      ასევე ბრიტანული აქცენტით. ონლაინ ფორმატი სრულად ინარჩუნებს გაკვეთილის
      ინტერაქტიულობასა და ჩართულობას.
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

// Page text is edited in Sanity ("კურსი"); refresh at most once a minute.
export const revalidate = 60;

const fallbackSubtitle =
  "ისწავლე პატარა ჯგუფში, სახლიდან — ცოცხალი კომუნიკაცია, თანაგუნდელებთან პრაქტიკა და ხელმისაწვდომი ფასი.";

export default async function GroupOnlinePage() {
  const [doc, prices] = await Promise.all([
    getCourse("group-online"),
    loadPriceTable(),
  ]);
  const courseTitle = doc?.title || course.title;
  const subtitle = doc?.heroSubtitle || fallbackSubtitle;
  const courseDescription = doc?.body?.length ? (
    <CourseBody body={doc.body} />
  ) : (
    groupOnlineDescription
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            courseSchema({
              name: courseTitle,
              description,
              path: "/courses/group-online",
              mode: "online",
            }),
            breadcrumbSchema([
              { name: "მთავარი", path: "/" },
              { name: "კურსები", path: "/courses" },
              { name: courseTitle, path: "/courses/group-online" },
            ]),
          ]),
        }}
      />
      <CourseHero
        title={courseTitle}
        subtitle={subtitle}
        art={course.art}
        from="#2a375c"
        to="#181f33"
      />

      <main className="pt-10 pb-20">
        <div className="max-w-3xl px-5 mx-auto">
          <PricesProvider prices={prices}>
            <CourseDetails
              courseTitle="english"
              gatedCalculator
              description={courseDescription}
            />
          </PricesProvider>
        </div>
        <CourseReviews
          authors={["გუჯა გუჯაბიძე", "ნინი ნადირაძე", "დეა ფირცხალაიშვილი"]}
        />
      </main>
    </>
  );
}
