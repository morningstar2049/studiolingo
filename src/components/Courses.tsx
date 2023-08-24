import CoursesAccordion from "./CoursesAccordion";
import IlikoMessage from "./IlikoMessage";

function Courses() {
  return (
    <div id="courses" className="items-center justify-around sm:flex">
      <IlikoMessage />
      <CoursesAccordion />
    </div>
  );
}

export default Courses;
