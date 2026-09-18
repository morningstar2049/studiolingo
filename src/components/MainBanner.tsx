import Image from "next/image";
import AchievementsBar, { FALLBACK_STATS, type Stat } from "./AchievementsBar";
import BannerHeadline from "./BannerHeadline";
import HeroSlideshow from "./HeroSlideshow";
import {
  FALLBACK_HEADLINE,
  FALLBACK_HERO_SLIDES,
  HeroProvider,
  type HeroSlide,
} from "./HeroContext";
import Overlay from "./Overlay";
import { getHomeBanner } from "@/sanity/queries";
import { urlForImage } from "@/sanity/client";

const FALLBACK_MOBILE = {
  src: "/mobile-banner.png",
  alt: "Studio Lingo — ინგლისურის გაკვეთილი",
  position: "50% 50%",
};

const hotspotPosition = (h?: { x: number; y: number }) =>
  h ? `${Math.round(h.x * 100)}% ${Math.round(h.y * 100)}%` : "50% 50%";

// Banner photos, headlines and the achievements bar come from Sanity
// ("მთავარი ბანერი", "მიღწევების ზოლი"); each falls back to the built-in
// content when missing or when the dataset can't be reached.
async function loadBanner() {
  const data = await getHomeBanner();
  const hero = data?.hero;

  const slides: HeroSlide[] =
    hero?.slides
      ?.filter((s) => s.image?.asset)
      .map((s) => ({
        src: urlForImage(s.image!).width(2560).url(),
        alt: s.alt || "",
        caption: s.caption?.trim() || null,
        captionWrap: !!s.captionWrap,
        position: hotspotPosition(s.image!.hotspot),
      })) ?? [];

  const mobile = hero?.mobileImage?.asset
    ? {
        src: urlForImage(hero.mobileImage).width(1600).url(),
        alt: hero.mobileAlt || FALLBACK_MOBILE.alt,
        position: hotspotPosition(hero.mobileImage.hotspot),
      }
    : FALLBACK_MOBILE;

  const stats: Stat[] =
    data?.stats?.length === 3
      ? data.stats.map((s) => ({
          value: s.value,
          decimals: 0,
          group: !!s.group,
          suffix: s.suffix ?? "",
          label: s.label,
          shortLabel: s.shortLabel || undefined,
        }))
      : FALLBACK_STATS;

  return {
    headline: hero?.headline?.trim() || FALLBACK_HEADLINE,
    slides: slides.length ? slides : FALLBACK_HERO_SLIDES,
    mobile,
    stats,
  };
}

async function MainBanner() {
  const { headline, slides, mobile, stats } = await loadBanner();

  return (
    <HeroProvider slides={slides} headline={headline}>
      <Image
        src={mobile.src}
        alt={mobile.alt}
        fill={true}
        style={{ objectFit: "cover", objectPosition: mobile.position }}
        className="block animate-appear sm:hidden"
      />
      <HeroSlideshow />
      <Overlay />

      <div className="absolute inset-0 z-10 flex flex-col items-center px-2 sm:px-4 text-center pt-[17%] pb-[9%] sm:pt-[9%] sm:pb-[2%] sm:justify-between">
        <BannerHeadline />

        <AchievementsBar stats={stats} />
      </div>
    </HeroProvider>
  );
}

export default MainBanner;
