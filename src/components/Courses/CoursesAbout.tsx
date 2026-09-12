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
        speaker) უტარებს. ვიცით, სად ეშლებათ ქართველებს და რა უშლით ხელს
        თავისუფლად საუბარში — სწავლება მიმდინარეობს ორივე ფორმატში, თბილისში და
        ონლაინ, ერთი და იმავე მასწავლებლებითა და მასალებით.
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
  {
    q: "ვისთვის არის ინგლისურის კურსები?",
    a: (
      <p style={bodyStyle} className="leading-relaxed">
        ზრდასრულებისთვის (17 წლიდან) გვაქვს{" "}
        <Link href="/courses/individual-online" className={link}>
          ინდივიდუალური ონლაინ კურსი
        </Link>
        ,{" "}
        <Link href="/courses/group-online" className={link}>
          ჯგუფური ონლაინ კურსი
        </Link>{" "}
        და{" "}
        <Link href="/courses/group-onsite" className={link}>
          ჯგუფური კურსი ადგილზე
        </Link>
        . მოზარდებისთვის (9–16 წელი) —{" "}
        <Link href="/courses/teenagers" className={link}>
          ცალკე ონლაინ კურსი
        </Link>{" "}
        ასაკის შესაბამისი მეთოდებითა და თემებით. კომპანიებს ვთავაზობთ{" "}
        <Link href="/corporate" className={link}>
          კორპორაციულ ინგლისურს
        </Link>
        . ვასწავლით სრულიად ნულიდან (A1) მოწინავე დონემდე (C1); თუ არ იცი,
        რომელ დონეზე ხარ, გაიარე{" "}
        <Link href="/language-test" className={link}>
          უფასო ონლაინ ტესტი
        </Link>
        .
      </p>
    ),
  },
  {
    q: "რომელი ფორმატი გირჩევნია — ინდივიდუალური, ჯგუფური, ონლაინ თუ ადგილზე?",
    a: (
      <p style={bodyStyle} className="leading-relaxed">
        <span className="font-bold text-lingo-green">ინდივიდუალური კურსი</span>{" "}
        — მაქსიმალური ყურადღება, შენს ტემპზე მორგებული პროგრამა და მოქნილი
        გრაფიკი.{" "}
        <span className="font-bold text-lingo-green">ჯგუფური ონლაინ</span> —
        მაქსიმუმ 4 მოსწავლე, ცოცხალი დიალოგები და ყველაზე ხელმისაწვდომი ფასი,
        ნებისმიერი ქალაქიდან.{" "}
        <span className="font-bold text-lingo-green">ჯგუფური ადგილზე</span> —
        საკლასო ენერგია თბილისში, 7–8 მოსწავლე და თვეში ერთხელ პრაქტიკა{" "}
        <span className="font-bold text-lingo-green">
          ბრიტანელ მასწავლებელთან (native speaker)
        </span>
        , რომელიც ჯგუფთან ერთად აჯამებს გავლილ მასალას. სასაუბრო თუ ზოგადი
        ინგლისური — ორივე მიმართულებას ერთ კურსში ვაერთიანებთ.
      </p>
    ),
  },
  {
    q: "რას მოიცავს თითოეული კურსი?",
    a: (
      <p style={bodyStyle} className="leading-relaxed">
        Cambridge-ის უახლეს სახელმძღვანელოებს, ციფრულ სასწავლო პლატფორმას და
        დიდ ვიდეოთეკას; ინგლისურის ყველა კომპონენტს — Speaking, Listening,
        Reading, Writing, Grammar, Vocabulary; მცირე ჯგუფებსა და გამოცდილ
        მასწავლებლებს, რომლებთანაც შეცდომის დაშვება სწავლის ბუნებრივი ნაწილია.
        ფასი და გრაფიკი თითოეული კურსის გვერდზეა, რეგისტრაცია კი რამდენიმე წუთს
        იღებს —{" "}
        <Link href="/register" className={link}>
          დარეგისტრირდი
        </Link>{" "}
        და ადმინისტრატორი დაგიკავშირდება.
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
