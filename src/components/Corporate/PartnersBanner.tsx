import RevealOnScroll from "../RevealOnScroll";
import PartnersSliderCarousel from "./PartnersSliderCarousel";

function PartnersBanner() {
  return (
    <div className="flex flex-col mt-12">
      <RevealOnScroll className="mx-auto mb-20">
        <h2
          style={{ fontFeatureSettings: "'case' on" }}
          className="text-2xl font-bold text-lingo-green sm:text-3xl"
        >
          პარტნიორი კომპანიები
        </h2>
      </RevealOnScroll>
      <PartnersSliderCarousel />
    </div>
  );
}

export default PartnersBanner;
