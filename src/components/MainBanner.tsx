import Image from "next/image";
import AchievementsBar from "./AchievementsBar";
import BannerHeadline from "./BannerHeadline";
import HeroSlideshow from "./HeroSlideshow";
import Overlay from "./Overlay";

function MainBanner() {
  return (
    <>
      <Image
        src="/mobile-banner.png"
        alt="Studio Lingo — ინგლისურის გაკვეთილი"
        fill={true}
        objectFit="cover"
        className="block animate-appear sm:hidden"
      />
      <HeroSlideshow />
      <Overlay />

      <div className="absolute inset-0 z-10 flex flex-col items-center px-2 sm:px-4 text-center pt-[17%] pb-[9%] sm:pt-[9%] sm:pb-[2%] sm:justify-between">
        <BannerHeadline />

        <AchievementsBar />
      </div>
    </>
  );
}

export default MainBanner;
