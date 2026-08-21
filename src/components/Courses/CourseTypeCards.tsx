import { courses } from "./coursesData";
import CourseCard from "./CourseCard";

export default function CourseTypeCards() {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
      {courses.map((c, i) => (
        <CourseCard key={c.title} course={c} index={i} />
      ))}
    </div>
  );
}
