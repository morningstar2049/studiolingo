import type { Metadata } from "next";
import MaterialsBrowser, {
  fallbackPdfs,
  type TPdf,
} from "./components/MaterialsBrowser";
import { getMaterials } from "@/sanity/queries";
import { MATERIAL_ACCENTS } from "@/sanity/materialAccents";
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

// Materials are edited in Sanity; refresh at most once a minute.
export const revalidate = 60;

const palette = MATERIAL_ACCENTS.map((a) => a.value);

async function loadMaterials(): Promise<TPdf[]> {
  const res = await getMaterials();
  if (!res || res.total === 0) return fallbackPdfs;
  const seen = { vocabulary: 0, grammar: 0 };
  return res.items
    .filter((m) => m.href)
    .map((m) => {
      const i = seen[m.category]++;
      return {
        label: m.label,
        sub: m.sub || undefined,
        category: m.category,
        href: m.href!,
        accent: m.accent || palette[i % palette.length],
      };
    });
}

async function MaterialsPage() {
  const pdfs = await loadMaterials();
  return (
    <>
      <MaterialsHero />
      <main
        style={{ fontFeatureSettings: "'case' on" }}
        className="max-w-6xl px-5 py-12 mx-auto sm:py-16"
      >
        <MaterialsBrowser pdfs={pdfs} />
      </main>
    </>
  );
}

export default MaterialsPage;
