import Image from "next/image";
import Overlay from "./Overlay";

function MainBanner() {
  return (
    <>
      <Image
        src="/mobile-banner.png"
        alt="phone"
        fill={true}
        objectFit="cover"
        className="block animate-appear sm:hidden"
      />
      <Image
        src="/banner.JPG"
        alt="desktop"
        fill={true}
        objectFit="cover"
        className="hidden animate-appear sm:block"
      />
      <Overlay />
      {/* <h1
        style={{ fontFeatureSettings: "'case' on" }}
        className="animate-appear text-[#fff] w-fit sm:w-full text-center font-bold text-[2.5rem] sm:text-6xl absolute translate-x-[-50%] translate-y-[-50%] top-[20%] sm:top-[35%] left-[50%] letter tracking-[3.5px] z-10"
      >
        შეაბიჯე ახალ სამყაროში
      </h1> */}
      <h1 className="text-[#fff] animate-appear w-full z-10 sm:w-fit text-center font-bold text-base sm:text-3xl absolute translate-x-[-50%] translate-y-[-50%] top-[25%] sm:max-lg:top-[70%] lg:top-[65%] left-[50%] tracking-[2px]">
        აქ ენებს სუპერ მასწავლებლები თანამედროვე და პრაქტიკული მეთოდებით
        ასწავლიან
      </h1>
    </>
  );
}

export default MainBanner;
