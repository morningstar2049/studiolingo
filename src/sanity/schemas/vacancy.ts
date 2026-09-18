import { defineArrayMember, defineField, defineType, type UrlRule } from "sanity";
import React from "react";

// Vacancies (/career and /career/<slug>). Field titles are in Georgian because
// the Studio is used by the school's own team. Once at least one vacancy exists
// here, Sanity is the source of truth for the career pages; the hard-coded
// positionData only serves as a fallback when the dataset is unreachable.

const swatchIcon = (hex: string) =>
  function ColorSwatch() {
    return React.createElement(
      "span",
      { style: { color: hex, fontWeight: 700, fontSize: "1.05em" } },
      "A",
    );
  };

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
          description: "მაგ. https://… ან საიტის შიდა გვერდი: /career/academyInternship",
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

// One block = one bullet point (no headings, no nested lists).
const itemBlock = defineArrayMember({
  type: "block",
  styles: [{ title: "ჩვეულებრივი", value: "normal" }],
  lists: [],
  marks: inlineMarks,
});

// Free text with paragraphs and numbered / bulleted lists.
const richBlock = defineArrayMember({
  type: "block",
  styles: [{ title: "ჩვეულებრივი", value: "normal" }],
  lists: [
    { title: "ბულეტები", value: "bullet" },
    { title: "ნომრები", value: "number" },
  ],
  marks: inlineMarks,
});

export const vacancy = defineType({
  name: "vacancy",
  title: "ვაკანსია",
  type: "document",
  groups: [
    { name: "card", title: "ბარათი (ვაკანსიების სია)", default: true },
    { name: "page", title: "ვაკანსიის გვერდი" },
    { name: "apply", title: "განაცხადი" },
    { name: "seo", title: "გაზიარების სურათი" },
  ],
  fields: [
    // ── Card (/career list) ─────────────────────────────────────────────
    defineField({
      name: "title",
      title: "პოზიციის სახელი",
      type: "string",
      group: ["card", "page"],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "მისამართი (URL)",
      type: "slug",
      group: "card",
      description:
        "ლათინური ასოებით, მაგ. englishTeacher → studiolingo.ge/career/englishTeacher. გამოქვეყნების შემდეგ ნუ შეცვლით, თორემ ძველი ბმულები გატყდება.",
      options: { source: "title", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isOpen",
      title: "ვაკანსია ღიაა",
      type: "boolean",
      group: "card",
      description:
        "გამორთვისას ვაკანსია ქრება სიიდან და მის გვერდზე ჩანს „ვაკანსია დახურულია“.",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "რიგითობა სიაში",
      type: "number",
      group: "card",
      description: "რაც უფრო მცირეა, მით უფრო ზემოთ ჩანს.",
      initialValue: 10,
    }),
    defineField({
      name: "listBadge",
      title: "ბარათის სტატუსი",
      type: "string",
      group: "card",
      initialValue: "ღია ვაკანსია",
    }),
    defineField({
      name: "location",
      title: "ლოკაცია",
      type: "string",
      group: ["card", "page"],
      initialValue: "თბილისი",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "timeLabel",
      title: "მეორე ველის სათაური",
      type: "string",
      group: "card",
      description: "მაგ. განაკვეთი ან პერიოდი.",
      initialValue: "განაკვეთი",
    }),
    defineField({
      name: "time",
      title: "მეორე ველის მნიშვნელობა",
      type: "string",
      group: ["card", "page"],
      description: "მაგ. (არა)სრული ან 3 თვე. ჩანს ბარათზეც და გვერდის სათაურშიც.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "salaryLabel",
      title: "მესამე ველის სათაური",
      type: "string",
      group: "card",
      description: "მაგ. ანაზღაურება ან გადასახადი.",
      initialValue: "ანაზღაურება",
    }),
    defineField({
      name: "listSalary",
      title: "მესამე ველის მნიშვნელობა (ბარათზე)",
      type: "string",
      group: "card",
      description: "მაგ. მაღალი ან უფასო.",
    }),

    // ── Vacancy page ─────────────────────────────────────────────────────
    defineField({
      name: "statusBadge",
      title: "სტატუსის ნიშანი სათაურზე",
      type: "string",
      group: "page",
      initialValue: "ვაკანსია ღიაა",
    }),
    defineField({
      name: "salaryType",
      title: "ანაზღაურება სათაურის ზოლში",
      type: "string",
      group: "page",
      description: "მაგ. კონკურენტული ან უფასო კურსი.",
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube ვიდეო (ტექსტის თავში)",
      type: "url",
      group: "page",
      description: "მაგ. https://youtu.be/… — ცარიელი ველი = ვიდეოს გარეშე.",
    }),
    defineField({
      name: "intro",
      title: "შესავალი",
      type: "text",
      rows: 3,
      group: "page",
    }),
    defineField({
      name: "sections",
      title: "სექციები (სათაური + პუნქტები)",
      type: "array",
      group: "page",
      description:
        "მაგ. ძირითადი მოვალეობებია, თქვენგან ვითხოვთ, რომ, ჩვენი გუნდი გთავაზობთ. თითო აბზაცი = თითო პუნქტი.",
      of: [
        defineArrayMember({
          type: "object",
          name: "vacancySection",
          title: "სექცია",
          fields: [
            defineField({
              name: "heading",
              title: "სათაური",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "icon",
              title: "აიკონი",
              type: "string",
              initialValue: "list",
              options: {
                list: [
                  { title: "სია", value: "list" },
                  { title: "მონიშვნა", value: "check" },
                  { title: "საჩუქარი", value: "gift" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
            }),
            defineField({
              name: "highlight",
              title: "მწვანე ფონით",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "items",
              title: "პუნქტები",
              type: "array",
              of: [itemBlock],
            }),
          ],
          preview: {
            select: { title: "heading", items: "items" },
            prepare: ({ title, items }: { title?: string; items?: unknown[] }) => ({
              title,
              subtitle: `${items?.length ?? 0} პუნქტი`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "infoBox",
      title: "პირობების ბლოკი (მწვანე ყუთი)",
      type: "array",
      group: "page",
      description: "სამუშაოს ტიპი, გრაფიკი, ანაზღაურება… შეგიძლიათ დაამატოთ ნომრიანი ან ბულეტებიანი სია.",
      of: [richBlock],
    }),
    defineField({
      name: "closingText",
      title: "დასკვნითი ტექსტი",
      type: "array",
      group: "page",
      of: [itemBlock],
    }),

    // ── Apply ────────────────────────────────────────────────────────────
    defineField({
      name: "googleFormLink",
      title: "Google ფორმის ბმული",
      type: "url",
      group: "apply",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "consentText",
      title: "დასტურის ტექსტი (ფანჯარაში)",
      type: "string",
      group: "apply",
      initialValue: "ყურადღებით გავეცანი ვაკანსიის აღწერილობას და ვეთანხმები",
    }),
    defineField({
      name: "hideHeroApply",
      title: "დამალე ღილაკი სათაურის ზოლში",
      type: "boolean",
      group: "apply",
      description: "ქვედა ღილაკი ყოველთვის ჩანს.",
      initialValue: true,
    }),

    // ── Share image ──────────────────────────────────────────────────────
    defineField({
      name: "metaImage",
      title: "გაზიარების სურათი",
      type: "image",
      group: "seo",
      description:
        "ჩანს LinkedIn-სა და Facebook-ზე ბმულის გაზიარებისას. იდეალური ზომა 2400×1260.",
    }),
    defineField({
      name: "metaImageUrl",
      title: "ან სურათის ბმული",
      type: "url",
      group: "seo",
      description: "გამოიყენება მხოლოდ მაშინ, როცა ზემოთ სურათი არ არის ატვირთული.",
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
    select: { title: "title", isOpen: "isOpen", slug: "slug.current" },
    prepare: ({
      title,
      isOpen,
      slug,
    }: {
      title?: string;
      isOpen?: boolean;
      slug?: string;
    }) => ({
      title,
      subtitle: `${isOpen ? "ღიაა" : "დახურულია"} · /career/${slug ?? ""}`,
    }),
  },
});
