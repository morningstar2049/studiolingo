import ReviewsSliderCarousel from "./ReviewsSliderCarousel";

function Reviews() {
  return (
    <div className="flex flex-col mt-[200px]">
      <h1
        style={{ fontFeatureSettings: "'case' on" }}
        className="mx-auto mb-20 text-2xl font-bold text-lingo-green sm:text-3xl"
      >
        შეფასებები
      </h1>
      <ReviewsSliderCarousel />
    </div>
  );
}

export default Reviews;
