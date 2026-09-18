import { defineField, defineType } from "sanity";
import { MATERIAL_ACCENTS } from "../materialAccents";

// Downloadable study materials on /materials ("მასალები"). Once at least one
// exists here, Sanity is the source of truth; the list in MaterialsBrowser.tsx
// is only the fallback when the dataset is unreachable.


export const material = defineType({
  name: "material",
  title: "მასალა",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "სათაური ბარათზე",
      type: "string",
      description: "მაგ. Elementary ან ფრაზული ზმნები.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sub",
      title: "ქვესათაური",
      type: "string",
      description: "არასავალდებულო, მაგ. სიტყვები.",
    }),
    defineField({
      name: "category",
      title: "კატეგორია",
      type: "string",
      initialValue: "vocabulary",
      options: {
        list: [
          { title: "ლექსიკა", value: "vocabulary" },
          { title: "გრამატიკა", value: "grammar" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      title: "PDF ფაილი",
      type: "file",
      options: { accept: "application/pdf" },
      description: "ატვირთეთ PDF — ან ქვემოთ ჩასვით Google Drive-ის ბმული.",
    }),
    defineField({
      name: "link",
      title: "ან ბმული (Google Drive)",
      type: "url",
      description: "გამოიყენება მხოლოდ მაშინ, როცა PDF ფაილი არ არის ატვირთული.",
    }),
    defineField({
      name: "accent",
      title: "ბარათის ფერი",
      type: "string",
      description: "ცარიელი ველი = ფერი ავტომატურად შეირჩევა.",
      options: { list: MATERIAL_ACCENTS },
    }),
    defineField({
      name: "order",
      title: "რიგითობა",
      type: "number",
      description: "რაც უფრო მცირეა, მით უფრო წინ ჩანს თავის კატეგორიაში.",
      initialValue: 10,
    }),
  ],
  validation: (rule) =>
    rule.custom((doc) =>
      doc?.file || doc?.link
        ? true
        : "ატვირთეთ PDF ფაილი ან ჩასვით ბმული.",
    ),
  orderings: [
    {
      title: "რიგითობა",
      name: "orderAsc",
      by: [
        { field: "category", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "label", sub: "sub", category: "category" },
    prepare: ({
      title,
      sub,
      category,
    }: {
      title?: string;
      sub?: string;
      category?: string;
    }) => ({
      title,
      subtitle: [category === "grammar" ? "გრამატიკა" : "ლექსიკა", sub]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
