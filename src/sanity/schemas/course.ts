import {
  defineArrayMember,
  defineField,
  defineType,
  type UrlRule,
} from "sanity";
import React from "react";

// Courses: one document per course page (/courses/<slug>). It holds the card
// shown on /courses and the homepage carousel, plus the description text of the
// course page. The page routes, calculator, reviews, SEO tags and card
// illustrations stay in code. The hard-coded content is the fallback when
// Sanity has no courses or can't be reached.

const swatchIcon = (hex: string) =>
  function ColorSwatch() {
    return React.createElement(
      "span",
      { style: { color: hex, fontWeight: 700, fontSize: "1.05em" } },
      "A",
    );
  };

export const courseTextMarks = {
  decorators: [
    { title: "Bold", value: "strong" },
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
            "მაგ. https://… ან საიტის შიდა გვერდი: /language-test, /courses/group-online",
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

// Fixed sections whose content lives in code; inserting them only sets where
// they appear in the text.
const fixedSection = (name: string, title: string) =>
  defineArrayMember({
    type: "object",
    name,
    title,
    fields: [
      defineField({
        name: "placeholder",
        type: "string",
        hidden: true,
        initialValue: name,
      }),
    ],
    preview: { prepare: () => ({ title }) },
  });

export const course = defineType({
  name: "course",
  title: "კურსი",
  type: "document",
  groups: [
    { name: "card", title: "ბარათი (კურსების სია)", default: true },
    { name: "page", title: "კურსის გვერდი" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "კურსის სახელი",
      type: "string",
      group: ["card", "page"],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "გვერდის მისამართი",
      type: "string",
      group: "card",
      readOnly: true,
      description:
        "studiolingo.ge/courses/… — იცვლება მხოლოდ კოდში, რადგან თითოეულ კურსს საკუთარი გვერდი აქვს.",
    }),
    defineField({
      name: "order",
      title: "რიგითობა",
      type: "number",
      group: "card",
      description: "რაც უფრო მცირეა, მით უფრო წინ ჩანს /courses-ზე და მთავარ გვერდზე.",
    }),
    defineField({
      name: "chips",
      title: "ნიშნები ბარათზე",
      type: "array",
      group: "card",
      of: [{ type: "string" }],
      description: "ორი მოკლე სიტყვა, მაგ. ონლაინ, ჯგუფური.",
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "cardText",
      title: "მოკლე აღწერა ბარათზე",
      type: "text",
      rows: 3,
      group: "card",
    }),
    defineField({
      name: "heroSubtitle",
      title: "ქვესათაური გვერდის თავში",
      type: "text",
      rows: 3,
      group: "page",
    }),
    defineField({
      name: "body",
      title: "კურსის ტექსტი",
      type: "array",
      group: "page",
      description:
        "აბზაცები, ქვესათაურები, YouTube ვიდეოები და ფოტოები. „ხელსაწყოები“ და „საშინაო დავალებები“ მზა სექციებია — მხოლოდ მათ ადგილს ირჩევთ.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "ჩვეულებრივი", value: "normal" },
            { title: "ქვესათაური", value: "h3" },
          ],
          lists: [],
          marks: courseTextMarks,
        }),
        defineArrayMember({
          type: "object",
          name: "youtube",
          title: "YouTube ვიდეო",
          fields: [
            defineField({
              name: "url",
              title: "ვიდეოს ბმული",
              type: "url",
              description: "მაგ. https://youtu.be/…",
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
        }),
        defineArrayMember({
          type: "image",
          name: "coursePhoto",
          title: "ფოტო",
          fields: [
            defineField({
              name: "alt",
              title: "ფოტოს აღწერა",
              type: "string",
              description: "რა ჩანს ფოტოზე — საჭიროა SEO-სთვის.",
            }),
          ],
        }),
        fixedSection("toolsSection", "სექცია: ხელსაწყოები"),
        fixedSection("homeworkSection", "სექცია: საშინაო დავალებები"),
      ],
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
    select: { title: "title", slug: "slug" },
    prepare: ({ title, slug }: { title?: string; slug?: string }) => ({
      title,
      subtitle: `/courses/${slug ?? ""}`,
    }),
  },
});
