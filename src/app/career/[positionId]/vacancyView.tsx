import type { ReactNode } from "react";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { Vacancy } from "@/sanity/queries";
import { positionData } from "./positionData";

// Everything the vacancy page renders, independent of where it came from:
// Sanity (the normal case) or the hard-coded positionData (fallback when the
// dataset is unreachable or has no vacancies yet).

export type TPositionKey = keyof typeof positionData;
export type SectionIcon = "list" | "check" | "gift";

export type VacancyView = {
  title: string;
  statusBadge: string;
  location: string;
  time: string;
  salaryType?: string;
  hideHeroApply: boolean;
  consentText?: string;
  googleFormLink: string;
  videoId?: string;
  intro?: string;
  sections: {
    key: string;
    heading: string;
    icon: SectionIcon;
    highlight: boolean;
    items: ReactNode[];
  }[];
  infoBox?: ReactNode;
  closing?: ReactNode;
};

export const isLegacyKey = (id: string): id is TPositionKey =>
  id in positionData;

// YouTube id from youtu.be / watch?v= / embed / shorts links.
const youtubeId = (url?: string) =>
  url?.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/)?.[1];

// ── Portable Text rendering ─────────────────────────────────────────────────

const marks: PortableTextComponents["marks"] = {
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  green: ({ children }) => (
    <span className="text-lingo-green">{children}</span>
  ),
  link: ({ children, value }) => (
    <a
      className="underline text-lingo-green"
      href={value?.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

// A bullet point: the block's text only, no <p> (it sits inside a <span>).
const itemComponents: PortableTextComponents = {
  block: { normal: ({ children }) => <>{children}</> },
  marks,
};

// Paragraphs (closing text).
const paragraphComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-4 first:mt-0">{children}</p>,
  },
  marks,
};

// Paragraphs + numbered / bulleted lists (the green conditions box).
const richComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 first:mt-0">{children}</p>,
  },
  list: {
    number: ({ children }) => (
      <ol className="pl-5 mt-2 space-y-1 list-decimal">{children}</ol>
    ),
    bullet: ({ children }) => (
      <ul className="pl-5 mt-2 space-y-1 list-disc">{children}</ul>
    ),
  },
  listItem: ({ children }) => <li>{children}</li>,
  marks,
};

export function sanityView(doc: Vacancy): VacancyView {
  return {
    title: doc.title,
    statusBadge: doc.statusBadge || "ვაკანსია ღიაა",
    location: doc.location,
    time: doc.time,
    salaryType: doc.salaryType || undefined,
    hideHeroApply: doc.hideHeroApply ?? true,
    consentText: doc.consentText || undefined,
    googleFormLink: doc.googleFormLink,
    videoId: youtubeId(doc.videoUrl),
    intro: doc.intro || undefined,
    sections: (doc.sections ?? []).map((s) => ({
      key: s._key,
      heading: s.heading,
      icon: s.icon ?? "list",
      highlight: !!s.highlight,
      items: (s.items ?? []).map((block, i) => (
        <PortableText
          key={block._key ?? i}
          value={block}
          components={itemComponents}
        />
      )),
    })),
    infoBox: doc.infoBox?.length ? (
      <PortableText value={doc.infoBox} components={richComponents} />
    ) : undefined,
    closing: doc.closingText?.length ? (
      <PortableText value={doc.closingText} components={paragraphComponents} />
    ) : undefined,
  };
}

// ── Hard-coded fallback ─────────────────────────────────────────────────────

const legacyVideos: Partial<Record<TPositionKey, string>> = {
  academyInternship: "6p0IdTn5QFQ",
  englishTeacher: "qWe4SpOVzuQ",
};

export function legacyView(key: TPositionKey): VacancyView {
  const p = positionData[key];
  const sections: VacancyView["sections"] = p.sections
    ? p.sections.map((s) => ({
        key: s.heading,
        heading: s.heading,
        icon: "list",
        highlight: false,
        items: s.items,
      }))
    : [
        p.obligations && {
          key: "obligations",
          heading: "ძირითადი მოვალეობებია",
          icon: "list" as const,
          highlight: false,
          items: p.obligations,
        },
        p.requirements && {
          key: "requirements",
          heading: "თქვენგან ვითხოვთ, რომ",
          icon: "check" as const,
          highlight: false,
          items: p.requirements,
        },
        p.offer && {
          key: "offer",
          heading: "ჩვენი გუნდი გთავაზობთ",
          icon: "gift" as const,
          highlight: true,
          items: p.offer,
        },
      ].filter((s): s is NonNullable<typeof s> => !!s);

  const defaultClosing =
    key === "contentCreator" || key === "administrator"
      ? "თუ ხარ მოტივირებული და ამ ვაკანსიით დაინტერესებული, შემოგვიერთდი ჩვენს გუნდში და გახდი ჩვენი გუნდის წარმატების ისტორიის განუყოფელი ნაწილი!"
      : "თუ ხარ მოტივირებული მასწავლებელი და ამ ვაკანსიით დაინტერესებული, შემოგვიერთდი და გახდი ჩვენი გუნდისა და შენი მომავალი მოსწავლეების წარმატების ისტორიის განუყოფელი ნაწილი!";

  return {
    title: p.title,
    statusBadge:
      key === "academyInternship" ? "მიღება დაწყებულია" : "ვაკანსია ღიაა",
    location: p.location,
    time: p.time,
    salaryType: p.salaryType,
    hideHeroApply: !!p.hideHeroApply,
    consentText: p.consentText,
    googleFormLink: p.googleFormLink,
    videoId: legacyVideos[key],
    intro: p.intro,
    sections,
    infoBox: p.salary,
    closing: p.closingText ?? defaultClosing,
  };
}
