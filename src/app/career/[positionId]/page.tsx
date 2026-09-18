import { Metadata } from "next";
import { notFound } from "next/navigation";
import PositionDetails from "./components/PositionDetails";
import { positionData } from "./positionData";
import {
  isLegacyKey,
  legacyView,
  sanityView,
  type VacancyView,
} from "./vacancyView";
import { legacyVacancies } from "../components/VacanciesList";
import {
  getVacancy,
  getVacancyCards,
  getVacancySlugs,
} from "@/sanity/queries";

// Vacancy texts are edited in Sanity; refresh the page at most once a minute.
export const revalidate = 60;

type Params = Promise<{ positionId: string }>;

type Resolved = { view: VacancyView; open: boolean; metaImageUrl?: string };

async function resolve(positionId: string): Promise<Resolved | null> {
  const doc = await getVacancy(positionId);
  if (doc) {
    return {
      view: sanityView(doc),
      open: doc.isOpen,
      metaImageUrl: doc.metaImageUrl,
    };
  }

  if (!isLegacyKey(positionId)) return null;
  // Hard-coded positions only count as open while Sanity manages no vacancies
  // at all (dataset unreachable or not seeded yet). Once it does, a position
  // missing from Sanity is treated as closed.
  const sanity = await getVacancyCards();
  const sanityManages = !!sanity && sanity.total > 0;
  return {
    view: legacyView(positionId),
    open:
      !sanityManages && legacyVacancies.some((v) => v.route === positionId),
    metaImageUrl: positionData[positionId].metaImageUrl,
  };
}

export async function generateStaticParams() {
  const slugs = await getVacancySlugs();
  return [...new Set([...Object.keys(positionData), ...slugs])].map(
    (positionId) => ({ positionId }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { positionId } = await params;
  const resolved = await resolve(positionId);
  if (!resolved) return {};

  const { view, open } = resolved;
  const image = resolved.metaImageUrl || "/og-logo.png";
  const title = open
    ? `${view.title} — ვაკანსია | Studio Lingo`
    : `${view.title} — ვაკანსია დახურულია | Studio Lingo`;
  const description = open
    ? `${view.title} — ვაკანსია სტუდიო ლინგოში (${view.location}). გაეცანი მოვალეობებს, მოთხოვნებსა და პირობებს და გამოგზავნე განაცხადი.`
    : `${view.title} — ეს ვაკანსია ამჟამად დახურულია. იხილე სტუდიო ლინგოს მიმდინარე ვაკანსიები.`;

  return {
    title,
    description,
    alternates: { canonical: `/career/${positionId}` },
    // Closed positions stay reachable from old links but should not be indexed.
    robots: open ? undefined : { index: false, follow: true },
    openGraph: { title, description, images: [image] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

async function page({ params }: { params: Params }) {
  const { positionId } = await params;
  const resolved = await resolve(positionId);
  if (!resolved) notFound();

  return resolved.open ? (
    <PositionDetails view={resolved.view} />
  ) : (
    <div className="flex justify-center p-5 sm:p-9">
      <h1 className="text-lingo-green font-bold text-xl text-center h-[calc(100vh-200px)] flex items-center justify-center">
        ამჟამად მიმდინარე ვაკანსია დახურულია
      </h1>
    </div>
  );
}

export default page;
