import Image from "next/image";
import CorporateCoursesAccordion from "./CorporateCoursesAccordion";
import PartnersBanner from "./PartnersBanner";

function Corporate() {
  return (
    <div
      id="corporate"
      className="flex flex-col mt-4 mb-8 gap-16 sm:gap-24 scroll-m-[85px] sm:scroll-m-40"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-8 sm:flex-row sm:items-stretch sm:gap-10">
        <CorporateCoursesAccordion />
        <div className="hidden sm:block relative flex-1 self-stretch min-h-[420px] overflow-hidden rounded-[22px] shadow-[0_24px_54px_-22px_rgba(41,49,66,0.28)]">
          <Image
            src="/corporate-pic.png"
            alt="კორპორაციული ინგლისურის ტრენინგი ბიზნესისთვის"
            fill
            className="object-cover"
            sizes="(min-width:640px) 50vw, 1px"
          />
        </div>
      </div>
      <PartnersBanner />
    </div>
  );
}

export default Corporate;
