import RevealOnScroll from "../RevealOnScroll";
import TeamSliderCarousel from "./TeamSliderCarousel";

function TeamBanner() {
  return (
    <div className="flex flex-col mt-12">
      <RevealOnScroll className="mx-auto mb-20">
        <h1
          style={{ fontFeatureSettings: "'case' on" }}
          className="text-2xl font-bold text-lingo-green sm:text-3xl"
        >
          ჩვენი გუნდი
        </h1>
      </RevealOnScroll>
      <TeamSliderCarousel />
    </div>
  );
}

export default TeamBanner;
