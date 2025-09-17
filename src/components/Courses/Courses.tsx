import CoursesAccordion from "./CoursesAccordion";
import IlikoMessage from "../IlikoMessage";
import YoutubeVideo from "../YoutubeVideo";

function Courses() {
  return (
    <div className="flex flex-col gap-48">
      <div id="courses" className="scroll-m-[85px] sm:flex sm:scroll-m-[145px]">
        <IlikoMessage />
        <CoursesAccordion />
      </div>
    </div>
  );
}

export default Courses;
