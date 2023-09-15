import ImageWrapper from "../ImageWrapper";

function PartnersBanner() {
  return (
    <div className="flex flex-col">
      <ImageWrapper
        extraStyles="h-[150px]"
        src="/ants.png"
        alt="ants"
        fill={true}
        objectFit="contain"
      />
      <ImageWrapper
        extraStyles="h-[150px]"
        src="/zoohub.png"
        alt="zoohub"
        fill={true}
        objectFit="contain"
      />
      <ImageWrapper
        extraStyles="h-[150px]"
        src="/pasha-bank.png"
        alt="pasha-bank"
        fill={true}
        objectFit="contain"
      />
      <ImageWrapper
        extraStyles="h-[150px]"
        src="/master-trade.png"
        alt="master-trade"
        fill={true}
        objectFit="contain"
      />
      <ImageWrapper
        extraStyles="h-[150px]"
        src="/diplomat-holding.png"
        alt="diplomat-holding"
        fill={true}
        objectFit="contain"
      />
    </div>
  );
}

export default PartnersBanner;
