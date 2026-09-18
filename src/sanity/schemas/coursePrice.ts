import { defineField, defineType } from "sanity";

// Course prices for the price calculator (course pages) and the installment
// page (/buy-course). One document per combination. Once at least one price
// exists here, Sanity is the source of truth; src/lib/priceTable.ts is only the
// fallback when the dataset is unreachable.

export const PRICE_COURSES = [
  { title: "ინგლისური — ზრდასრულები", value: "english" },
  { title: "ინგლისური — მოზარდები", value: "englishForTeens" },
  { title: "ინგლისური — ბავშვები", value: "englishForKids" },
];
const FORMATS = ["ონლაინ", "ოფისში"];
const LESSON_TYPES = ["ინდივიდუალური", "ორმოსწავლიანი", "ჯგუფური"];
const FREQUENCIES = ["კვირაში 2-ჯერ", "კვირაში 3-ჯერ"];

export const coursePrice = defineType({
  name: "coursePrice",
  title: "ფასი",
  type: "document",
  fields: [
    defineField({
      name: "course",
      title: "კურსი",
      type: "string",
      options: { list: PRICE_COURSES, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "format",
      title: "ფორმატი",
      type: "string",
      options: { list: FORMATS, layout: "radio", direction: "horizontal" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lessonType",
      title: "გაკვეთილის ტიპი",
      type: "string",
      options: { list: LESSON_TYPES, layout: "radio", direction: "horizontal" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "frequency",
      title: "სიხშირე",
      type: "string",
      options: { list: FREQUENCIES, layout: "radio", direction: "horizontal" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "ფასი (₾)",
      type: "number",
      description: "კურსის სრული ფასი ლარში, მაგ. 1600.",
      validation: (rule) => rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: "კურსი",
      name: "byCourse",
      by: [
        { field: "course", direction: "asc" },
        { field: "format", direction: "asc" },
        { field: "lessonType", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      course: "course",
      format: "format",
      lessonType: "lessonType",
      frequency: "frequency",
      price: "price",
    },
    prepare: ({
      course,
      format,
      lessonType,
      frequency,
      price,
    }: {
      course?: string;
      format?: string;
      lessonType?: string;
      frequency?: string;
      price?: number;
    }) => ({
      title: `${price ?? "—"} ₾ · ${lessonType ?? ""} · ${frequency ?? ""}`,
      subtitle: `${
        PRICE_COURSES.find((c) => c.value === course)?.title ?? course ?? ""
      } · ${format ?? ""}`,
    }),
  },
});
