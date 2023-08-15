import Image from "next/image";

function MainContent() {
  return (
    <>
      {/* h-[calc(85dvh-166px)] */}
      <div className="w-full h-[calc(100dvh-112px)] sm:h-[calc(100dvh-166px)] relative -z-10 overflow-x-hidden">
        <div className="bg-[#000] opacity-60 absolute w-full h-full z-10" />
        {/* <Image
          src="/main-img.png"
          alt="main"
          fill={true}
          objectFit="contain"
          className="my-[55px] sm:my-[30px]"
        /> */}
        <Image
          src="/Desktop.svg"
          alt="main"
          fill={true}
          objectFit="contain"
          // className="my-[55px] sm:my-[30px]"
        />
        <h1 className="text-[#fff] w-fit sm:w-full text-center font-bold sm:text-6xl absolute translate-x-[-50%] translate-y-[-50%] top-[20%] sm:top-[35%] left-[50%] letter tracking-[3.5px] z-50">
          {/* <span className="text-[#293142]">შეაბიჯე</span> ახალ სამყაროში */}
          შეაბიჯე ახალ სამყაროში
        </h1>
        <h1 className="text-lingo-green w-[50%] z-50 sm:w-full text-center font-bold text-2xl sm:text-3xl absolute translate-x-[-50%] translate-y-[-50%] top-[90%] sm:top-[55%] left-[50%] tracking-[3.5px]">
          {/* <span className="text-[#293142]">უცხო ენების</span> ონლაინ სკოლა */}
          უცხო ენების ონლაინ სკოლა
        </h1>
      </div>
    </>
  );
}

export default MainContent;
