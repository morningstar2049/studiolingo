/* eslint-disable @next/next/no-img-element */
import { BiTimeFive, BiWallet } from "react-icons/bi";
import { positionData } from "../positionData";
import { IoLocationOutline } from "react-icons/io5";
import Button from "@/components/Button";
import Image from "next/image";

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
      <h1 className="text-3xl font-bold text-lingo-green">{position.title}</h1>
      <div className="flex flex-wrap gap-5 md:flex-nowrap ">
        <div className="flex gap-2">
          <IoLocationOutline />
          <p>{position.location}</p>
        </div>
        <div className="flex gap-2">
          <BiTimeFive />
          <p>{position.time}</p>
        </div>
        <div className="flex gap-2">
          <BiWallet />
          <p>{position.salaryType}</p>
        </div>
      </div>
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
      <div className="hidden sm:flex justify-center">
        <img
          src="/career-pic.jpeg"
          alt="career"
          className="object-contain rounded-2xl w-[700px]"
        />
      </div>
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
