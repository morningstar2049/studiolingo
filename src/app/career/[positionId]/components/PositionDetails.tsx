/* eslint-disable @next/next/no-img-element */
import { FaLocationDot, FaBriefcase, FaCoins } from "react-icons/fa6";
import { positionData } from "../positionData";
import Button from "@/components/Button";
import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

export type TPositionKey =
  | "englishTeacher"
  | "germanTeacher"
  | "chineseTeacher"
  | "contentCreator"
  | "administrator";

type TPositionDetailsProps = {
  positionKey: TPositionKey;
};

function PositionDetails({ positionKey }: TPositionDetailsProps) {
  const position = positionData[positionKey];

  return (
    <div className="bg-[whitesmoke] rounded-md lg:p-10 p-5 flex flex-col gap-8 w-full lg:w-[70%]">
      <h1
        style={{ fontFeatureSettings: "'case' on" }}
        className="text-3xl font-bold text-lingo-black"
      >
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
      <div>
        <h2 className="text-xl font-bold text-lingo-green">
          ძირითადი მოვალეობებია:
        </h2>
        <ul className="p-5 list-disc">
          {position.obligations.map((obligation, i) => (
            <li key={i}>{obligation}</li>
          ))}
        </ul>
      </div>
      <p>{position.extraText}</p>
      {position.workHours ? (
        <div>
          <h2 className="text-xl font-bold text-lingo-green">
            სამუშაო გრაფიკი:
          </h2>
          <p className="py-5">{position.workHours}</p>
        </div>
      ) : null}
      <div>
        <h2 className="text-xl font-bold text-lingo-green">
          თქვენგან ვითხოვთ, რომ:
        </h2>
        <ul className="p-5 list-disc">
          {position.requirements.map((req, i) => (
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
        <h2 className="text-xl font-bold text-lingo-green">
          ჩვენი გუნდი გთავაზობთ:
        </h2>
        <ul className="p-5 list-disc">
          {position.offer.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>
      <p>{position.salary}</p>
      {positionKey === "contentCreator" && (
        <div>
          <h2 className="text-xl font-bold text-lingo-green">
            შერჩევა არის სამეტაპიანი:
          </h2>
          <ul className="p-5 list-disc">
            <li>შევსებული ფორმების გადარჩევა</li>
            <li>პრაქტიკული დავალების შესრულება</li>
            <li>ონლაინ გასაუბრება.</li>
          </ul>
        </div>
      )}
      {positionKey === "contentCreator" || positionKey === "administrator" ? (
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
      <a href={position.googleFormLink} target="_blank">
        <Button>განაცხადის გაგზავნა</Button>
      </a>
    </div>
  );
}

export default PositionDetails;
