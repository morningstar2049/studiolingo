import { AiOutlineArrowRight } from "react-icons/ai";

import { SITE_URL } from "@/lib/schema";
import { getReviews, type Review } from "@/sanity/queries";
import { fallbackReviews } from "./reviewsData";

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/jjNmMYDcq6hFzN1VA";

type ReviewItem = Pick<Review, "author" | "rating" | "text">;

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span
      aria-label={`${filled}/5`}
      style={{ letterSpacing: "1px", fontSize: "14px", lineHeight: 1 }}
    >
      <span style={{ color: "#fbbc04" }}>{"★".repeat(filled)}</span>
      <span style={{ color: "#dadce0" }}>{"★".repeat(5 - filled)}</span>
    </span>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="break-inside-avoid mb-6 bg-[#fff] rounded-xl p-6 shadow-[0_10px_24px_-8px_rgba(41,49,66,0.18)]">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-11 h-11 text-lg font-bold rounded-full bg-lingo-green text-[#fff] shrink-0">
          {review.author.trim().charAt(0)}
        </div>
        <div>
          <div className="font-bold text-lingo-black">{review.author}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Stars rating={review.rating} />
            <span className="text-xs text-[#6b7280]">· Google-ზე</span>
          </div>
        </div>
      </div>
      <p className="text-[15px] leading-relaxed text-lingo-black whitespace-pre-line">
        {review.text}
      </p>
    </div>
  );
}

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
      className="flex flex-col mt-[200px] scroll-m-[150px] sm:scroll-m-[200px]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2
        style={{ fontFeatureSettings: "'case' on" }}
        className="mx-auto mb-12 text-2xl font-bold text-lingo-green sm:text-3xl"
      >
        შეფასებები
      </h2>

      <div className="w-full max-w-6xl px-5 mx-auto columns-1 gap-6 sm:columns-2 lg:columns-3">
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
