import type { Metadata } from "next";
import LevelTestWrapper from "./LevelTestWrapper";
import { loadLevelTest } from "@/lib/levelTest";

export const revalidate = 60;

const title = "ინგლისურის დონის ონლაინ ტესტი (A1–C1) | Studio Lingo";
const description =
  "გაიარე ინგლისურის უფასო ონლაინ ტესტი და რამდენიმე წუთში გაიგე შენი დონე A1-დან C1-მდე — Studio Lingo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/language-test" },
  openGraph: { title, description, images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

export default async function Page() {
  const { questions, texts } = await loadLevelTest();

  return (
    <div className="p-4 flex items-center justify-center h-auto sm:h-[calc(100vh-84px)]">
      <LevelTestWrapper
        levelTest={questions}
        texts={texts}
      />
    </div>
  );
}
