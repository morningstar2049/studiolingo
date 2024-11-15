import Image from "next/image";

export default function IlikoMessage() {
  return (
    <>
      <div className="relative sm:w-1/2 sm:h-[600px] w-[100%] h-[370px] -z-10 self-start">
        <Image
          src="/ilikoNew.png"
          alt="iliko"
          fill={true}
          objectFit="contain"
          className="animate-appear"
        />
      </div>
    </>
  );
}
