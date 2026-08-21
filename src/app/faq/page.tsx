import type { Metadata } from "next";
import FaqHero from "@/components/FAQ/FaqHero";
import FaqAccordion from "@/components/FAQ/FaqAccordion";

const title = "ხშირად დასმული კითხვები | Studio Lingo";
const description =
  "პასუხები ხშირად დასმულ კითხვებზე Studio Lingo-ს ინგლისურის კურსების, უნიკალური სწავლების მეთოდების, რეგისტრაციისა და სასწავლო მასალების შესახებ.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ხშირად დასმული კითხვები",
    "Studio Lingo FAQ",
    "ინგლისურის კურსები კითხვები",
    "ინგლისურის სწავლის მეთოდები",
    "სტუდიო ლინგო",
  ],
  alternates: { canonical: "/faq" },
  openGraph: { title, description, type: "website", images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <main className="pt-10 pb-24 bg-[#eef7f1] -mb-20">
        <div className="max-w-3xl px-5 mx-auto">
          <FaqAccordion />
        </div>
      </main>
    </>
  );
}
