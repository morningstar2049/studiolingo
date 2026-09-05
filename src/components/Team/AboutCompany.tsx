import {
  FaChalkboardUser,
  FaUsers,
  FaHeart,
  FaSeedling,
} from "react-icons/fa6";
import RevealOnScroll from "../RevealOnScroll";

const caseOn = { fontFeatureSettings: "'case' on" } as const;

const features = [
  {
    icon: <FaChalkboardUser />,
    title: "მეთოდოლოგია",
    text: "ჩვენი სწავლების მეთოდი კომუნიკაციაზეა ორიენტირებული — გაკვეთილების უდიდეს ნაწილს საუბრის უნარის განვითარებას ვუთმობთ. ვიყენებთ Cambridge-ის უახლეს სახელმძღვანელოებს, საკუთარ ციფრულ პლატფორმას, ვიდეოთეკასა და ხელოვნური ინტელექტის ხელსაწყოებს და ვფარავთ ენის ყველა კომპონენტს — Speaking, Listening, Reading, Writing, Grammar და Vocabulary.",
  },
  {
    icon: <FaUsers />,
    title: "სასწავლო გარემო",
    text: "ვქმნით მეგობრულ და კომფორტულ გარემოს, სადაც თითოეული მოსწავლე თავს თავისუფლად გრძნობს. ჯგუფები მცირერიცხოვანია — მაქსიმუმ 4 მოსწავლე, რაც უზრუნველყოფს მასწავლებლის მაქსიმალურ ყურადღებას თითოეულ მათგანზე, როგორც ონლაინ, ისე ჩვენს ოფისში, თბილისში.",
  },
  {
    icon: <FaHeart />,
    title: "ჩვენი ღირებულებები",
    text: "გვჯერა, რომ ენის სწავლა ყველასთვის ხელმისაწვდომი და სასიამოვნო უნდა იყოს. ვაფასებთ თითოეული მოსწავლის ინდივიდუალურ ტემპს, ვახალისებთ ცდას და ვქმნით ისეთ ატმოსფეროს, სადაც სწავლა შიშის გარეშე, სიამოვნებით მიმდინარეობს.",
  },
];

export default function AboutCompany() {
  return (
    <section className="max-w-5xl px-5 mx-auto mt-16 sm:mt-24">
      <div className="mb-9 text-center sm:mb-12">
        <RevealOnScroll
          revealClass="team-line"
          className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-lingo-green"
        />
        <RevealOnScroll revealClass="team-rise" delay={220}>
          <h2
            style={caseOn}
            className="text-2xl font-bold text-lingo-black sm:text-4xl"
          >
            სკოლის <span className="text-lingo-green">შესახებ</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-[16px] leading-relaxed text-[#4b5563] sm:text-lg">
            „სტუდიო ლინგო“ არის ყველაზე პოპულარული ინგლისური ენის სკოლა, რომელიც
            თბილისსა და ონლაინ ასწავლის ინგლისურს ზრდასრულებსა და მოზარდებს —
            პრაქტიკული,
            თანამედროვე და მოსწავლეზე მორგებული მიდგომით. ჩვენი მიზანია, ისწავლო
            ინგლისური ისე, რომ თავისუფლად ალაპარაკდე, და არა უბრალოდ დაიზეპირო
            გრამატიკის წესები. ადგილზე ჯგუფური კურსის მოსწავლეებს თვეში ერთხელ
            გაკვეთილს ბრიტანელი მასწავლებელი (native speaker) უტარებს — ნასწავლი
            ლექსიკისა და გრამატიკის ნამდვილ საუბარში გამოსაცდელად.
          </p>
        </RevealOnScroll>
      </div>

      {/* "mistakes are part of learning" highlight */}
      <RevealOnScroll once revealClass="team-rise" className="max-w-3xl mx-auto">
        <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:p-8 rounded-[24px] bg-[linear-gradient(155deg,#ffffff,#eaf7ef)] border border-[#cfead8] shadow-[0_24px_54px_-30px_rgba(41,49,66,0.35)]">
          <span className="flex items-center justify-center w-12 h-12 text-xl text-[#fff] rounded-2xl shrink-0 bg-gradient-to-br from-[#3bb85e] to-[#2f9e4d] shadow-[0_10px_22px_-8px_rgba(47,158,77,0.6)]">
            <FaSeedling />
          </span>
          <div>
            <h3
              style={caseOn}
              className="text-lg font-bold sm:text-xl text-lingo-black"
            >
              შეცდომა სწავლის ნაწილია
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3f4a52] sm:text-base">
              ჩვენს გაკვეთილებზე შეცდომის დაშვება არა მხოლოდ დასაშვები, არამედ
              სწავლის ბუნებრივი და აუცილებელი ნაწილია. აქ არავინ განგსჯის — შენ
              თავისუფლად ლაპარაკობ, ცდი და სწორედ ცდისა და შეცდომის გზით ვითარდები
              ყველაზე სწრაფად. ჩვენ ვქმნით გარემოს, სადაც შეცდომის შიში აღარ
              გიშლის ხელს ალაპარაკებაში.
            </p>
          </div>
        </div>
      </RevealOnScroll>

      {/* methodology / environment / values */}
      <div className="grid gap-5 mt-8 sm:mt-10 sm:grid-cols-3">
        {features.map((f, i) => (
          <RevealOnScroll
            key={f.title}
            once
            revealClass="team-rise"
            delay={i * 120}
            className="h-full"
          >
            <div className="flex flex-col h-full gap-4 p-6 sm:p-7 bg-[#fff] rounded-[24px] border border-[#e5efe9] shadow-[0_18px_40px_-26px_rgba(41,49,66,0.3)]">
              <span className="flex items-center justify-center w-12 h-12 text-xl text-[#fff] rounded-2xl shrink-0 bg-gradient-to-br from-[#3bb85e] to-[#2f9e4d] shadow-[0_10px_22px_-8px_rgba(47,158,77,0.6)]">
                {f.icon}
              </span>
              <h3
                style={caseOn}
                className="text-lg font-bold sm:text-xl text-lingo-black"
              >
                {f.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#3f4a52]">
                {f.text}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
