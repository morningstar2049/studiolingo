import PdfWrapper from "./components/PdfWrapper";

type TPdfs = {
  thumbnail: string;
  href: string;
}[];

const pdfs: TPdfs = [
  {
    thumbnail: "/pdfs/eng_a1.png",
    href: "https://drive.google.com/file/d/1wWRINP-AA2xEYW9ef-kSQ0mtHRkb9-FE/view?usp=drive_link",
  },
  {
    thumbnail: "/pdfs/eng_a2.png",
    href: "https://drive.google.com/file/d/1jmshg9mW6-eWZ9RQEvGIF7CbOVcTy3x6/view?usp=sharing",
  },
  {
    thumbnail: "/pdfs/ger_a1.png",
    href: "https://drive.google.com/file/d/1LcGDZ5kRR8jRMekgWggMN0aKWD9y_XSx/view?usp=sharing",
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
