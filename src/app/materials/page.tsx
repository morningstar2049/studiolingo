import React from "react";
import PdfWrapper from "./components/PdfWrapper";

const pdfs = [
  "/pdfs/eng_a1_compressed.pdf",
  "/pdfs/eng_a2_compressed.pdf",
  "/pdfs/ger_a1_compressed.pdf",
];

function MaterialsPage() {
  return (
    <div className="flex flex-col items-center w-full sm:flex-row justify-evenly">
      {pdfs.map((pdf) => (
        <PdfWrapper key={pdf} pdf={pdf} />
      ))}
    </div>
  );
}

export default MaterialsPage;