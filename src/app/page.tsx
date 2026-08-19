import MainContent from "@/components/MainContent";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { coursesSchema } from "@/lib/schema";
import type { Metadata } from "next";

const title = "ინგლისური ენის კურსები თბილისში და ონლაინ | Studio Lingo";
const description =
  "ინგლისურის კურსები ზრდასრულთათვის და მოზარდებისთვის — საბურთალოზე და ონლაინ. A1-C1 დონეები, მცირე ჯგუფები, პრაქტიკული მეთოდები. გაიარეთ ონლაინ ენის ტესტი.";
const image = "/og-logo.png";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default async function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }}
      />
      <MainContent />
      <ScrollToTopButton />
    </main>
  );
}
