import { defineArrayMember, defineField, defineType, type UrlRule } from "sanity";

// The site footer (single document, id "footer"): the text under the logo, the
// contact details, the link column, the copyright line and the two legal texts
// that open in a window ("წესები და პირობები", "კონფიდენციალურობის პოლიტიკა").
// The rules text is also shown in the adult registration form, so both always
// match. An empty field keeps the text written in code.

const legalMarks = {
  decorators: [
    { title: "Bold", value: "strong" },
    { title: "ხაზგასმული", value: "underline" },
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

const legalBlock = defineArrayMember({
  type: "block",
  styles: [{ title: "ჩვეულებრივი", value: "normal" }],
  lists: [
    { title: "ბულეტები", value: "bullet" },
    { title: "ნომრები", value: "number" },
  ],
  marks: legalMarks,
});

export const footer = defineType({
  name: "footer",
  title: "ფუტერი (ქვედა ზოლი)",
  type: "document",
  groups: [
    { name: "main", title: "ტექსტი და კონტაქტი", default: true },
    { name: "links", title: "ბმულები" },
    { name: "legal", title: "წესები და კონფიდენციალურობა" },
  ],
  fields: [
    defineField({
      name: "tagline",
      title: "ტექსტი ლოგოს ქვეშ",
      type: "text",
      rows: 3,
      group: "main",
    }),
    defineField({
      name: "contactHeading",
      title: "კონტაქტის სათაური",
      type: "string",
      group: "main",
      initialValue: "კონტაქტი",
    }),
    defineField({
      name: "phone",
      title: "ტელეფონი",
      type: "string",
      group: "main",
      description: "ისე დაწერეთ, როგორც საიტზე უნდა ჩანდეს — მაგ. +995 32 2 114 623.",
    }),
    defineField({
      name: "email",
      title: "ელ. ფოსტა",
      type: "string",
      group: "main",
    }),
    defineField({
      name: "address",
      title: "მისამართი",
      type: "string",
      group: "main",
    }),
    defineField({
      name: "mapUrl",
      title: "რუკის ბმული",
      type: "url",
      group: "main",
      description: "მისამართზე დაჭერით გაიხსნება ეს ბმული.",
    }),

    defineField({
      name: "linksHeading",
      title: "ბმულების სათაური",
      type: "string",
      group: "links",
      initialValue: "ბმულები",
    }),
    defineField({
      name: "links",
      title: "ბმულების სია",
      type: "array",
      group: "links",
      description:
        "რიგითობა ისეთივეა, როგორც აქ. „წესები“ და „კონფიდენციალურობა“ ფანჯარას ხსნის, დანარჩენი — საიტის გვერდს.",
      of: [
        defineArrayMember({
          type: "object",
          name: "footerLink",
          title: "ბმული",
          fields: [
            defineField({
              name: "label",
              title: "დასახელება",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "kind",
              title: "ტიპი",
              type: "string",
              initialValue: "page",
              options: {
                list: [
                  { title: "საიტის გვერდი", value: "page" },
                  { title: "ფანჯარა: წესები და პირობები", value: "terms" },
                  {
                    title: "ფანჯარა: კონფიდენციალურობის პოლიტიკა",
                    value: "privacy",
                  },
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "მისამართი",
              type: "string",
              description: "მაგ. /courses, /prices, /faq — მხოლოდ გვერდის ტიპისთვის.",
              hidden: ({ parent }) =>
                (parent as { kind?: string })?.kind !== "page",
            }),
          ],
          preview: {
            select: { title: "label", kind: "kind", href: "href" },
            prepare: ({
              title,
              kind,
              href,
            }: {
              title?: string;
              kind?: string;
              href?: string;
            }) => ({
              title,
              subtitle:
                kind === "page" ? href : kind === "terms" ? "ფანჯარა: წესები" : "ფანჯარა: კონფიდენციალურობა",
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "copyright",
      title: "ქვედა ხაზი",
      type: "string",
      group: "links",
      initialValue: "© Studio Lingo — ყველა უფლება დაცულია",
    }),

    defineField({
      name: "termsTitle",
      title: "ფანჯრის სათაური: წესები",
      type: "string",
      group: "legal",
      initialValue: "წესები და პირობები",
    }),
    defineField({
      name: "terms",
      title: "წესები და პირობები",
      type: "array",
      group: "legal",
      description:
        "ჩანს ფუტერის ფანჯარაში და ზრდასრულთა რეგისტრაციის ფორმაშიც — ორივეგან ერთი და იგივე ტექსტია.",
      of: [legalBlock],
    }),
    defineField({
      name: "privacyTitle",
      title: "ფანჯრის სათაური: კონფიდენციალურობა",
      type: "string",
      group: "legal",
      initialValue: "კონფიდენციალურობის პოლიტიკა",
    }),
    defineField({
      name: "privacy",
      title: "კონფიდენციალურობის პოლიტიკა",
      type: "array",
      group: "legal",
      of: [legalBlock],
    }),
  ],
  preview: { prepare: () => ({ title: "ფუტერი (ქვედა ზოლი)" }) },
});
