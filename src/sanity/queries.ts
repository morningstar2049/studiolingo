import type { PortableTextBlock } from "sanity";

import { client } from "./client";

export type Review = {
  _id: string;
  author: string;
  rating: number;
  text: string;
};

export async function getReviews(): Promise<Review[]> {
  return client.fetch(
    `*[_type == "review"] | order(order asc, _createdAt asc) { _id, author, rating, text }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: { asset?: { _ref: string }; alt?: string };
};

export type Post = PostListItem & {
  body: PortableTextBlock[];
};

const listFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage
`;

export async function getPosts(): Promise<PostListItem[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${listFields} }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${listFields}, body }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getPostSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)].slug.current`,
    {},
    { next: { revalidate: 60 } }
  );
}

// ── Vacancies (/career) ────────────────────────────────────────────────────

export type VacancyCard = {
  slug: string;
  title: string;
  location: string;
  time: string;
  timeLabel?: string;
  listSalary?: string;
  salaryLabel?: string;
  listBadge?: string;
};

export type VacancySection = {
  _key: string;
  heading: string;
  icon?: "list" | "check" | "gift";
  highlight?: boolean;
  items?: PortableTextBlock[];
};

export type Vacancy = VacancyCard & {
  isOpen: boolean;
  statusBadge?: string;
  salaryType?: string;
  videoUrl?: string;
  intro?: string;
  sections?: VacancySection[];
  infoBox?: PortableTextBlock[];
  closingText?: PortableTextBlock[];
  googleFormLink: string;
  consentText?: string;
  hideHeroApply?: boolean;
  metaImageUrl?: string;
};

const cardFields = `
  "slug": slug.current,
  title,
  location,
  time,
  timeLabel,
  listSalary,
  salaryLabel,
  listBadge
`;

/**
 * Open vacancy cards plus how many vacancies exist in Sanity at all. `total`
 * lets callers tell "Sanity manages vacancies but none are open" (show the
 * all-closed message) from "nothing in Sanity yet" (use the hard-coded list).
 * Returns null if the dataset can't be reached.
 */
export async function getVacancyCards(): Promise<{
  cards: VacancyCard[];
  total: number;
} | null> {
  try {
    return await client.fetch(
      `{
        "cards": *[_type == "vacancy" && isOpen == true && defined(slug.current)]
          | order(order asc, _createdAt asc) { ${cardFields} },
        "total": count(*[_type == "vacancy" && defined(slug.current)])
      }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}

export async function getVacancy(slug: string): Promise<Vacancy | null> {
  try {
    return await client.fetch(
      `*[_type == "vacancy" && slug.current == $slug][0] {
        ${cardFields},
        "isOpen": coalesce(isOpen, false),
        statusBadge,
        salaryType,
        videoUrl,
        intro,
        sections,
        infoBox,
        closingText,
        googleFormLink,
        consentText,
        hideHeroApply,
        "metaImageUrl": coalesce(metaImage.asset->url, metaImageUrl)
      }`,
      { slug },
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}

export async function getVacancySlugs(): Promise<string[]> {
  try {
    return await client.fetch(
      `*[_type == "vacancy" && defined(slug.current)].slug.current`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    return [];
  }
}
