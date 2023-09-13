import Image from "next/image";

function PartnersBanner() {
  return (
    <div className="relative h-[200px]">
      <Image
        src="/partners.png"
        alt="partners"
        fill={true}
        objectFit="contain"
      />
    </div>
  );
}

export default PartnersBanner;
