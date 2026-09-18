import { defineArrayMember, defineField, defineType } from "sanity";

// Every text of the level test (/language-test) plus the result email that the
// school receives (single document, id "levelTestTexts"). An empty field keeps
// the text written in code (src/app/language-test/levelTestTexts.ts and
// src/app/api/level-test-result/email.ts).

const EMAIL_FIELD_OPTIONS = [
  { title: "სახელი", value: "firstName" },
  { title: "გვარი", value: "lastName" },
  { title: "ელ. ფოსტა", value: "email" },
  { title: "ტელეფონი", value: "phone" },
  { title: "ასაკი", value: "age" },
  { title: "შედეგი (მაგ. Intermediate)", value: "result" },
  { title: "დონე (CEFR, მაგ. B1)", value: "level" },
  { title: "რომელი დონიდან დაიწყოს", value: "recommendedLevel" },
  { title: "დაკავშირება სურს? (კი/არა)", value: "contactMe" },
  { title: "სწორი პასუხები (მაგ. 20 / 24)", value: "correctCount" },
  { title: "მოსმენის შეცდომები", value: "listeningMistakes" },
  { title: "ქულა ჯამში", value: "totalPoints" },
  { title: "ქულები დონეების მიხედვით", value: "levelScores" },
];

const str = (name: string, title: string, group: string, description?: string) =>
  defineField({ name, title, type: "string", group, description });
const txt = (name: string, title: string, group: string, rows = 3) =>
  defineField({ name, title, type: "text", rows, group });

export const levelTestTexts = defineType({
  name: "levelTestTexts",
  title: "დონის ტესტი — ტექსტები",
  type: "document",
  groups: [
    { name: "intro", title: "შესავალი ბარათი", default: true },
    { name: "form", title: "მონაცემების ფორმა" },
    { name: "question", title: "კითხვის ეკრანი" },
    { name: "result", title: "შედეგი" },
    { name: "email", title: "შედეგის ელფოსტა" },
  ],
  fields: [
    // ── Intro card ───────────────────────────────────────────────────────
    str("badge", "მწვანე ნიშანი ზემოთ", "intro", "ჩანს ფორმაზეც და შესავალ ბარათზეც."),
    str("introHeadline", "სათაური", "intro"),
    str("introSubtitle", "ქვესათაური", "intro"),
    defineField({
      name: "introStats",
      title: "ოთხი ბლოკი",
      type: "array",
      group: "intro",
      description:
        "ზუსტად ოთხი. აიკონები რიგით: კითხვები, დრო, მორგებული, დონეები. კითხვების რაოდენობას ხელით ცვლით, თუ კითხვებს დაამატებთ.",
      of: [
        defineArrayMember({
          type: "object",
          name: "levelTestStat",
          fields: [
            defineField({ name: "value", title: "დიდი ტექსტი", type: "string" }),
            defineField({ name: "label", title: "პატარა ტექსტი", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
      validation: (rule) => rule.length(4),
    }),
    str("listeningNote", "ხაზი 1 (მოსმენის აიკონით)", "intro"),
    str("speakingNote", "ხაზი 2 (მიკროფონის აიკონით)", "intro"),
    str("startButton", "ღილაკი", "intro"),

    // ── Form ─────────────────────────────────────────────────────────────
    str("formHeadline", "სათაური", "form"),
    str("formSubtitle", "ქვესათაური", "form"),
    str("firstNameLabel", "ველი: სახელი", "form"),
    str("lastNameLabel", "ველი: გვარი", "form"),
    str("emailLabel", "ველი: ელ. ფოსტა", "form"),
    str("phoneLabel", "ველი: ტელეფონი", "form"),
    str("ageLabel", "ველი: ასაკი", "form"),
    str("contactMeLabel", "მოსანიშნი ველი", "form"),
    str("submitButton", "ღილაკი", "form"),
    txt("privacyNote", "პატარა ტექსტი ღილაკის ქვეშ", "form", 2),

    // ── Question screen ──────────────────────────────────────────────────
    str("questionLabel", "„კითხვა“ (ნომრის წინ)", "question"),
    str("listeningHint", "მინიშნება მოსასმენ კითხვაზე", "question"),
    str("answerPlaceholder", "პასუხის ველი (მოსასმენი)", "question"),
    str("nextButton", "ღილაკი: შემდეგი", "question"),
    str("finishButton", "ღილაკი: ბოლო კითხვაზე", "question"),

    // ── Result ───────────────────────────────────────────────────────────
    str("resultIntro", "ტექსტი დონის თავზე", "result"),
    str("detailsButton", "ღილაკი: დეტალურად", "result"),
    str("hideButton", "ღილაკი: დამალვა", "result"),
    str("courseButton", "მწვანე ღილაკი", "result"),
    str("courseLink", "მწვანე ღილაკის ბმული", "result", "მაგ. /courses ან /courses/group-online"),
    str("retakeButton", "თავიდან გავლის ღილაკი", "result"),
    txt("beginner", "აღწერა: Beginner — სრულიად დამწყები", "result", 5),
    txt("a1", "აღწერა: Elementary − (A1)", "result", 5),
    txt("a2", "აღწერა: Elementary (A2)", "result", 5),
    txt("b1", "აღწერა: Intermediate (B1)", "result", 5),
    txt("b1plus", "აღწერა: Intermediate + (B1+)", "result", 5),
    txt("b2", "აღწერა: Upp. Intermediate (B2)", "result", 5),
    txt("c1", "აღწერა: Advanced (C1)", "result", 5),

    // ── Result email ─────────────────────────────────────────────────────
    defineField({
      name: "emailRecipients",
      title: "მიმღები მისამართები",
      type: "array",
      group: "email",
      of: [{ type: "string" }],
      description:
        "ვის მოსდის შედეგი. ცარიელი = info@studiolingo.ge. ახალი მისამართის დამატების შემდეგ ერთი ტესტი გაიარეთ და შეამოწმეთ, რომ წერილი მოვიდა.",
      validation: (rule) =>
        rule.custom((list) =>
          ((list as string[] | undefined) ?? []).every((v) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
          )
            ? true
            : "ერთ-ერთი მისამართი არასწორია",
        ),
    }),
    str(
      "emailSubject",
      "სათაური (Subject)",
      "email",
      "ჩაისმება: {name} = სახელი და გვარი, {contact} = კი/არა (სურს თუ არა დაკავშირება), {result} = შედეგი, {level} = დონე.",
    ),
    str("emailHeading", "მწვანე სათაური წერილში", "email"),
    defineField({
      name: "emailRows",
      title: "ველები წერილში (რიგით)",
      type: "array",
      group: "email",
      description:
        "რომელი მონაცემი ჩანს წერილის თავში, რა სახელით და რა რიგით. გადაათრიეთ რიგის შესაცვლელად; წაშლილი ველი წერილში აღარ ჩანს.",
      of: [
        defineArrayMember({
          type: "object",
          name: "levelTestEmailRow",
          fields: [
            defineField({
              name: "field",
              title: "მონაცემი",
              type: "string",
              options: { list: EMAIL_FIELD_OPTIONS },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "სახელი წერილში",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", field: "field" },
            prepare: ({ title, field }: { title?: string; field?: string }) => ({
              title,
              subtitle: EMAIL_FIELD_OPTIONS.find((o) => o.value === field)?.title,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "emailIncludeAnswers",
      title: "პასუხების ცხრილი წერილში",
      type: "boolean",
      group: "email",
      description: "ყველა კითხვა, მოსწავლის პასუხი, სწორი პასუხი და ქულა.",
    }),
    str("emailAnswersHeading", "პასუხების ცხრილის სათაური", "email"),
  ],
  preview: { prepare: () => ({ title: "დონის ტესტი — ტექსტები" }) },
});
