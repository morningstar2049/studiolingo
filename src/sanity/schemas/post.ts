import { defineField, defineType } from "sanity";
import React from "react";

// Toolbar swatch shown in the editor for each preset text colour.
const swatchIcon = (hex: string) =>
  function ColorSwatch() {
    return React.createElement(
      "span",
      { style: { color: hex, fontWeight: 700, fontSize: "1.05em" } },
      "A"
    );
  };

// Field titles are in Georgian because the Studio is used by the school's
// own team, not by developers.
export const post = defineType({
  name: "post",
  title: "სტატია",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "სათაური",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "მისამართი (URL)",
      type: "slug",
      description:
        "ლათინური ასოებით, მაგ. how-to-learn-english. დააჭირეთ Generate-ს.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "მოკლე აღწერა",
      type: "text",
      rows: 3,
      description:
        "1–2 წინადადება. ჩანს სტატიების სიაში და Google-ის შედეგებში.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "coverImage",
      title: "ფოტო",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "ფოტოს აღწერა",
          type: "string",
          description: "რა ჩანს ფოტოზე — საჭიროა SEO-სთვის.",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "გამოქვეყნების თარიღი",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "ტექსტი",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "ჩვეულებრივი", value: "normal" },
            { title: "სათაური 2", value: "h2" },
            { title: "სათაური 3", value: "h3" },
            { title: "ციტატა", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "მწვანე", value: "green", icon: swatchIcon("#2f9e4d") },
              {
                title: "მუქი ლურჯი",
                value: "navy",
                icon: swatchIcon("#293142"),
              },
              { title: "წითელი", value: "red", icon: swatchIcon("#e24b4a") },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "ბმული",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "youtube",
          title: "YouTube ვიდეო",
          fields: [
            defineField({
              name: "url",
              title: "ვიდეოს ბმული (URL)",
              type: "url",
              description:
                "ჩააკოპირე YouTube-ის ბმული, მაგ. https://www.youtube.com/watch?v=… ან https://youtu.be/…",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { url: "url" },
            prepare: ({ url }: { url?: string }) => ({
              title: "YouTube ვიდეო",
              subtitle: url,
            }),
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "ახალი პირველად",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
});
