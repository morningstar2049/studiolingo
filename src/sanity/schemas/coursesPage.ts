import { defineField, defineType } from "sanity";

// The courses page (single document, id "coursesPage"). Today it holds the
// intro video that plays at the top of /courses: a wide clip for computers and
// a vertical one for phones. Paste the link straight from YouTube's share
// button — watch, youtu.be and shorts links all work. An empty field keeps the
// video that is written in code.
export const coursesPage = defineType({
  name: "coursesPage",
  title: "კურსების გვერდი",
  type: "document",
  fields: [
    defineField({
      name: "videoVisible",
      title: "ვიდეო ჩანს",
      type: "boolean",
      initialValue: true,
      description:
        "გამორთეთ, თუ გვერდის თავში ვიდეო დროებით არ გინდათ.",
    }),
    defineField({
      name: "desktopVideo",
      title: "ვიდეო კომპიუტერისთვის (ჰორიზონტალური)",
      type: "url",
      description:
        "YouTube-ის ბმული — მაგ. https://youtu.be/XXXXXXXXXXX. 16:9 ფორმატის ვიდეო.",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }).custom((value) =>
          !value || /(?:youtube\.com|youtu\.be)/.test(value)
            ? true
            : "YouTube-ის ბმული უნდა იყოს",
        ),
    }),
    defineField({
      name: "mobileVideo",
      title: "ვიდეო ტელეფონისთვის (ვერტიკალური)",
      type: "url",
      description:
        "YouTube-ის ბმული — Shorts-იც გამოდგება, მაგ. https://youtube.com/shorts/XXXXXXXXXXX. 9:16 ფორმატის ვიდეო.",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }).custom((value) =>
          !value || /(?:youtube\.com|youtu\.be)/.test(value)
            ? true
            : "YouTube-ის ბმული უნდა იყოს",
        ),
    }),
  ],
  preview: { prepare: () => ({ title: "კურსების გვერდი" }) },
});
