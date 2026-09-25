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

// ── Team (/team) ───────────────────────────────────────────────────────────

export type SanityTeamMember = {
  _id: string;
  name: string;
  role: string;
  videoUrl?: string;
  photo: { _type: "image"; asset: { _ref: string } };
};

/**
 * Visible team members plus how many exist in Sanity at all (see
 * getVacancyCards for why). Returns null if the dataset can't be reached.
 */
export async function getTeamMembers(): Promise<{
  members: SanityTeamMember[];
  total: number;
} | null> {
  try {
    return await client.fetch(
      `{
        "members": *[_type == "teamMember" && visible != false && defined(photo.asset)]
          | order(order asc, _createdAt asc) { _id, name, role, videoUrl, photo },
        "total": count(*[_type == "teamMember"])
      }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}

// ── Courses (/courses, homepage carousel, /courses/<slug>) ─────────────────

export type CourseCardFields = {
  slug: string;
  title: string;
  chips?: string[];
  cardText?: string;
  order?: number;
};

/** One item of a course page's text: a paragraph/subhead block or an embed. */
export type CourseBodyItem = {
  _type: "block" | "youtube" | "coursePhoto" | "toolsSection" | "homeworkSection";
  _key: string;
  style?: string;
  url?: string;
  alt?: string;
  asset?: { _ref: string };
  [key: string]: unknown;
};

export type CourseDoc = CourseCardFields & {
  heroSubtitle?: string;
  body?: CourseBodyItem[];
};

export async function getCourseCards(): Promise<{
  cards: CourseCardFields[];
  total: number;
} | null> {
  try {
    return await client.fetch(
      `{
        "cards": *[_type == "course" && defined(slug)]
          | order(order asc) { slug, title, chips, cardText, order },
        "total": count(*[_type == "course"])
      }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}

export async function getCourse(slug: string): Promise<CourseDoc | null> {
  try {
    return await client.fetch(
      `*[_type == "course" && slug == $slug][0] {
        slug, title, chips, cardText, order, heroSubtitle, body
      }`,
      { slug },
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}

export type CourseFaq = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
};

export async function getCourseFaqs(): Promise<{
  faqs: CourseFaq[];
  total: number;
} | null> {
  try {
    return await client.fetch(
      `{
        "faqs": *[_type == "courseFaq" && defined(question)]
          | order(order asc, _createdAt asc) { _id, question, answer },
        "total": count(*[_type == "courseFaq"])
      }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}

// ── Materials (/materials) ─────────────────────────────────────────────────

export type MaterialItem = {
  _id: string;
  label: string;
  sub?: string;
  category: "vocabulary" | "grammar";
  accent?: string;
  href?: string;
};

export async function getMaterials(): Promise<{
  items: MaterialItem[];
  total: number;
} | null> {
  try {
    return await client.fetch(
      `{
        "items": *[_type == "material" && defined(label)]
          | order(order asc, _createdAt asc) {
            _id, label, sub, category, accent,
            "href": coalesce(file.asset->url, link)
          },
        "total": count(*[_type == "material"])
      }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}

// ── Course prices (calculator + /buy-course) ──────────────────────────────

export type CoursePrice = {
  course: string;
  format: string;
  lessonType: string;
  frequency: string;
  price: number;
};

export async function getCoursePrices(): Promise<{
  prices: CoursePrice[];
  total: number;
} | null> {
  try {
    return await client.fetch(
      `{
        "prices": *[_type == "coursePrice" && defined(price) && defined(course)
          && defined(format) && defined(lessonType) && defined(frequency)]
          { course, format, lessonType, frequency, price },
        "total": count(*[_type == "coursePrice"])
      }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}

// ── Homepage banner + achievements bar (single documents) ─────────────────

type SanityImage = {
  asset?: { _ref: string };
  hotspot?: { x: number; y: number };
};

export type HomeHeroDoc = {
  headline?: string;
  slides?: {
    _key: string;
    image?: SanityImage;
    alt?: string;
    caption?: string;
    captionWrap?: boolean;
  }[];
  mobileImage?: SanityImage;
  mobileAlt?: string;
};

export type AchievementStatDoc = {
  _key: string;
  value: number;
  suffix?: string;
  group?: boolean;
  label: string;
  shortLabel?: string;
};

export async function getHomeBanner(): Promise<{
  hero: HomeHeroDoc | null;
  stats: AchievementStatDoc[] | null;
} | null> {
  try {
    return await client.fetch(
      `{
        "hero": *[_id == "homeHero"][0] { headline, slides, mobileImage, mobileAlt },
        "stats": *[_id == "achievementsBar"][0].stats
      }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}

// ── Level test (/language-test) ───────────────────────────────────────────

export type LevelTestQuestionDoc = {
  _id: string;
  level: TLevel;
  kind: "choice" | "listening";
  question: string;
  choices?: string[];
  correctOption?: number;
  audioUrl?: string;
  listeningAnswer?: string;
  alsoAccepted?: { answer?: string; points?: number }[];
};

// Single document "levelTestTexts": all fields optional strings, plus the
// intro tiles and the email rows.
export type LevelTestTextsDoc = Partial<Record<string, string>> & {
  introStats?: { value?: string; label?: string }[];
  emailRecipients?: string[];
  emailRows?: { field?: string; label?: string }[];
  emailIncludeAnswers?: boolean;
};

export async function getLevelTest(): Promise<{
  questions: LevelTestQuestionDoc[];
  total: number;
  texts: LevelTestTextsDoc | null;
} | null> {
  try {
    return await client.fetch(
      `{
        "questions": *[_type == "levelTestQuestion" && defined(level) && defined(question)]
          | order(order asc, _createdAt asc) {
            _id, level, kind, question, choices, correctOption,
            "audioUrl": audio.asset->url, listeningAnswer, alsoAccepted[]{ answer, points }
          },
        "total": count(*[_type == "levelTestQuestion"]),
        "texts": *[_id == "levelTestTexts"][0]
      }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}
