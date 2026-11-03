import type { Metadata } from "next";
import CoursesHeader from "@/components/Courses/CoursesHeader";
import CourseTypeCards from "@/components/Courses/CourseTypeCards";
import CoursesAbout from "@/components/Courses/CoursesAbout";
import CoursesIntroVideo, {
  FALLBACK_DESKTOP_ID,
  FALLBACK_MOBILE_ID,
} from "@/components/Courses/CoursesIntroVideo";
import { getCoursesPage } from "@/sanity/queries";
import { getYoutubeId } from "@/lib/youtube";

// Course cards and questions are edited in Sanity; refresh at most once a minute.
export const revalidate = 60;

const title = "ინგლისურის კურსები და ენის შესწავლა ნულიდან | Studio Lingo";
const description =
  "ინგლისურის კურსები თბილისში და ონლაინ — ინგლისური ენის შესწავლა ნულიდან, A1-დან C1-მდე. ჯგუფური და ინდივიდუალური, სასაუბრო და ზოგადი.";

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

export default async function CoursesPage() {
  // Intro video: edited in Sanity ("კურსების გვერდი"), code values as fallback.
  const page = await getCoursesPage();
  const showVideo = page?.videoVisible !== false;

  return (
    <main className="max-w-6xl px-5 pt-10 pb-20 mx-auto">
      <CoursesHeader />
      {showVideo && (
        <CoursesIntroVideo
          desktopId={getYoutubeId(page?.desktopVideo) ?? FALLBACK_DESKTOP_ID}
          mobileId={getYoutubeId(page?.mobileVideo) ?? FALLBACK_MOBILE_ID}
        />
      )}
      <CourseTypeCards />
      <CoursesAbout />
    </main>
  );
}
