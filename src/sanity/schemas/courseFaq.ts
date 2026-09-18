import { defineArrayMember, defineField, defineType } from "sanity";
import { courseTextMarks } from "./course";

// "თუ გიჭირს კურსის არჩევა" questions under the course cards on /courses.
export const courseFaq = defineType({
  name: "courseFaq",
  title: "კურსის კითხვა",
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
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "ჩვეულებრივი", value: "normal" }],
          lists: [],
          marks: courseTextMarks,
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
  ],
  orderings: [
    {
      title: "რიგითობა",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "question" } },
});
