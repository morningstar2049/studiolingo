import MainBanner from "./MainBanner";

function MainContent() {
  return (
    <>
      <div className="w-full h-[calc(100dvh-88px)] sm:h-[calc(100dvh-154px)] relative -z-10 overflow-x-hidden">
        <div className="bg-[#000] opacity-40 absolute w-full h-full z-10" />
        <MainBanner />
        <h1
          style={{ fontFeatureSettings: "'case' on" }}
          className="animate-appear text-[#fff] w-fit sm:w-full text-center font-bold text-[2.5rem] sm:text-6xl absolute translate-x-[-50%] translate-y-[-50%] top-[20%] sm:top-[35%] left-[50%] letter tracking-[3.5px] z-50 "
        >
          შეაბიჯე ახალ სამყაროში
        </h1>
        <h1 className="text-[#fff] animate-appear w-full z-50 sm:w-fit text-center sm:font-bold text-base sm:text-3xl absolute translate-x-[-50%] translate-y-[-50%] top-[45%] sm:max-lg:top-[70%] lg:top-[55%] left-[50%] tracking-[2px]">
          აქ ენებს სუპერ მასწავლებლები თანამედროვე და პრაქტიკული მეთოდებით
          ასწავლიან
        </h1>
      </div>
    </>
  );
}

export default MainContent;
