import type { Metadata } from "next";
import CoursesHeader from "@/components/Courses/CoursesHeader";
import CourseTypeCards from "@/components/Courses/CourseTypeCards";
import CoursesAbout from "@/components/Courses/CoursesAbout";

const title = "ინგლისურის კურსები — ინდივიდუალური და ჯგუფური | Studio Lingo";
const description =
  "აირჩიე ინგლისურის კურსი: ინდივიდუალური ან ჯგუფური, ონლაინ თუ ადგილზე, მოზარდებისთვის — ყველა კურსი მორგებულია ქართველ მოსწავლეზე.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/courses" },
  openGraph: { title, description, images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

export default function CoursesPage() {
  return (
    <main className="max-w-6xl px-5 pt-10 pb-20 mx-auto">
      <CoursesHeader />
      <CourseTypeCards />
      <CoursesAbout />
    </main>
  );
}
