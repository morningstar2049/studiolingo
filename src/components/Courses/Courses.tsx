import CoursesAccordion from "./CoursesAccordion";
import IlikoMessage from "../IlikoMessage";

function Courses() {
  return (
    <div
      id="courses"
      className="scroll-m-[85px] sm:items-center sm:flex sm:scroll-m-[145px]"
    >
      <IlikoMessage />
      <CoursesAccordion />
    </div>
  );
}

export default Courses;
