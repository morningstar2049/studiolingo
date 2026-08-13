import Contact from "./Contact/Contact";
import Corporate from "./Corporate/Corporate";
import Courses from "./Courses/Courses";
import MainBanner from "./MainBanner";
import Reviews from "./Reviews/Reviews";

function MainContent() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-[calc(100vh-88px)] sm:h-[calc(100vh-154px)] relative -z-10">
        <MainBanner />
      </div>
      <Courses />
      <Corporate />
      <Reviews />
      <Contact />
    </div>
  );
}

export default MainContent;
