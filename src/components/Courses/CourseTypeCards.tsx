import { getCourseCardList } from "./courseCards";
import CourseCard from "./CourseCard";

export default async function CourseTypeCards() {
  const courses = await getCourseCardList();
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
      {courses.map((c, i) => (
        <CourseCard key={c.title} course={c} index={i} headingTag="h2" />
      ))}
    </div>
  );
}
