import Image from "next/image";

function MainBanner() {
  return (
    <>
      <Image
        src="/Phone.svg"
        alt="phone"
        fill={true}
        objectFit="cover"
        className="block animate-appear sm:hidden"
      />
      <Image
        src="/Desktop.svg"
        alt="desktop"
        fill={true}
        objectFit="contain"
        className="hidden animate-appear sm:block"
      />
    </>
  );
}

export default MainBanner;
