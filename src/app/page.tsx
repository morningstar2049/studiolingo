import MainContent from "@/components/MainContent";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { coursesSchema } from "@/lib/schema";
import type { Metadata } from "next";

const title = "ინგლისურის სკოლა თბილისში და ონლაინ | Studio Lingo";
const description =
  "სტუდიო ლინგო — #1 ინგლისურის სკოლა თბილისში (საბურთალო) და ონლაინ. ინგლისურის კურსები ზრდასრულებსა და მოზარდებისთვის, A1-C1 დონეები, მცირე ჯგუფები, პრაქტიკა ბრიტანელ მასწავლებელთან.";
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
