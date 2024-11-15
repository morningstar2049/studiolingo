import Image from "next/image";

export default function IlikoMessage() {
  return (
    <div className="relative sm:w-1/2 sm:h-[600px] w-[100%] h-[370px] -z-50 flex gap-1 items-center">
      <Image
        src="/ilikoNew.png"
        alt="iliko"
        // fill={true}
        width={200}
        height={200}
        objectFit="contain"
        className="animate-appear flex-1 max-w-xs"
      />
      <h1 className="flex-1 text-2xl sm:text-4xl text-lingo-black text-center max-w-sm sm:max-w-xl">
        ჩვენთან <span className="text-lingo-green">ყოველი გაკვეთილი</span>{" "}
        მორგებული იქნება <span className="text-lingo-green">თქვენზე</span>
      </h1>
    </div>
  );
}
