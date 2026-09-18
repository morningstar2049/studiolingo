import { defineField, defineType } from "sanity";

// Team members on /team ("ჩვენი გუნდი"). Once at least one member exists here,
// Sanity is the source of truth; src/components/Team/teamData.ts is only the
// fallback when the dataset is unreachable.
export const teamMember = defineType({
  name: "teamMember",
  title: "გუნდის წევრი",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "სახელი",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "პოზიცია",
      type: "string",
      initialValue: "ინგლისურის მასწავლებელი",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "ფოტო",
      type: "image",
      description:
        "ფონის გარეშე (გამჭვირვალე PNG ან WebP), ვერტიკალური 640×812, თავი ზედა ნაწილში — ისე, როგორც სხვა წევრებზე. ჩვეულებრივი ფოტო რომ გქონდეთ, გამომიგზავნეთ და მოვამზადებ.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube ვიდეო (გაიცანი)",
      type: "url",
      description:
        "მაგ. https://youtu.be/… (Unlisted ვიდეოც მუშაობს). ცარიელი ველი = გაიცანი ღილაკის გარეშე.",
    }),
    defineField({
      name: "order",
      title: "რიგითობა",
      type: "number",
      description: "რაც უფრო მცირეა, მით უფრო წინ ჩანს.",
      initialValue: 10,
    }),
    defineField({
      name: "visible",
      title: "ჩანს საიტზე",
      type: "boolean",
      description: "გამორთვისას წევრი დროებით ქრება გუნდის გვერდიდან.",
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
    select: {
      title: "name",
      role: "role",
      media: "photo",
      visible: "visible",
      video: "videoUrl",
    },
    prepare: ({
      title,
      role,
      media,
      visible,
      video,
    }: {
      title?: string;
      role?: string;
      media?: unknown;
      visible?: boolean;
      video?: string;
    }) => ({
      title,
      subtitle: [
        role,
        video ? "ვიდეოთი" : "ვიდეოს გარეშე",
        visible === false ? "დამალულია" : null,
      ]
        .filter(Boolean)
        .join(" · "),
      media: media as never,
    }),
  },
});
