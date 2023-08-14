import Image from "next/image";

function MainContent() {
  return (
    <>
      <div className="w-full h-[100dvh] relative">
        {/* <div className="bg-[#000] opacity-50 absolute w-full h-full z-10" /> */}
        <Image src="/main-img.png" alt="main" fill={true} objectFit="contain" />
        <h1 className="text-lingo-green font-bold text-5xl z-20 absolute translate-x-[-50%] translate-y-[-50%] top-[20%] sm:top-[15%] left-[50%]">
          <span className="text-[#293142]">შეაბიჯე</span> ახალ სამყაროში
        </h1>
      </div>
    </>
  );
}

export default MainContent;
