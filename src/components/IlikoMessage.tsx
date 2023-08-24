import Image from "next/image";

export default function IlikoMessage() {
  return (
    <>
      <div
        id="courses"
        className="relative sm:w-1/2 sm:h-[700px] w-[100%] h-[370px] -z-10"
      >
        <Image
          src="/iliko.svg"
          alt="iliko"
          fill={true}
          objectFit="contain"
          className="animate-appear"
        />
      </div>
    </>
  );
}
