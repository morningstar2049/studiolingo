/* eslint-disable @next/next/no-img-element */
import { FaLocationDot, FaBriefcase, FaCoins } from "react-icons/fa6";
import { positionData } from "../positionData";
import Button from "@/components/Button";
import RevealOnScroll from "@/components/RevealOnScroll";

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

const greenHeading = "text-xl font-bold text-lingo-green";
const headingStyle = { fontFeatureSettings: "'case' on" } as const;

function PositionDetails({ positionKey }: TPositionDetailsProps) {
  const position = positionData[positionKey];

  return (
    <div className="bg-[whitesmoke] rounded-md lg:p-10 p-5 flex flex-col gap-8 w-full lg:w-[70%]">
      <h1 style={headingStyle} className="text-3xl font-bold text-lingo-black">
        {position.title}
      </h1>
      <div className="flex flex-wrap gap-5 md:flex-nowrap">
        <div className="flex items-center gap-2">
          <FaLocationDot className="text-lingo-green" />
          <p>{position.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaBriefcase className="text-lingo-green" />
          <p>{position.time}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaCoins className="text-lingo-green" />
          <p>{position.salaryType}</p>
        </div>
      </div>
      {position.intro && (
        <p className="text-base sm:text-lg leading-relaxed text-lingo-black">
          {position.intro}
        </p>
      )}

      {position.sections ? (
        position.sections.map((section) => (
          <div key={section.heading}>
            <h2 style={headingStyle} className={greenHeading}>
              {section.heading}
            </h2>
            <ul className="p-5 list-disc">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <>
          <div>
            <h2 style={headingStyle} className={greenHeading}>
              ძირითადი მოვალეობებია:
            </h2>
            <ul className="p-5 list-disc">
              {position.obligations?.map((obligation, i) => (
                <li key={i}>{obligation}</li>
              ))}
            </ul>
          </div>
          <p>{position.extraText}</p>
          {position.workHours ? (
            <div>
              <h2 style={headingStyle} className={greenHeading}>
                სამუშაო გრაფიკი:
              </h2>
              <p className="py-5">{position.workHours}</p>
            </div>
          ) : null}
          <div>
            <h2 style={headingStyle} className={greenHeading}>
              თქვენგან ვითხოვთ, რომ:
            </h2>
            <ul className="p-5 list-disc">
              {position.requirements?.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
          <RevealOnScroll className="justify-center hidden sm:flex">
            <img
              src="/career-pic.jpeg"
              alt="career"
              className="object-contain rounded-2xl w-[700px]"
            />
          </RevealOnScroll>
          <div>
            <h2 style={headingStyle} className={greenHeading}>
              ჩვენი გუნდი გთავაზობთ:
            </h2>
            <ul className="p-5 list-disc">
              {position.offer?.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
          <p>{position.salary}</p>
          {positionKey === "contentCreator" && (
            <div>
              <h2 style={headingStyle} className={greenHeading}>
                შერჩევა არის სამეტაპიანი:
              </h2>
              <ul className="p-5 list-disc">
                <li>შევსებული ფორმების გადარჩევა</li>
                <li>პრაქტიკული დავალების შესრულება</li>
                <li>ონლაინ გასაუბრება.</li>
              </ul>
            </div>
          )}
        </>
      )}

      {position.closingText ? (
        <p>{position.closingText}</p>
      ) : positionKey === "contentCreator" || positionKey === "administrator" ? (
        <p>
          თუ ხარ მოტივირებული და ამ ვაკანსიით დაინტერესებული, შემოგვიერთდი ჩვენს
          გუნდში და გახდი ჩვენი გუნდის წარმატების ისტორიის განუყოფელი ნაწილი!
        </p>
      ) : (
        <p>
          თუ ხარ მოტივირებული მასწავლებელი და ამ ვაკანსიით დაინტერესებული,
          შემოგვიერთდი და გახდი ჩვენი გუნდისა და შენი მომავალი მოსწავლეების
          წარმატების ისტორიის განუყოფელი ნაწილი!
        </p>
      )}

      <RevealOnScroll stable>
        <a href={position.googleFormLink} target="_blank">
          <Button extraStyles="shadow-lg shadow-lingo-green/25">
            განაცხადის გაგზავნა
          </Button>
        </a>
      </RevealOnScroll>
    </div>
  );
}

export default PositionDetails;
