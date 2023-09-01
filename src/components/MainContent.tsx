import Courses from "./Courses/Courses";
import MainBanner from "./MainBanner";

function MainContent() {
  return (
    <div className="flex flex-col ">
      <div className="w-full h-[calc(100dvh-88px)] sm:h-[calc(100dvh-154px)] relative -z-10">
        <MainBanner />
      </div>
      <Courses />
    </div>
  );
}

export default MainContent;
