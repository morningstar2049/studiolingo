"use client";
import { useState } from "react";
import ReviewCard from "./ReviewCard";

type ReviewItem = { author: string; rating: number; text: string };

const INITIAL_COUNT = 3;

// Shows the first few reviews and reveals the rest on "მეტის ნახვა". All cards
// stay in the DOM (hidden with CSS) so the review structured data and crawlers
// still see every review.
export default function ReviewsGrid({ reviews }: { reviews: ReviewItem[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="grid items-start w-full max-w-6xl grid-cols-1 gap-6 px-5 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <div
            key={`${review.author}-${i}`}
            className={!expanded && i >= INITIAL_COUNT ? "hidden" : ""}
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {reviews.length > INITIAL_COUNT && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          style={{ fontFeatureSettings: "'case' on" }}
          className="inline-flex items-center self-center gap-2 px-8 py-3 mt-10 font-bold text-[#fff] transition-all rounded-xl bg-lingo-green shadow-lg shadow-lingo-green/25 hover:bg-[#2f904d] hover:scale-[1.02]"
        >
          მეტის ნახვა
        </button>
      )}
    </>
  );
}
