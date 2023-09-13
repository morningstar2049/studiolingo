import Corporate from "./Corporate/Corporate";
import PartnersBanner from "./Corporate/PartnersBanner";
import Courses from "./Courses/Courses";
import MainBanner from "./MainBanner";

function MainContent() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-[calc(100vh-88px)] sm:h-[calc(100vh-154px)] relative -z-10">
        <MainBanner />
      </div>
      <Courses />
      <Corporate />
    </div>
  );
}

export default MainContent;
