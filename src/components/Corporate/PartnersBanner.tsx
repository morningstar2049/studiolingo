import PartnersSliderCarousel from "./PartnersSliderCarousel";

function PartnersBanner() {
  return (
    <div className="flex flex-col mt-12">
      <h1
        style={{ fontFeatureSettings: "'case' on" }}
        className="mx-auto mb-20 text-2xl font-bold text-lingo-green sm:text-3xl"
      >
        პარტნიორი კომპანიები
      </h1>
      <PartnersSliderCarousel />
    </div>
  );
}

export default PartnersBanner;
