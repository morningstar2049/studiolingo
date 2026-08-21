import type { Metadata } from "next";
import ContentHero from "@/components/Content/ContentHero";
import PlatformGrid from "@/components/Content/PlatformGrid";
import YoutubeShowcase from "@/components/Content/YoutubeShowcase";

const title = "კონტენტი — #1 ინგლისური სოციალურ ქსელებში | Studio Lingo";
const description =
  "Studio Lingo ქმნის საქართველოში ყველაზე მრავალფეროვან და სახალისო ინგლისურ ვიდეო კონტენტს — 300 000+ გამომწერი YouTube-ზე, Instagram-ზე, TikTok-სა და Facebook-ზე.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ინგლისური კონტენტი",
    "ინგლისური YouTube",
    "Studio Lingo სოციალური ქსელები",
    "ინგლისურის სწავლა ვიდეოებით",
    "ინგლისური Instagram TikTok",
    "სტუდიო ლინგო",
  ],
  alternates: { canonical: "/content" },
  openGraph: { title, description, type: "website", images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

export default function ContentPage() {
  return (
    <>
      <ContentHero />
      <main className="bg-[#fff]">
        <PlatformGrid />
        <YoutubeShowcase />
      </main>
    </>
  );
}
