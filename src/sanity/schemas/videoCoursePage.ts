import { defineField, defineType } from "sanity";

// The video course page (single document, id "videoCoursePage"). It holds the
// parts of /courses/video-course that change over time: the promo video, the
// sign-up link, the prices, the lessons already filmed and the FAQ. Every
// field is optional — an empty one keeps what is written in code, so the page
// never goes blank because something here was cleared.
export const videoCoursePage = defineType({
  name: "videoCoursePage",
  title: "ვიდეო კურსის გვერდი",
  type: "document",
  groups: [
    { name: "general", title: "ზოგადი", default: true },
    { name: "price", title: "ფასი" },
    { name: "program", title: "პროგრამა" },
    { name: "faq", title: "კითხვები" },
  ],
  fields: [
    defineField({
      name: "promoVideo",
      title: "პრომო ვიდეო",
      type: "url",
      group: "general",
      description:
        "YouTube-ის ბმული — მაგ. https://youtu.be/XXXXXXXXXXX. ჰორიზონტალური (16:9) ვიდეო. ცარიელი ველი ტოვებს კოდში ჩაწერილ ვიდეოს.",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }).custom((value) =>
          !value || /(?:youtube\.com|youtu\.be)/.test(value)
            ? true
            : "YouTube-ის ბმული უნდა იყოს",
        ),
    }),
    defineField({
      name: "sampleVideo",
      title: "გაკვეთილის ნიმუშის ვიდეო",
      type: "url",
      group: "general",
      description:
        "YouTube-ის ბმული ერთი სრული გაკვეთილისთვის — ფასის სექციის ზემოთ ჩანს. ცარიელი ველი ტოვებს კოდში ჩაწერილ ვიდეოს.",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }).custom((value) =>
          !value || /(?:youtube\.com|youtu\.be)/.test(value)
            ? true
            : "YouTube-ის ბმული უნდა იყოს",
        ),
    }),
    defineField({
      name: "signupUrl",
      title: "რეგისტრაციის ფორმის ბმული",
      type: "url",
      group: "general",
      description:
        "სად მიდის „დარეგისტრირდი“ ღილაკი — ამჟამად Google Forms-ის ბმული.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "lessonCount",
      title: "გაკვეთილების რაოდენობა",
      type: "number",
      group: "general",
      description: "მთლიანი კურსის გაკვეთილების რიცხვი (მაგ. 20).",
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: "accessMonths",
      title: "წვდომა (თვე)",
      type: "number",
      group: "general",
      description: "რამდენი თვის წვდომა შედის ფასში (მაგ. 4).",
      validation: (rule) => rule.min(1).integer(),
    }),

    defineField({
      name: "price",
      title: "სრული ფასი (₾)",
      type: "number",
      group: "price",
      description: "კურსის ჩვეულებრივი ფასი პრესეილის გარეშე.",
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: "presaleActive",
      title: "პრესეილი მიმდინარეობს",
      type: "boolean",
      group: "price",
      initialValue: true,
      description:
        "ჩართულია: გვერდი აჩვენებს გადახაზულ სრულ ფასს და პრესეილის ფასს. გამორთულია: მხოლოდ სრული ფასი ჩანს და პრესეილის ყველა ხსენება ქრება.",
    }),
    defineField({
      name: "presalePrice",
      title: "პრესეილის ფასი (₾)",
      type: "number",
      group: "price",
      description: "მოქმედებს მხოლოდ მაშინ, როცა პრესეილი ჩართულია.",
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: "extraMonthPrice",
      title: "დამატებითი თვის ფასი (₾)",
      type: "number",
      group: "price",
      description: "წვდომის გაგრძელება — ერთი თვე.",
      validation: (rule) => rule.min(1).integer(),
    }),

    defineField({
      name: "lessons",
      title: "გადაღებული გაკვეთილები",
      type: "array",
      group: "program",
      description:
        "„პროგრამა“-ს სიაში ჩანს. დაამატეთ ახალი გაკვეთილი მას შემდეგ, რაც გადაიღებთ. ცარიელი სია ტოვებს კოდში ჩაწერილ გაკვეთილებს.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "სათაური",
              type: "string",
              description: "მაგ. „გაკვეთილი 5 — მოგზაურობა“.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "note",
              title: "თემები",
              type: "string",
              description: "მოკლედ, რა თემებია — მაგ. „აეროპორტი, სასტუმრო“.",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "note" },
          },
        },
      ],
    }),

    defineField({
      name: "faq",
      title: "ხშირად დასმული კითხვები",
      type: "array",
      group: "faq",
      description:
        "ცარიელი სია ტოვებს კოდში ჩაწერილ კითხვებს. გაითვალისწინეთ: პასუხებში ციფრები (თვეები, ფასი) ხელით იწერება — თუ ზემოთ ფასს შეცვლით, პასუხიც განაახლეთ.",
      of: [
        {
          type: "object",
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
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
          },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "ვიდეო კურსის გვერდი" }) },
});
