import ImageWrapper from "../ImageWrapper";
import Image from "next/image";
import CorporateCoursesAccordion from "./CorporateCoursesAccordion";
import CorporateCoursesList from "./CorporateCoursesList";
import PartnersBanner from "./PartnersBanner";

function Corporate() {
  return (
    <div
      id="corporate"
      className="flex flex-col my-20 gap-5 sm:gap-[100px] scroll-m-40"
    >
      <PartnersBanner />
      <CorporateCoursesList />
      <div className="block sm:flex sm:justify-evenly sm:p-5">
        <CorporateCoursesAccordion />
        <div className="hidden sm:block relative h-[500px] w-[500px]">
          <Image
            src="/corporate-pic.png"
            alt="corporate"
            fill={true}
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Corporate;
