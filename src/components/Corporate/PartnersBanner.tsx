import PartnersSliderCarousel from "./PartnersSliderCarousel";

function PartnersBanner() {
  return (
    <div className="flex flex-col mt-12">
      <h2
        style={{ fontFeatureSettings: "'case' on" }}
        className="mx-auto mb-20 text-2xl font-bold text-lingo-green sm:text-3xl"
      >
        პარტნიორი კომპანიები
      </h2>
      <PartnersSliderCarousel />
    </div>
  );
}

export default PartnersBanner;
