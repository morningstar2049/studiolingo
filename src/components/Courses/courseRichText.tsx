import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";

// Inline formatting shared by course texts and the /courses questions:
// bold, brand green and links (internal links stay in the app).
export const courseLinkClass =
  "font-bold underline text-lingo-green hover:text-[#1f7d3a]";

export const courseMarks: PortableTextComponents["marks"] = {
  strong: ({ children }) => <span className="font-bold">{children}</span>,
  green: ({ children }) => <span className="text-lingo-green">{children}</span>,
  link: ({ children, value }) => {
    const href: string = value?.href ?? "#";
    return href.startsWith("/") ? (
      <Link href={href} className={courseLinkClass}>
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={courseLinkClass}
      >
        {children}
      </a>
    );
  },
};

// A block's text only — the caller supplies the wrapping <p> / <h3>.
export const courseInline: PortableTextComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
    h3: ({ children }) => <>{children}</>,
  },
  marks: courseMarks,
};
