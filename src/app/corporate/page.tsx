import type { Metadata } from "next";
import CorporateHero from "@/components/Corporate/CorporateHero";
import Corporate from "@/components/Corporate/Corporate";
import { courseSchema, breadcrumbSchema } from "@/lib/schema";

const title = "კორპორაციული ინგლისური — ბიზნესისთვის | Studio Lingo";
const description =
  "კორპორაციული ინგლისურის კურსი კომპანიებისა და გუნდებისთვის — ზოგადი და სასაუბრო ინგლისურიდან ბიზნეს ლექსიკამდე, თქვენს სფეროზე მორგებული. Studio Lingo.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "კორპორაციული ინგლისური",
    "ბიზნეს ინგლისური",
    "ინგლისური კომპანიებისთვის",
    "ინგლისურის ტრენინგი ბიზნესისთვის",
    "Studio Lingo",
  ],
  alternates: { canonical: "/corporate" },
  openGraph: { title, description, images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

export default function CorporatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            courseSchema({
              name: "კორპორაციული ინგლისური",
              description,
              path: "/corporate",
              mode: "both",
            }),
            breadcrumbSchema([
              { name: "მთავარი", path: "/" },
              { name: "კორპორაციული ინგლისური", path: "/corporate" },
            ]),
          ]),
        }}
      />
      <CorporateHero />
      <main className="pb-16">
        <Corporate />
      </main>
    </>
  );
}
