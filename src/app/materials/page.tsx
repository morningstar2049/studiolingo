import type { Metadata } from "next";
import MaterialsBrowser from "./components/MaterialsBrowser";

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

      <MaterialsBrowser />
    </main>
  );
}

export default MaterialsPage;
