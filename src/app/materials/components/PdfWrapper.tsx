"use client";
import Button from "@/components/Button";
import Image from "next/image";

function PdfWrapper({ thumbnail, href }: { thumbnail: string; href: string }) {
  return (
    <div className="relative w-[300px] my-20 shadow-xl flex group">
      <Image
        width={300}
        height={300}
        className="flex flex-col gap-5 rounded-md group-hover:blur-[8px]"
        src={thumbnail}
        alt={"thumbnail"}
      />
      <a href={href} target="_blank">
        <Button extraStyles="w-[130px] opacity-0 group-hover:opacity-100 transition-opacity absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          ნახვა
        </Button>
      </a>
    </div>
  );
}

export default PdfWrapper;
