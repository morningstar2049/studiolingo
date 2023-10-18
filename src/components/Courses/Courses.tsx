import CoursesAccordion from "./CoursesAccordion";
import IlikoMessage from "../IlikoMessage";
import YoutubeVideo from "../YoutubeVideo";

function Courses() {
  return (
    <div className="flex flex-col gap-48">
      <div
        id="courses"
        className="scroll-m-[85px] sm:items-center sm:flex sm:scroll-m-[145px]"
      >
        <IlikoMessage />
        <CoursesAccordion />
      </div>

      <YoutubeVideo src="https://www.youtube.com/embed/cFNGpLMF5nQ" />
    </div>
  );
}

export default Courses;
