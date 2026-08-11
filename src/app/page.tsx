import MainContent from "@/components/MainContent";
import type { Metadata } from "next";

const title = "ინგლისური ენის კურსები თბილისში და ონლაინ | Studio Lingo";
const description =
  "ინგლისურის კურსები ზრდასრულთათვის და მოზარდებისთვის — საბურთალოზე და ონლაინ. A1-C1 დონეები, მცირე ჯგუფები, პრაქტიკული მეთოდები. გაიარეთ ონლაინ ენის ტესტი.";
const image = "https://i.ibb.co/f8s59ww/page-Thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
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
      <MainContent />
    </main>
  );
}
