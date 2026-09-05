import Link from "next/link";
import FaqAccordion from "@/components/FAQ/FaqAccordion";

const caseOn = { fontFeatureSettings: "'case' on" } as const;
const bodyStyle = { fontFeatureSettings: "normal" as const };
const link = "font-bold underline text-lingo-green hover:text-[#1f7d3a]";

// Course questions in the same accordion design as the /faq page.
const courseFaqs = [
  {
    q: "რატომ ავირჩიო სტუდიო ლინგოს ინგლისურის კურსი?",
    a: (
      <p style={bodyStyle} className="leading-relaxed">
        სტუდიო ლინგო არის #1 ინგლისურის სკოლა, სადაც ინგლისურის კურსები სრულად
        მორგებულია ქართველ მოსწავლეზე. მთავარი აქცენტი საუბარზეა — მოსწავლე
        გაკვეთილზევე ბევრს საუბრობს, რადგან თავისუფალი მეტყველება ენის ცოდნის
        მთავარი მაჩვენებელია. მცირე ჯგუფები, გამოცდილი მასწავლებლები და პრაქტიკული
        მეთოდები უზრუნველყოფს სწრაფ და ხარისხიან პროგრესს. ადგილზე ჯგუფური კურსის
        მოსწავლეებს კი თვეში ერთხელ გაკვეთილს ბრიტანელი მასწავლებელი (native
        speaker) უტარებს.
      </p>
    ),
  },
  {
    q: "ინგლისურის რომელ დონეებს ვსწავლობთ?",
    a: (
      <p style={bodyStyle} className="leading-relaxed">
        ვასწავლით ინგლისურს სრულიად ნულიდან მოწინავე დონემდე (A1–C1). თუ არ იცი,
        რომელ დონეზე ხარ, გაიარე ჩვენი{" "}
        <Link href="/language-test" className={link}>
          უფასო ენის ტესტი
        </Link>{" "}
        და რამდენიმე წუთში გაიგებ, საიდან უნდა დაიწყო სწავლა.
      </p>
    ),
  },
  {
    q: "როგორ ავირჩიო შესაფერისი კურსი?",
    a: (
      <p style={bodyStyle} className="leading-relaxed">
        თუ გსურს მაქსიმალური ყურადღება და მოქნილი გრაფიკი — აირჩიე{" "}
        <Link href="/courses/individual-online" className={link}>
          ინდივიდუალური კურსი
        </Link>
        . თუ გირჩევნია ცოცხალი კომუნიკაცია, თანაგუნდელებთან პრაქტიკა და
        ხელმისაწვდომი ფასი — ჯგუფური კურსი იდეალურია{" "}
        <Link href="/courses/group-online" className={link}>
          ონლაინ
        </Link>{" "}
        და{" "}
        <Link href="/courses/group-onsite" className={link}>
          ადგილზეც
        </Link>
        , თბილისში. კომპანიებისთვის კი გვაქვს{" "}
        <Link href="/corporate" className={link}>
          კორპორაციული ინგლისურის
        </Link>{" "}
        სპეციალური პროგრამა.
      </p>
    ),
  },
];

// Supporting content + FAQ-style questions below the course cards on /courses.
export default function CoursesAbout() {
  return (
    <section className="max-w-3xl mx-auto mt-16 sm:mt-20">
      <h2
        style={caseOn}
        className="mb-8 text-2xl font-bold text-center sm:text-3xl text-lingo-black"
      >
        თუ გიჭირს <span className="text-lingo-green">კურსის არჩევა</span>
      </h2>

      <FaqAccordion items={courseFaqs} />
    </section>
  );
}
