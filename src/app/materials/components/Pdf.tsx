"use client";
import Button from "@/components/Button";
import { Document, Thumbnail, Outline } from "react-pdf";

type TPdfProps = {
  file: string;
};

function Pdf({ file }: TPdfProps) {
  const buttonStyles =
    "w-[130px] opacity-0 group-hover:opacity-100 transition-opacity";
  return (
    <Document file={file}>
      <Thumbnail
        width={300}
        height={300}
        pageNumber={1}
        className="group-hover:blur-[8px] transition-all"
      />
      <Outline />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-5">
        <a href={file} target="_blank">
          <Button extraStyles={buttonStyles}>ნახვა</Button>
        </a>
        <a href={file} download>
          <Button extraStyles={buttonStyles}>გადმოწერა</Button>
        </a>
      </div>
    </Document>
  );
}

export default Pdf;
