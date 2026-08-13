import Image from "next/image";
import AchievementsBar from "./AchievementsBar";
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
      <Image
        src="/banner-web.jpg"
        alt="Studio Lingo — ინგლისურის გაკვეთილი თბილისში"
        fill={true}
        priority
        className="hidden object-cover animate-appear sm:block object-[50%_35%]"
      />
      <Overlay />

      <div className="absolute inset-0 z-10 flex flex-col items-center px-4 text-center pt-[17%] pb-[9%] sm:pt-[9%] sm:pb-[2%] sm:justify-between">
        <h1 className="text-[#fff] font-bold text-lg sm:text-4xl tracking-[2px] max-w-4xl">
          ინგლისურის კურსები თბილისში და ონლაინ — ზრდასრულებისა და
          მოზარდებისთვის
        </h1>

        <AchievementsBar />
      </div>
    </>
  );
}

export default MainBanner;
