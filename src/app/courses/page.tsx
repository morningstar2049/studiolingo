import type { Metadata } from "next";
import CoursesHeader from "@/components/Courses/CoursesHeader";
import CourseTypeCards from "@/components/Courses/CourseTypeCards";
import CoursesAbout from "@/components/Courses/CoursesAbout";

const title = "ინგლისურის კურსები — ინდივიდუალური და ჯგუფური | Studio Lingo";
const description =
  "ინგლისურის კურსები თბილისში და ონლაინ — ინდივიდუალური და ჯგუფური, სასაუბრო და ზოგადი, ზრდასრულებსა და მოზარდებისთვის. A1-C1 დონეები, მცირე ჯგუფები, პრაქტიკა ბრიტანელ მასწავლებელთან.";

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
