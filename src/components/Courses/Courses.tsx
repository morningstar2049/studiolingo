import CoursesCarousel from "./CoursesCarousel";
import CoursesIntro from "./CoursesIntro";
import RevealOnScroll from "@/components/RevealOnScroll";

function Courses() {
  return (
    <div className="flex flex-col gap-48">
      <div
        id="courses"
        className="flex flex-col items-center gap-6 px-4 sm:gap-16 scroll-m-[85px] sm:scroll-m-[145px]"
      >
        <CoursesIntro />

        <div className="w-full" style={{ fontFeatureSettings: "'case' on" }}>
          <RevealOnScroll className="mb-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl text-lingo-black">
              ჩვენი ინგლისურის <span className="text-lingo-green">კურსები</span>
            </h2>
          </RevealOnScroll>

          <CoursesCarousel />
        </div>
      </div>
    </div>
  );
}

export default Courses;
