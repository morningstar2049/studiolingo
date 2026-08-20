import { AiOutlineArrowRight } from "react-icons/ai";
import { getReviews, type Review } from "@/sanity/queries";
import { fallbackReviews } from "@/components/Reviews/reviewsData";
import ReviewCard from "@/components/Reviews/ReviewCard";
import RevealOnScroll from "@/components/RevealOnScroll";

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/jjNmMYDcq6hFzN1VA";

type ReviewItem = Pick<Review, "author" | "rating" | "text">;

// Reviews shown at the bottom of a course page, selected by author name so the
// trio stays correct regardless of the underlying review order.
export default async function CourseReviews({ authors }: { authors: string[] }) {
  let list: ReviewItem[] = [];
  try {
    list = await getReviews();
  } catch {
    list = [];
  }
  if (list.length === 0) list = fallbackReviews;
  if (list.length === 0) return null;

  const picked = authors
    .map((name) => list.find((r) => r.author.trim() === name.trim()))
    .filter((r): r is ReviewItem => Boolean(r));
  if (picked.length === 0) return null;

  return (
    <section
      className="max-w-6xl px-5 mx-auto mt-16"
      style={{ fontFeatureSettings: "'case' on" }}
    >
      <RevealOnScroll className="mb-8">
        <h2 className="text-2xl font-bold text-center sm:text-3xl text-lingo-black">
          მოსწავლეების <span className="text-lingo-green">შეფასებები</span>
        </h2>
      </RevealOnScroll>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {picked.map((review, i) => (
          <ReviewCard key={`${review.author}-${i}`} review={review} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 px-6 py-3 font-bold transition-opacity rounded-xl text-lingo-green ring-1 ring-lingo-green hover:opacity-80"
        >
          ნახე ყველა შეფასება Google-ზე
          <AiOutlineArrowRight className="shrink-0" />
        </a>
      </div>
    </section>
  );
}
