import { courses as fallbackCourses, type Course } from "./coursesData";
import { getCourseCards } from "@/sanity/queries";

const slugOf = (c: Course) => c.slug.replace("/courses/", "");

// Course cards for /courses and the homepage carousel. Texts and order come
// from Sanity; colours and illustrations stay in coursesData. Falls back to the
// hard-coded cards when Sanity has no courses or can't be reached.
export async function getCourseCardList(): Promise<Course[]> {
  const res = await getCourseCards();
  if (!res || res.total === 0) return fallbackCourses;

  const bySlug = new Map(res.cards.map((c) => [c.slug, c]));
  return fallbackCourses
    .map((c, index) => {
      const s = bySlug.get(slugOf(c));
      const chips =
        s?.chips?.length === 2 ? (s.chips as [string, string]) : c.chips;
      return {
        card: s
          ? { ...c, title: s.title || c.title, chips, desc: s.cardText || c.desc }
          : c,
        order: s?.order ?? 1000 + index,
      };
    })
    .sort((a, b) => a.order - b.order)
    .map((x) => x.card);
}
