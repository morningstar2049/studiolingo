import PdfWrapper from "./components/PdfWrapper";

type TPdf = {
  thumbnail: string;
  href: string;
};

const pdfs: TPdf[] = [
  {
    thumbnail: "/pdfs/eng_a1.png",
    href: "https://drive.google.com/file/d/12nWuMyYxmgfS_PBVBYkpi5ZsCv7wTBGz/view?usp=sharing",
  },
  {
    thumbnail: "/pdfs/eng_a2.png",
    href: "https://drive.google.com/file/d/1tFq8G-J1hhkKcSLRgDzdMIs1dJJK1AvV/view?usp=sharing",
  },
  {
    thumbnail: "/pdfs/eng_b1.png",
    href: "https://drive.google.com/file/d/1YblNrPN-xk87tVdKOx2D7f_nlMLFPrgx/view?usp=sharing",
  },
  {
    thumbnail: "/pdfs/eng_b2.png",
    href: "https://drive.google.com/file/d/1q7bGMOKIKxfADeJsoWxrjh1MepwBtua1/view",
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
