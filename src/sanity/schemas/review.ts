import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "შეფასება",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "სახელი",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "შეფასება (1-5)",
      type: "number",
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "text",
      title: "ტექსტი",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "რიგითობა",
      type: "number",
      description: "რაც უფრო მცირეა, მით უფრო წინ ჩანს.",
      initialValue: 0,
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
    select: { title: "author", subtitle: "text" },
  },
});
