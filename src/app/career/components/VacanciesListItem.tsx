import Link from "next/link";
import { BiTimeFive, BiWallet } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";

export type VacanciesListItemProps = {
  position: string;
  time: string;
  location: string;
  salary: string;
  route: string;
};

function VacanciesListItem({
  position,
  location,
  time,
  salary,
  route,
}: VacanciesListItemProps) {
  return (
    <div className="bg-[whitesmoke] lg:w-[70%] w-full flex flex-col gap-8 lg:gap-0 items-center p-5 rounded-lg shadow-md lg:flex-row lg:shadow-lg justify-evenly lg:justify-around">
      <Link
        className="font-bold p-2 sm:w-[25%] w-[95%] rounded-lg text-base text-center bg-lingo-green text-[#fff]"
        href={`/career/${route}`}
      >
        {position}
      </Link>
      <div className="flex flex-wrap items-center gap-5 md:flex-nowrap">
        <div className="flex gap-2">
          <IoLocationOutline />
          <p>{location}</p>
        </div>
        <div className="flex gap-2">
          <BiTimeFive />
          <p>{time}</p>
        </div>
        <div className="flex gap-2">
          <BiWallet />
          <p>{salary}</p>
        </div>
      </div>
    </div>
  );
}

export default VacanciesListItem;
