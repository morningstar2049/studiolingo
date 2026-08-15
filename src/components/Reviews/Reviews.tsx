import { AiOutlineArrowRight } from "react-icons/ai";

import { SITE_URL } from "@/lib/schema";
import { getReviews, type Review } from "@/sanity/queries";
import { fallbackReviews } from "./reviewsData";
import ReviewCard from "./ReviewCard";
import RevealOnScroll from "../RevealOnScroll";

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/jjNmMYDcq6hFzN1VA";

type ReviewItem = Pick<Review, "author" | "rating" | "text">;

async function Reviews() {
  let list: ReviewItem[] = [];
  try {
    list = await getReviews();
  } catch {
    list = [];
  }
  if (list.length === 0) list = fallbackReviews;

  const avg =
    list.reduce((sum, r) => sum + r.rating, 0) / (list.length || 1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": `${SITE_URL}/#localbusiness`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: list.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: list.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.text,
    })),
  };

  return (
    <div
      id="reviews"
      className="flex flex-col mt-16 scroll-m-[150px] sm:scroll-m-[200px]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealOnScroll className="mx-auto mb-12">
        <h2
          style={{ fontFeatureSettings: "'case' on" }}
          className="text-2xl font-bold text-lingo-green sm:text-3xl"
        >
          შეფასებები
        </h2>
      </RevealOnScroll>

      <div className="grid items-start w-full max-w-6xl grid-cols-1 gap-6 px-5 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {list.map((review, i) => (
          <ReviewCard key={`${review.author}-${i}`} review={review} />
        ))}
      </div>

      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center self-center gap-2 px-6 py-3 mt-8 font-bold transition-opacity rounded-xl text-lingo-green ring-1 ring-lingo-green hover:opacity-80"
      >
        ნახე ყველა შეფასება Google-ზე
        <AiOutlineArrowRight className="shrink-0" />
      </a>
    </div>
  );
}

export default Reviews;
