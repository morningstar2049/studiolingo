import type { Metadata } from "next";
import PdfWrapper from "./components/PdfWrapper";

const title = "სასწავლო მასალები — ინგლისურის რესურსები | Studio Lingo";
const description =
  "ჩამოტვირთე ინგლისურის სასწავლო მასალები Studio Lingo-სგან — დონეების მიხედვით დალაგებული უფასო რესურსები.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/materials" },
  openGraph: { title, description, images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

type TPdf = {
  label: string;
  accent: string;
  href: string;
};

const pdfs: TPdf[] = [
  {
    label: "Elementary −",
    accent: "#3bb85e",
    href: "https://drive.google.com/file/d/1YkO8bJ2Ei4ub6viC1E0_9Q7dkLmjIRSF/view?usp=sharing",
  },
  {
    label: "Elementary",
    accent: "#2f9e4d",
    href: "https://drive.google.com/file/d/1apcBAilHUBrurk_WNkoYunzsa-bgOzIA/view?usp=sharing",
  },
  {
    label: "Intermediate",
    accent: "#1d9e75",
    href: "https://drive.google.com/file/d/1aimT85RJteAttw_jKaw3lI07bnLdlgkK/view?usp=sharing",
  },
  {
    label: "Intermediate +",
    accent: "#1e7d3a",
    href: "https://drive.google.com/file/d/1xTi8LudWsjTQB986f59-mwTkuWsnpDjZ/view?usp=sharing",
  },
];

function MaterialsPage() {
  return (
    <main
      style={{ fontFeatureSettings: "'case' on" }}
      className="max-w-6xl px-5 py-12 mx-auto sm:py-16"
    >
      <div className="mb-14 text-center">
        <h1 className="text-3xl font-bold blog-rise sm:text-4xl text-lingo-black">
          სასწავლო <span className="text-lingo-green">მასალები</span>
        </h1>
        <p className="max-w-xl mx-auto mt-4 text-lg blog-rise-2 text-[#6b7280]">
          ჩამოტვირთე ინგლისურის სასწავლო მასალები დონეების მიხედვით
        </p>
        <div className="w-16 h-1 mx-auto mt-5 rounded blog-bar bg-lingo-green" />
      </div>

      <div className="grid grid-cols-1 gap-8 justify-items-center sm:grid-cols-2 lg:grid-cols-4">
        {pdfs.map((pdf, i) => (
          <PdfWrapper
            key={pdf.label}
            label={pdf.label}
            accent={pdf.accent}
            href={pdf.href}
            index={i}
          />
        ))}
      </div>
    </main>
  );
}

export default MaterialsPage;
