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

// Editor preview of the heading styles, at the same proportions as the
// published article (h2 1.5×, h3 1.25× the body text).
const headingPreview = (tag: "h2" | "h3", fontSize: string) =>
  function HeadingPreview(props: { children?: React.ReactNode }) {
    return React.createElement(
      tag,
      { style: { fontSize, fontWeight: 700, lineHeight: 1.3, margin: 0 } },
      props.children
    );
  };

// "დიდი ასოები": capitals in the editor too — Georgian via FiraGO's `case`
// feature (the site font is loaded in the Studio), Latin via uppercase.
const capsStyle = {
  fontFamily: "var(--font-firago), sans-serif",
  fontFeatureSettings: "'case' on",
  textTransform: "uppercase",
} as const;
function CapsPreview(props: { children?: React.ReactNode }) {
  return React.createElement("span", { style: capsStyle }, props.children);
}
function CapsIcon() {
  return React.createElement(
    "span",
    { style: { ...capsStyle, fontWeight: 700, fontSize: "0.9em" } },
    "აა"
  );
}

// Inline photo shapes (cropped around the focal point chosen in the editor).
export const POST_IMAGE_SHAPES = [
  { title: "ორიგინალი (მოჭრის გარეშე)", value: "original" },
  { title: "ჰორიზონტალური 16:9", value: "16:9" },
  { title: "ჰორიზონტალური 4:3", value: "4:3" },
  { title: "კვადრატი 1:1", value: "1:1" },
  { title: "ვერტიკალური 4:5", value: "4:5" },
];

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
            {
              title: "სათაური 2",
              value: "h2",
              component: headingPreview("h2", "22px"),
            },
            {
              title: "სათაური 3",
              value: "h3",
              component: headingPreview("h3", "19px"),
            },
            { title: "ციტატა", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              {
                title: "დიდი ასოები",
                value: "caps",
                icon: CapsIcon,
                component: CapsPreview,
              },
              { title: "მწვანე", value: "green", icon: swatchIcon("#2f9e4d") },
              {
                // Same navy as the article headline band.
                title: "ლურჯი",
                value: "blue",
                icon: swatchIcon("#2a375c"),
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
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "ფოტოს აღწერა",
              type: "string",
              description: "რა ჩანს ფოტოზე — საჭიროა SEO-სთვის.",
            }),
            defineField({
              name: "shape",
              title: "ფორმა სტატიაში",
              type: "string",
              description:
                "ფოტო ამ ფორმით მოიჭრება. რომელი ნაწილი დარჩეს, ირჩევთ ფოტოზე ✂️ (Crop) ღილაკით — წრე (მთავარი წერტილი) გადაათრიეთ იმ ადგილზე, რაც აუცილებლად უნდა ჩანდეს. იქ ნაჩვენები პატარა სურათები მხოლოდ მაგალითებია და მათზე დაჭერა არაფერს ცვლის.",
              initialValue: "original",
              options: {
                list: POST_IMAGE_SHAPES,
                layout: "radio",
              },
            }),
          ],
        },
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
        {
          type: "object",
          name: "divider",
          title: "ჰორიზონტალური ხაზი",
          // No settings needed — insert it to add a horizontal line. The hidden
          // field only satisfies Sanity's "objects must have a field" rule.
          fields: [
            {
              name: "style",
              type: "string",
              hidden: true,
              initialValue: "line",
            },
          ],
          icon: () =>
            React.createElement(
              "span",
              { style: { fontWeight: 700, fontSize: "1.1em" } },
              "―"
            ),
          // Render the inserted block as a plain horizontal line in the editor
          // (no label text) — matches how it looks in the published article.
          components: {
            preview: () =>
              React.createElement("hr", {
                style: {
                  border: 0,
                  borderTop: "2px solid #111111",
                  margin: "10px 0",
                },
              }),
          },
          preview: { prepare: () => ({ title: "" }) },
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
