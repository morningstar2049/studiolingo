import PdfWrapper from "./components/PdfWrapper";

type TPdf = {
  thumbnail: string;
  href: string;
};

const pdfs: TPdf[] = [
  {
    thumbnail: "/pdfs/eng_a1.png",
    href: "https://drive.google.com/file/d/1-fYP1WTP7lfRVKswN7df_PU7NArfdiom/view",
  },
  {
    thumbnail: "/pdfs/eng_a2.png",
    href: "https://drive.google.com/file/d/1n-6rNEGx_7YYJsXohjKByEmMNrqHdWyL/view",
  },
  {
    thumbnail: "/pdfs/eng_b1.png",
    href: "https://drive.google.com/file/d/1WcJYwJmA3i1g_Wlf-Zc_ogpLEMxsiknk/view",
  },
  {
    thumbnail: "/pdfs/ger_a1.png",
    href: "https://drive.google.com/file/d/1iifwjn5oWE2arrdoFOywNB1Xg_HQsus5/view?fbclid=IwAR36bWX9h7tYaBx1SjNBB0iHQJf4dE_ZWcuVxK0WFaY8ncplt-l-v44tuA0",
  },
];

function MaterialsPage() {
  return (
    <div className="flex flex-col items-center w-full sm:flex-row justify-evenly">
      {pdfs.map((pdf) => (
        <PdfWrapper
          key={pdf.thumbnail}
          thumbnail={pdf.thumbnail}
          href={pdf.href}
        />
      ))}
    </div>
  );
}

export default MaterialsPage;
