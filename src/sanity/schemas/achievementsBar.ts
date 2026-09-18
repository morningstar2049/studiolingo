import { defineArrayMember, defineField, defineType } from "sanity";

// The three numbers under the homepage banner (single document, id
// "achievementsBar").
export const achievementsBar = defineType({
  name: "achievementsBar",
  title: "მიღწევების ზოლი",
  type: "document",
  fields: [
    defineField({
      name: "stats",
      title: "მიღწევები",
      type: "array",
      description: "ზუსტად სამი — ზოლი სამ სვეტად არის აწყობილი.",
      of: [
        defineArrayMember({
          type: "object",
          name: "achievementStat",
          title: "მიღწევა",
          fields: [
            defineField({
              name: "value",
              title: "რიცხვი",
              type: "number",
              description: "მაგ. 3000 — საიტზე 0-დან ითვლის ამ რიცხვამდე.",
              validation: (rule) => rule.required().min(0),
            }),
            defineField({
              name: "suffix",
              title: "რიცხვის შემდეგ",
              type: "string",
              initialValue: "+",
            }),
            defineField({
              name: "group",
              title: "ათასების გამოყოფა (300 000)",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "label",
              title: "წარწერა",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "shortLabel",
              title: "მოკლე წარწერა მობილურზე",
              type: "string",
              description: "არასავალდებულო — თუ წარწერა მობილურზე არ ეტევა.",
            }),
          ],
          preview: {
            select: { value: "value", suffix: "suffix", label: "label" },
            prepare: ({
              value,
              suffix,
              label,
            }: {
              value?: number;
              suffix?: string;
              label?: string;
            }) => ({ title: `${value ?? ""}${suffix ?? ""} ${label ?? ""}` }),
          },
        }),
      ],
      validation: (rule) => rule.required().length(3),
    }),
  ],
  preview: { prepare: () => ({ title: "მიღწევების ზოლი" }) },
});
