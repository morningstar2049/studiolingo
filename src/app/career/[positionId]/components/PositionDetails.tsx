import type { ReactNode } from "react";
import {
  FaLocationDot,
  FaBriefcase,
  FaCoins,
  FaCheck,
  FaPaperPlane,
  FaGift,
  FaClock,
  FaListCheck,
  FaCircleCheck,
} from "react-icons/fa6";
import { positionData } from "../positionData";
import CourseVideo from "@/components/Courses/CourseVideo";

export type TPositionKey =
  | "englishTeacher"
  | "germanTeacher"
  | "chineseTeacher"
  | "contentCreator"
  | "administrator"
  | "academyInternship";

type TPositionDetailsProps = {
  positionKey: TPositionKey;
};

const caseOn = { fontFeatureSettings: "'case' on" } as const;

// YouTube video ids shown above the description on specific position pages.
const positionVideos: Partial<Record<TPositionKey, string>> = {
  academyInternship: "6p0IdTn5QFQ",
  englishTeacher: "qWe4SpOVzuQ",
};

// A titled block: icon chip + heading, then check-marked items.
function Section({
  icon,
  heading,
  items,
  tone = "plain",
}: {
  icon: ReactNode;
  heading: string;
  items: (string | ReactNode)[];
  tone?: "plain" | "green";
}) {
  return (
    <div
      className={
        tone === "green"
          ? "rounded-[22px] border border-[#cfead8] bg-[linear-gradient(160deg,#ffffff,#eef8f1)] p-6 sm:p-8"
          : ""
      }
    >
      <h2
        style={caseOn}
        className="flex items-center gap-3 text-xl font-bold text-lingo-black sm:text-2xl"
      >
        <span className="flex items-center justify-center w-10 h-10 text-[#fff] rounded-xl shrink-0 bg-gradient-to-br from-[#3bb85e] to-[#2f9e4d] shadow-[0_10px_22px_-8px_rgba(47,158,77,0.6)]">
          {icon}
        </span>
        {heading}
      </h2>
      <ul className="flex flex-col gap-3 mt-5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-[#3f4a52]">
            {/* 40px column matching the heading's icon chip, so the check marks
                sit on the same vertical axis as the section icon */}
            <span className="flex justify-center w-10 mt-0.5 shrink-0">
              <span className="flex items-center justify-center w-5 h-5 text-[10px] rounded-full bg-lingo-green text-[#fff]">
                <FaCheck />
              </span>
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PositionDetails({ positionKey }: TPositionDetailsProps) {
  const position = positionData[positionKey];

  const ApplyButton = ({ block = false }: { block?: boolean }) => (
    <a
      href={position.googleFormLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[15px] font-bold transition-transform rounded-xl text-[#fff] bg-lingo-green shadow-[0_18px_40px_-14px_rgba(47,158,77,0.75)] hover:scale-[1.03] ${
        block ? "w-full sm:w-auto" : ""
      }`}
    >
      განაცხადის გაგზავნა
      <FaPaperPlane className="text-sm shrink-0" />
    </a>
  );

  const metaItems = [
    { icon: <FaLocationDot />, value: position.location },
    { icon: <FaBriefcase />, value: position.time },
    { icon: <FaCoins />, value: position.salaryType },
  ];

  return (
    <div className="w-full">
      {/* Hero cover */}
      <div
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(120deg, #2a375c, #181f33)" }}
      >
        {/* brand-green glow + decorative icon */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(560px 280px at 100% 0%, rgba(47,158,77,0.28), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 items-center hidden pr-[5%] lg:flex pointer-events-none"
        >
          <FaBriefcase style={{ fontSize: 118, color: "#ffffff10" }} />
        </div>

        <div className="relative z-10 max-w-4xl px-5 mx-auto py-7 sm:py-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-bold rounded-full text-[#5fd07f] bg-[#2f9e4d1f] border border-[#2f9e4d40]">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-lingo-green" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-lingo-green" />
            </span>
            {positionKey === "academyInternship"
              ? "მიღება დაწყებულია"
              : "ვაკანსია ღიაა"}
          </span>

          <h1
            style={caseOn}
            className="mt-3.5 text-2xl font-bold leading-tight text-[#fff] sm:text-3xl max-w-3xl"
          >
            {position.title}
          </h1>

          <div className="flex flex-wrap gap-2.5 mt-5">
            {metaItems.map((m, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-bold rounded-full text-[#e9edf5] bg-[#ffffff12] border border-[#ffffff1f]"
              >
                <span className="text-lingo-green">{m.icon}</span>
                {m.value}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <ApplyButton />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl px-5 mx-auto py-12 sm:py-16 flex flex-col gap-10">
        {positionVideos[positionKey] && (
          <CourseVideo
            videoId={positionVideos[positionKey]!}
            rounded="rounded-[22px]"
          />
        )}

        {position.intro && (
          <p className="text-[17px] leading-relaxed text-lingo-black sm:text-lg">
            {position.intro}
          </p>
        )}

        {position.sections ? (
          position.sections.map((section) => (
            <Section
              key={section.heading}
              icon={<FaListCheck />}
              heading={section.heading}
              items={section.items}
            />
          ))
        ) : (
          <>
            {position.obligations && (
              <Section
                icon={<FaListCheck />}
                heading="ძირითადი მოვალეობებია"
                items={position.obligations}
              />
            )}

            {position.extraText && (
              <p className="text-[15px] leading-relaxed text-[#5f6b74] -mt-4">
                {position.extraText}
              </p>
            )}

            {position.workHours && (
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-[#f4f6f9] border border-[#e7ebf0]">
                <span className="flex items-center justify-center w-10 h-10 text-[#fff] rounded-xl shrink-0 bg-gradient-to-br from-[#3bb85e] to-[#2f9e4d]">
                  <FaClock />
                </span>
                <div>
                  <h2 style={caseOn} className="font-bold text-lingo-black">
                    სამუშაო გრაფიკი
                  </h2>
                  <p className="mt-1 text-[15px] leading-relaxed text-[#3f4a52]">
                    {position.workHours}
                  </p>
                </div>
              </div>
            )}

            {position.requirements && (
              <Section
                icon={<FaCircleCheck />}
                heading="თქვენგან ვითხოვთ, რომ"
                items={position.requirements}
              />
            )}

            {position.offer && (
              <Section
                icon={<FaGift />}
                heading="ჩვენი გუნდი გთავაზობთ"
                items={position.offer}
                tone="green"
              />
            )}

            {position.salary && (
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-[#eaf6ee] border border-[#cfead8]">
                <span className="flex items-center justify-center w-10 h-10 text-[#fff] rounded-xl shrink-0 bg-gradient-to-br from-[#3bb85e] to-[#2f9e4d]">
                  <FaCoins />
                </span>
                <p className="text-[15px] leading-relaxed text-lingo-black">
                  {position.salary}
                </p>
              </div>
            )}

            {positionKey === "contentCreator" && (
              <Section
                icon={<FaCircleCheck />}
                heading="შერჩევა არის სამეტაპიანი"
                items={[
                  "შევსებული ფორმების გადარჩევა",
                  "პრაქტიკული დავალების შესრულება",
                  "ონლაინ გასაუბრება",
                ]}
              />
            )}
          </>
        )}

        {position.closingText ? (
          <p className="text-[16px] leading-relaxed text-lingo-black">
            {position.closingText}
          </p>
        ) : (
          <p className="text-[16px] leading-relaxed text-lingo-black">
            {positionKey === "contentCreator" || positionKey === "administrator"
              ? "თუ ხარ მოტივირებული და ამ ვაკანსიით დაინტერესებული, შემოგვიერთდი ჩვენს გუნდში და გახდი ჩვენი გუნდის წარმატების ისტორიის განუყოფელი ნაწილი!"
              : "თუ ხარ მოტივირებული მასწავლებელი და ამ ვაკანსიით დაინტერესებული, შემოგვიერთდი და გახდი ჩვენი გუნდისა და შენი მომავალი მოსწავლეების წარმატების ისტორიის განუყოფელი ნაწილი!"}
          </p>
        )}

        {/* Closing CTA card */}
        <div className="flex flex-col items-center gap-4 p-8 text-center rounded-[24px] bg-[linear-gradient(150deg,#1e2a48,#151d33)]">
          <h3
            style={caseOn}
            className="text-xl font-bold text-[#fff] sm:text-2xl"
          >
            მზად ხარ შემოგვიერთდე?
          </h3>
          <p className="text-[14px] text-[#aab2c2] max-w-md">
            შეავსე განაცხადი რამდენიმე წუთში — ჩვენ მალევე დაგიკავშირდებით.
          </p>
          <ApplyButton block />
        </div>
      </div>
    </div>
  );
}

export default PositionDetails;
