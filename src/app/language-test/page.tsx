import type { Metadata } from "next";
import LevelTestWrapper from "./LevelTestWrapper";

const title = "ინგლისურის დონის ონლაინ ტესტი (A1–C1) | Studio Lingo";
const description =
  "გაიარე ინგლისურის უფასო ონლაინ ტესტი და რამდენიმე წუთში გაიგე შენი დონე A1-დან C1-მდე — Studio Lingo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/language-test" },
  openGraph: { title, description, images: ["/og-image.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return null;
  }
  const response = await fetch(`${apiUrl}/api/lang-test`, {
    cache: "no-cache",
  });
  const { levelTest }: TLevelTest = await response.json();

  return (
    <div className="p-4 flex items-center justify-center h-auto sm:h-[calc(100vh-110px)]">
      <LevelTestWrapper levelTest={levelTest} />
    </div>
  );
}
