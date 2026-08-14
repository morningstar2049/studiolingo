import CoursesAccordion from "./CoursesAccordion";
import CoursesIntro from "./CoursesIntro";

function Courses() {
  return (
    <div className="flex flex-col gap-48">
      <div
        id="courses"
        className="flex flex-col items-center gap-16 px-4 scroll-m-[85px] sm:scroll-m-[145px]"
      >
        <CoursesIntro />
        <CoursesAccordion />
      </div>
    </div>
  );
}

export default Courses;
