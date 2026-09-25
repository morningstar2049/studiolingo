import { defineArrayMember, defineField, defineType, type UrlRule } from "sanity";
import React from "react";

// The main FAQ ("ხშირად დასმული კითხვები"): the /faq page, the FAQ dialog on
// the course pages and the homepage section. Once at least one question exists
// here, Sanity is the source of truth; src/components/FAQ/faqData.tsx is only
// the fallback when the dataset is unreachable.

const swatchIcon = (hex: string) =>
  function ColorSwatch() {
    return React.createElement(
      "span",
      { style: { color: hex, fontWeight: 700, fontSize: "1.05em" } },
      "A",
    );
  };

// Kept outside defineType so the annotation's own rule type stays loose,
// the same way the vacancy schema does it.
const inlineMarks = {
  decorators: [
    { title: "Bold", value: "strong" },
    { title: "Italic", value: "em" },
    { title: "მწვანე", value: "green", icon: swatchIcon("#2f9e4d") },
  ],
  annotations: [
    {
      name: "link",
      type: "object",
      title: "ბმული",
      fields: [
        {
          name: "href",
          type: "url",
          title: "URL",
          description:
            "მაგ. https://… ან საიტის შიდა გვერდი: /prices, /language-test",
          validation: (rule: UrlRule) =>
            rule.uri({
              allowRelative: true,
              scheme: ["http", "https", "mailto", "tel"],
            }),
        },
      ],
    },
  ],
};

export const faq = defineType({
  name: "faq",
  title: "ხშირად დასმული კითხვა",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "კითხვა",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "პასუხი",
      type: "array",
      description:
        "აბზაცები. ფასების ჩასასმელად გამოიყენეთ „ფასები (ავტომატური)“ — ის ყოველთვის აჩვენებს Sanity-ში შეყვანილ მიმდინარე ფასებს.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "ჩვეულებრივი", value: "normal" }],
          lists: [
            { title: "ბულეტები", value: "bullet" },
            { title: "ნომრები", value: "number" },
          ],
          marks: inlineMarks,
        }),
        defineArrayMember({
          type: "object",
          name: "priceSummary",
          title: "ფასები (ავტომატური)",
          description:
            "ჩასვამს კურსების მიმდინარე ფასებს — რედაქტირება ხდება „კურსის ფასი“-ში.",
          fields: [
            defineField({
              name: "note",
              type: "string",
              hidden: true,
              initialValue: "prices",
            }),
          ],
          preview: {
            prepare: () => ({ title: "ფასები (ავტომატური სია)" }),
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "რიგითობა",
      type: "number",
      description: "რაც უფრო მცირეა, მით უფრო ზემოთ ჩანს.",
      initialValue: 10,
    }),
    defineField({
      name: "visible",
      title: "ჩანს საიტზე",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "რიგითობა",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "question", visible: "visible", order: "order" },
    prepare: ({
      title,
      visible,
      order,
    }: {
      title?: string;
      visible?: boolean;
      order?: number;
    }) => ({
      title,
      subtitle: [order != null ? `#${order}` : null, visible === false ? "დამალულია" : null]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
