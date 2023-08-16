"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
const MediaQuery = dynamic(() => import("react-responsive"), { ssr: false });

function MainBanner() {
  return (
    <>
      <MediaQuery maxWidth={640}>
        <Image src="/Phone.svg" alt="phone" fill={true} objectFit="cover" />
      </MediaQuery>
      <MediaQuery minWidth={640}>
        <Image src="/Desktop.svg" alt="phone" fill={true} objectFit="contain" />
      </MediaQuery>
      {/* <picture>
        <source media="(max-width:640px)" srcSet="/Phone.svg" />
        <source media="(min-width:640px)" srcSet="/Desktop.svg" />
        <img src="/lingo-logo-svg.svg" alt="Flowers" />
      </picture> */}
    </>
  );
}

export default MainBanner;
