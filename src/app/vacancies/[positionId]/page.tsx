import { Metadata } from "next";
import PositionDetails, { TPositionKey } from "./components/PositionDetails";
import { positionData } from "./positionData";

export async function generateMetadata({
  params,
}: {
  params: { positionId: TPositionKey };
}): Promise<Metadata> {
  const id = params.positionId;
  return {
    openGraph: {
      images: [positionData[id].metaImageUrl],
    },
  };
}

function page({ params }: { params: { positionId: TPositionKey } }) {
  return (
    <div className="flex justify-center p-5 sm:p-9">
      <PositionDetails positionKey={params.positionId} />
    </div>
  );
}

export default page;
