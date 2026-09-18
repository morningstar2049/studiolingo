import { defineArrayMember, defineField, defineType } from "sanity";

// Homepage banner (single document, id "homeHero"). Desktop shows a slideshow
// of photos, each with its own headline; phones show one photo and the H1.
export const homeHero = defineType({
  name: "homeHero",
  title: "მთავარი ბანერი",
  type: "document",
  groups: [
    { name: "desktop", title: "კომპიუტერი", default: true },
    { name: "mobile", title: "მობილური" },
  ],
  fields: [
    defineField({
      name: "headline",
      title: "მთავარი სათაური (H1)",
      type: "string",
      group: ["desktop", "mobile"],
      description:
        "ჩანს მობილურზე ყოველთვის და კომპიუტერზე იმ სლაიდზე, რომელსაც საკუთარი წარწერა არ აქვს. Google-ისთვის ეს გვერდის მთავარი სათაურია.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slides",
      title: "სლაიდები (კომპიუტერი)",
      type: "array",
      group: "desktop",
      description:
        "ფოტოები ცვლილობს ყოველ 6.5 წამში. ჰორიზონტალური ფოტო, მინიმუმ 2560×1440. ფოტოზე „Edit“ → წერტილით აირჩიეთ, რა დარჩეს ხილული.",
      of: [
        defineArrayMember({
          type: "object",
          name: "heroSlide",
          title: "სლაიდი",
          fields: [
            defineField({
              name: "image",
              title: "ფოტო",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "alt",
              title: "ფოტოს აღწერა",
              type: "string",
              description: "რა ჩანს ფოტოზე — საჭიროა SEO-სთვის.",
            }),
            defineField({
              name: "caption",
              title: "წარწერა ამ სლაიდზე",
              type: "string",
              description: "ცარიელი ველი = ჩანს მთავარი სათაური (H1).",
            }),
            defineField({
              name: "captionWrap",
              title: "გრძელი წარწერა (ორ ხაზზე)",
              type: "boolean",
              description:
                "ჩართეთ, თუ წარწერა ერთ ხაზზე არ ეტევა — მაშინ ის H1-ის ზომით ორ ხაზზე გადავა.",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "caption", media: "image" },
            prepare: ({ title, media }: { title?: string; media?: unknown }) => ({
              title: title || "მთავარი სათაური (H1)",
              media: media as never,
            }),
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "mobileImage",
      title: "ფოტო მობილურზე",
      type: "image",
      group: "mobile",
      options: { hotspot: true },
      description: "ფოტოზე „Edit“ → წერტილით აირჩიეთ, რა დარჩეს ხილული ვიწრო ეკრანზე.",
    }),
    defineField({
      name: "mobileAlt",
      title: "მობილური ფოტოს აღწერა",
      type: "string",
      group: "mobile",
    }),
  ],
  preview: { prepare: () => ({ title: "მთავარი ბანერი" }) },
});
