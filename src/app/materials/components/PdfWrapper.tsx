"use client";
import { pdfjs } from "react-pdf";
import Pdf from "./Pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PdfWrapper({ pdf }: { pdf: string }) {
  return (
    <div className="relative w-[300px] my-20 shadow-xl flex group">
      <Pdf key={pdf} file={pdf} />
    </div>
  );
}

export default PdfWrapper;
