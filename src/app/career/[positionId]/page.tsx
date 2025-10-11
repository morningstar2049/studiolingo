import { Metadata } from "next";
import PositionDetails, { TPositionKey } from "./components/PositionDetails";
import { positionData } from "./positionData";
import { vacancies } from "../components/VacanciesList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ positionId: TPositionKey }>;
}): Promise<Metadata> {
  const { positionId: id } = await params;
  return {
    openGraph: {
      title: positionData[id].title,
      images: [positionData[id].metaImageUrl],
    },
  };
}

async function page({
  params,
}: {
  params: Promise<{ positionId: TPositionKey }>;
}) {
  const { positionId } = await params;
  const isPositionOpen = !!vacancies.filter((item) => item.route === positionId)
    .length;

  return (
    <div className="flex justify-center p-5 sm:p-9">
      {isPositionOpen ? (
        <PositionDetails positionKey={positionId} />
      ) : (
        <h1 className="text-lingo-green font-bold text-xl text-center h-[calc(100vh-200px)] flex items-center justify-center">
          ამჟამად მიმდინარე ვაკანსია დახურულია
        </h1>
      )}
    </div>
  );
}

export default page;
