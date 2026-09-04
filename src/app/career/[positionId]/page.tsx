import { Metadata } from "next";
import { notFound } from "next/navigation";
import PositionDetails, { TPositionKey } from "./components/PositionDetails";
import { positionData } from "./positionData";
import { vacancies } from "../components/VacanciesList";

type Params = Promise<{ positionId: string }>;

const isKnown = (id: string): id is TPositionKey => id in positionData;
const isOpen = (id: TPositionKey) => vacancies.some((v) => v.route === id);

export function generateStaticParams() {
  return Object.keys(positionData).map((positionId) => ({ positionId }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { positionId } = await params;
  if (!isKnown(positionId)) return {};

  const position = positionData[positionId];
  const open = isOpen(positionId);
  const title = open
    ? `${position.title} — ვაკანსია | Studio Lingo`
    : `${position.title} — ვაკანსია დახურულია | Studio Lingo`;
  const description = open
    ? `${position.title} — ვაკანსია სტუდიო ლინგოში (${position.location}). გაეცანი მოვალეობებს, მოთხოვნებსა და პირობებს და გამოგზავნე განაცხადი.`
    : `${position.title} — ეს ვაკანსია ამჟამად დახურულია. იხილე სტუდიო ლინგოს მიმდინარე ვაკანსიები.`;

  return {
    title,
    description,
    alternates: { canonical: `/career/${positionId}` },
    // Closed positions stay reachable from old links but should not be indexed.
    robots: open ? undefined : { index: false, follow: true },
    openGraph: { title, description, images: [position.metaImageUrl] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [position.metaImageUrl],
    },
  };
}

async function page({ params }: { params: Params }) {
  const { positionId } = await params;
  if (!isKnown(positionId)) notFound();

  return isOpen(positionId) ? (
    <PositionDetails positionKey={positionId} />
  ) : (
    <div className="flex justify-center p-5 sm:p-9">
      <h1 className="text-lingo-green font-bold text-xl text-center h-[calc(100vh-200px)] flex items-center justify-center">
        ამჟამად მიმდინარე ვაკანსია დახურულია
      </h1>
    </div>
  );
}

export default page;
