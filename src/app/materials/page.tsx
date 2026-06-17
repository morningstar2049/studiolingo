import PdfWrapper from "./components/PdfWrapper";

type TPdf = {
  thumbnail: string;
  href: string;
};

const pdfs: TPdf[] = [
  {
    thumbnail: "/pdfs/eng_elementary_minus.webp",
    href: "https://drive.google.com/file/d/1kNykkf6b9Uo0iaNkOIE0t2Ju3k-Xn1EL/view?usp=sharing",
  },
  {
    thumbnail: "/pdfs/eng_elementary.webp",
    href: "https://drive.google.com/file/d/1EwzmMaddbI_zXemi3nDWscUlZKaAzyDh/view?usp=sharing",
  },
  {
    thumbnail: "/pdfs/eng_intermediate.webp",
    href: "https://drive.google.com/file/d/1B3WAsUqMlU_PbIQRtUBDuMtx_03Iop_H/view?usp=sharing",
  },
  {
    thumbnail: "/pdfs/eng_intermediate_plus.webp",
    href: "https://drive.google.com/file/d/1PvYFgyTVFO3bLZHu8NBdFjJAqUSlylp8/view?usp=sharing",
  },
  {
    thumbnail: "/pdfs/ger_a1.png",
    href: "https://drive.google.com/file/d/1LTYWBANlV0BSIQr0zaoYi15FE3Brxb9X/view?usp=sharing",
  },
  {
    thumbnail: "/pdfs/ger_a2.png",
    href: "https://drive.google.com/file/d/1GNWZjGuF239dW9Rcr1uFnEzz-uqvjwGx/view?usp=sharing",
  },
];

function MaterialsPage() {
  return (
    <div className="flex flex-col flex-wrap items-center w-full sm:flex-row justify-evenly gap-5">
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
