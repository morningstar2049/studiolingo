import { defineField, defineType } from "sanity";

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
        },
        { type: "image", options: { hotspot: true } },
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
