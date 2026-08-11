import ReviewsSliderCarousel from "./ReviewsSliderCarousel";

function Reviews() {
  return (
    <div
      id="reviews"
      className="flex flex-col mt-[200px] scroll-m-[150px] sm:scroll-m-[200px]"
    >
      <h2
        style={{ fontFeatureSettings: "'case' on" }}
        className="mx-auto mb-20 text-2xl font-bold text-lingo-green sm:text-3xl"
      >
        შეფასებები
      </h2>
      <ReviewsSliderCarousel />
    </div>
  );
}

export default Reviews;
