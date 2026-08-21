import type { Metadata } from "next";
import MaterialsBrowser from "./components/MaterialsBrowser";
import MaterialsHero from "./components/MaterialsHero";

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
    <>
      <MaterialsHero />
      <main
        style={{ fontFeatureSettings: "'case' on" }}
        className="max-w-6xl px-5 py-12 mx-auto sm:py-16"
      >
        <MaterialsBrowser />
      </main>
    </>
  );
}

export default MaterialsPage;
