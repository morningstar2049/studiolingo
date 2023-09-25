import PositionDetails, { TPositionKey } from "./components/PositionDetails";

function page({ params }: { params: { positionId: TPositionKey } }) {
  return (
    <div className="flex justify-center p-5 sm:p-9">
      <PositionDetails positionKey={params.positionId} />
    </div>
  );
}

export default page;
