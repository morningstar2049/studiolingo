import Corporate from "./Corporate/Corporate";
import PartnersBanner from "./Corporate/PartnersBanner";
import Courses from "./Courses/Courses";
import MainBanner from "./MainBanner";
import Reviews from "./Reviews/Reviews";
import Team from "./Team/Team";

function MainContent() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-[calc(100vh-88px)] sm:h-[calc(100vh-154px)] relative -z-10">
        <MainBanner />
      </div>
      <Courses />
      <Corporate />
      <Team />
      <Reviews />
    </div>
  );
}

export default MainContent;
