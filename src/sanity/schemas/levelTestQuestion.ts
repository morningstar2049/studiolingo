import { defineArrayMember, defineField, defineType } from "sanity";

// Questions of the English level test (/language-test). The test runs level by
// level (A1 → C1) and stops at the visitor's level: each level is 7 choice
// questions (1 point) + 1 listening question (2 points), and losing 3 points in
// a level ends the test. Once at least one question exists here, Sanity is the
// question bank; src/app/api/lang-test/questions.json is only the fallback.

export const LEVEL_TEST_LEVELS = ["A1", "A2", "B1", "B1+", "B2", "C1"] as const;

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

type QuestionDoc = { kind?: string; choices?: string[] };

export const levelTestQuestion = defineType({
  name: "levelTestQuestion",
  title: "დონის ტესტის კითხვა",
  type: "document",
  fields: [
    defineField({
      name: "level",
      title: "დონე",
      type: "string",
      options: {
        list: LEVEL_TEST_LEVELS.map((l) => ({ title: l, value: l })),
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "რიგითობა დონის შიგნით",
      type: "number",
      description: "1, 2, 3… — რაც უფრო მცირეა, მით უფრო ადრე ჩნდება ამ დონეზე.",
      initialValue: 10,
    }),
    defineField({
      name: "kind",
      title: "კითხვის ტიპი",
      type: "string",
      initialValue: "choice",
      options: {
        list: [
          { title: "სავარაუდო პასუხებით (1 ქულა)", value: "choice" },
          { title: "მოსასმენი — ჩაწერს პასუხს (2 ქულა)", value: "listening" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "question",
      title: "კითხვა",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),

    // ── Choice question ──────────────────────────────────────────────────
    defineField({
      name: "choices",
      title: "სავარაუდო პასუხები",
      type: "array",
      of: [{ type: "string" }],
      description: "ზემოდან ქვემოთ — A, B, C, D.",
      hidden: ({ parent }) => (parent as QuestionDoc)?.kind === "listening",
      validation: (rule) =>
        rule.custom((choices, ctx) => {
          if ((ctx.parent as QuestionDoc)?.kind === "listening") return true;
          const list = (choices as string[] | undefined) ?? [];
          if (list.length < 2) return "მინიმუმ ორი პასუხი";
          if (list.length > OPTION_LETTERS.length) return "მაქსიმუმ ექვსი პასუხი";
          if (new Set(list).size !== list.length)
            return "ორი ერთნაირი პასუხი არ უნდა იყოს";
          return true;
        }),
    }),
    defineField({
      name: "correctOption",
      title: "სწორი პასუხი",
      type: "number",
      options: {
        list: OPTION_LETTERS.map((letter, i) => ({ title: letter, value: i })),
        layout: "radio",
        direction: "horizontal",
      },
      hidden: ({ parent }) => (parent as QuestionDoc)?.kind === "listening",
      validation: (rule) =>
        rule.custom((value, ctx) => {
          const parent = ctx.parent as QuestionDoc;
          if (parent?.kind === "listening") return true;
          if (typeof value !== "number") return "აირჩიეთ სწორი პასუხი";
          if (value >= (parent?.choices?.length ?? 0))
            return "ასეთი ვარიანტი სიაში არ არის";
          return true;
        }),
    }),

    // ── Listening question ───────────────────────────────────────────────
    defineField({
      name: "audio",
      title: "აუდიო ფაილი",
      type: "file",
      options: { accept: "audio/*" },
      description: "MP3 — ვიზიტორი უსმენს და ჩაწერს სიტყვას.",
      hidden: ({ parent }) => (parent as QuestionDoc)?.kind !== "listening",
      validation: (rule) =>
        rule.custom((value, ctx) =>
          (ctx.parent as QuestionDoc)?.kind === "listening" &&
          !(value as { asset?: unknown } | undefined)?.asset
            ? "ატვირთეთ აუდიო"
            : true,
        ),
    }),
    defineField({
      name: "listeningAnswer",
      title: "სწორი პასუხი (ჩასაწერი სიტყვა)",
      type: "string",
      description:
        "დიდ-პატარა ასოებს და ზედმეტ ჰარებს ტესტი არ ითვალისწინებს.",
      hidden: ({ parent }) => (parent as QuestionDoc)?.kind !== "listening",
      validation: (rule) =>
        rule.custom((value, ctx) =>
          (ctx.parent as QuestionDoc)?.kind === "listening" && !value?.trim()
            ? "ჩაწერეთ სწორი პასუხი"
            : true,
        ),
    }),
    defineField({
      name: "alsoAccepted",
      title: "სხვა მისაღები პასუხები (ქულით)",
      type: "array",
      description:
        "მაგ. photograph-ის ნაცვლად fotograph — 1 ქულა. ზუსტი პასუხი ყოველთვის 2 ქულაა. დიდ-პატარა ასოებსა და ზედმეტ ჰარებს ტესტი არ ითვალისწინებს.",
      hidden: ({ parent }) => (parent as QuestionDoc)?.kind !== "listening",
      of: [
        defineArrayMember({
          type: "object",
          name: "acceptedAnswer",
          title: "ვარიანტი",
          fields: [
            defineField({
              name: "answer",
              title: "პასუხი",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "points",
              title: "ქულა",
              type: "number",
              initialValue: 1,
              options: {
                list: [
                  { title: "1 ქულა", value: 1 },
                  { title: "2 ქულა (სრული)", value: 2 },
                ],
                layout: "radio",
                direction: "horizontal",
              },
              validation: (rule) => rule.required().min(1).max(2),
            }),
          ],
          preview: {
            select: { title: "answer", points: "points" },
            prepare: ({ title, points }: { title?: string; points?: number }) => ({
              title,
              subtitle: `${points ?? 1} ქულა`,
            }),
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "დონე და რიგითობა",
      name: "levelOrder",
      by: [
        { field: "level", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { question: "question", level: "level", kind: "kind", order: "order" },
    prepare: ({
      question,
      level,
      kind,
      order,
    }: {
      question?: string;
      level?: string;
      kind?: string;
      order?: number;
    }) => ({
      title: question,
      subtitle: [
        level,
        order != null ? `#${order}` : null,
        kind === "listening" ? "მოსასმენი" : null,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
