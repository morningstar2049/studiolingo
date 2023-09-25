import { BiTimeFive, BiWallet } from "react-icons/bi";
import { positionData } from "../positionData";
import { IoLocationOutline } from "react-icons/io5";
import Button from "@/components/Button";
import Link from "next/link";

export type TPositionKey =
  | "englishTeacher"
  | "germanTeacher"
  | "russianTeacher"
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
            შერჩევა არის ორეტაპიანი:
          </h2>
          <ul className="p-5 list-disc">
            <li>რეზიუმეების გადარჩევა</li>
            <li>გასაუბრება და პრაქტიკული დავალება.</li>
          </ul>
        </div>
      )}
      <a href={position.googleFormLink} target="_blank">
        <Button>განაცხადის გაგზავნა</Button>
      </a>
    </div>
  );
}

export default PositionDetails;
