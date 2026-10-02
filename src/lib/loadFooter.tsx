import type { ReactNode } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { getFooter } from "@/sanity/queries";
import SchoolRules from "@/components/SchoolRules";
import PrivacyPolicy from "@/components/PrivacyPolicy";

// Footer content from Sanity ("ფუტერი"), with the copy in code as the
// fallback. The two legal texts are returned as ready-to-render nodes so the
// client footer and the registration form can show them without knowing where
// they came from.

export type FooterLink = {
  label: string;
  kind: "page" | "terms" | "privacy";
  href?: string;
};

export type FooterData = {
  tagline: string;
  contactHeading: string;
  phone: string;
  email: string;
  address: string;
  mapUrl: string;
  linksHeading: string;
  links: FooterLink[];
  copyright: string;
  termsTitle: string;
  privacyTitle: string;
  terms: ReactNode;
  privacy: ReactNode;
};

export const FALLBACK_FOOTER: Omit<FooterData, "terms" | "privacy"> = {
  tagline:
    "N1 ინგლისურის სკოლა, რომელიც გთავაზობთ ინგლისურის გაკვეთილებს თბილისში და ონლაინ პრაქტიკული სწავლებითა და რეიტინგული კონტენტით",
  contactHeading: "კონტაქტი",
  phone: "+995 32 2 114 623",
  email: "info@studiolingo.ge",
  address: "წერეთლის 116, თბილისი",
  mapUrl: "https://www.google.com/maps/dir//studiolingo",
  linksHeading: "ბმულები",
  links: [
    { label: "კონფიდენციალურობის პოლიტიკა", kind: "privacy" },
    { label: "წესები და პირობები", kind: "terms" },
    { label: "ინგლისურის კურსები", kind: "page", href: "/courses" },
    { label: "კურსების ფასები", kind: "page", href: "/prices" },
    { label: "ხშირი კითხვები", kind: "page", href: "/faq" },
  ],
  copyright: "© Studio Lingo — ყველა უფლება დაცულია",
  termsTitle: "წესები და პირობები",
  privacyTitle: "კონფიდენციალურობის პოლიტიკა",
};

const legalComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="pl-5 my-2 space-y-1 list-disc">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="pl-5 my-2 space-y-1 list-decimal">{children}</ol>
    ),
  },
  marks: {
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer noopener"
        className="underline text-lingo-green"
      >
        {children}
      </a>
    ),
  },
};

const pick = (value: string | undefined, fallback: string) =>
  value?.trim() ? value : fallback;

export async function loadFooter(): Promise<FooterData> {
  const doc = await getFooter();
  const f = FALLBACK_FOOTER;
  const links = (doc?.links ?? [])
    .filter((l) => l.label?.trim() && l.kind)
    .map((l) => ({
      label: l.label!,
      kind: l.kind as FooterLink["kind"],
      href: l.href,
    }));

  return {
    tagline: pick(doc?.tagline, f.tagline),
    contactHeading: pick(doc?.contactHeading, f.contactHeading),
    phone: pick(doc?.phone, f.phone),
    email: pick(doc?.email, f.email),
    address: pick(doc?.address, f.address),
    mapUrl: pick(doc?.mapUrl, f.mapUrl),
    linksHeading: pick(doc?.linksHeading, f.linksHeading),
    links: links.length ? links : f.links,
    copyright: pick(doc?.copyright, f.copyright),
    termsTitle: pick(doc?.termsTitle, f.termsTitle),
    privacyTitle: pick(doc?.privacyTitle, f.privacyTitle),
    terms: doc?.terms?.length ? (
      <PortableText value={doc.terms} components={legalComponents} />
    ) : (
      <SchoolRules />
    ),
    privacy: doc?.privacy?.length ? (
      <PortableText value={doc.privacy} components={legalComponents} />
    ) : (
      <PrivacyPolicy />
    ),
  };
}
