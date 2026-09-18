// Every text on /language-test (intro card, form, question screen, result
// screen). The live copy is edited in Sanity ("დონის ტესტი — ტექსტები"); these
// are the fallbacks, used field by field when a Sanity field is empty or the
// dataset can't be reached.

// Per-level detail text shown under "დეტალურად ამ დონის შესახებ" on the result
// screen. B1+ (Intermediate +) and B2 (Upp. Intermediate) share the same copy.
const intermediatePlus =
  "ეს არის საშუალოზე მაღალი დონე. მშვენიერი შედეგია! შენ ალბათ თავისუფლად და სპონტანურადაც კი ესაუბრები უცხოელებს და მარტივად იგებ რთულ ტექსტებს. ჩანს, გრამატიკაშიც სერიოზულად ფლობ ბევრ საკითხს და შეიძლება საუბარშიც კი იცოდე გრამატიკის სწორად გამოყენება. შემოგვიერთდი „სტუდიო ლინგოში“ და გახადე შენი ინგლისური კიდევ უფრო სრულყოფილი და პროფესიული.";

const fallbackLevelDescriptions: TLevelDescriptions = {
  "სრულიად დამწყები":
    "ეს არის სრულიად დამწყები დონე. ინგლისურთან შეხება ალბათ ჯერ თითქმის არ გქონია და მხოლოდ რამდენიმე სიტყვა იცი. ყველაფერი წინ არის! სრულიად ნულიდანაც გასწავლით ყველაფერს, თუ საჭირო იქნება. შემოგვიერთდი „სტუდიო ლინგოში“ და ერთად დავიწყოთ ეს საინტერესო თავგადასავალი.",
  A1: "ეს არის საბაზისო დონე. როგორც ჩანს, შენ უკვე შეგიძლია მარტივი, ყოველდღიური ფრაზების რაღაც დონეზე გაგება. გრამატიკის საწყისებიც იცი და შეიძლება საკუთარი თავის საბაზისო დონეზე წარდგენასაც ახერხებ. ახლა კი შეგიძლია ეს ბაზაც განიმტკიცო. დაიწყე სწავლა „სტუდიო ლინგოში“ და თამამად გადადგი ნაბიჯი შემდეგი დონისკენ.",
  A2: "ეს არის საბაზისოზე მაღალი დონე. ჩანს, შენ კარგად გესმის ყოველდღიური ფრაზები და იცი სიტყვები ნაცნობ თემებზე. გრამატიკაშიც გქონია გარკვეული ტიპის ცოდნა. კომუნიკაციაც შეიძლება არ გიჭირდეს თუ ამ ცოდნის სწორად გამოყენება იცი. „სტუდიო ლინგოში“ სიამოვნებით დაგეხმარებით, რომ შენი ინგლისური კიდევ უფრო გამართული და დამაჯერებელი გახდეს.",
  B1: "ეს არის საშუალო საკომუნიკაციო დონე. ყოჩაღ! შენ უკვე კარგად იცი ყოველდღიური ფრაზები და მოგზაურობის დროსაც ალბათ იყენებ კიდეც. გრამატიკაშიც გაქვს გარკვეული ცოდნა. თუ გინდა ენა უფრო პროფესიულ დონეზე აიყვანო და საუბარშიც უფრო თავდაჯერებული იყო, „სტუდიო ლინგო“ დაგეხმარება, დაძლიო ბარიერები და ისაუბრო სრულიად თავისუფლად!",
  "B1+": intermediatePlus,
  B2: intermediatePlus,
  C1: "შენ აჩვენე მაღალი დონე. ფაქტობრივად, ინგლისურად ფიქრობ! მარტივად იჭერ ქვეტექსტებს და აზრს წამიერად, ბუნებრივად გამოხატავ. შენ უკვე ინგლისურის მაღალ დონეზე მცოდნე ხარ! თუ ენობრივი პრაქტიკის შენარჩუნება ან უნარების კიდევ უფრო დახვეწა გსურს, „სტუდიო ლინგოს“ კარი შენთვის ყოველთვის ღიაა.",
};

export type LevelTestTexts = {
  badge: string;
  intro: {
    headline: string;
    subtitle: string;
    // Four tiles; icons are fixed by position (questions, time, adaptive,
    // levels).
    stats: { value: string; label: string }[];
    listeningNote: string;
    speakingNote: string;
    startButton: string;
  };
  form: {
    headline: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: string;
    contactMe: string;
    submitButton: string;
    privacyNote: string;
  };
  question: {
    label: string;
    listeningHint: string;
    answerPlaceholder: string;
    nextButton: string;
    finishButton: string;
  };
  result: {
    intro: string;
    detailsButton: string;
    hideButton: string;
    courseButton: string;
    courseLink: string;
    retakeButton: string;
    descriptions: TLevelDescriptions;
  };
};

export const FALLBACK_TEXTS: LevelTestTexts = {
  badge: "ინგლისურის დონის ტესტი",
  intro: {
    headline: "შეამოწმე შენი ინგლისურის დონე",
    subtitle: "მორგებული ტესტი — A1-დან C1-მდე, რამდენიმე წუთში",
    stats: [
      { value: "48", label: "კითხვა" },
      { value: "40–60 წამი", label: "კითხვაზე" },
      { value: "მორგებული", label: "ჩერდება დონეზე" },
      { value: "A1–C1", label: "დონეები" },
    ],
    listeningNote: "მოსასმენი კითხვები — ჩაწერე პასუხი",
    speakingNote: "ზეპირი შემოწმება მეტი სიზუსტისთვის",
    startButton: "ტესტის დაწყება",
  },
  form: {
    headline: "ინგლისურის დონის ტესტი",
    subtitle: "შეავსე მონაცემები, რომ დავიწყოთ და შედეგი მიიღო",
    firstName: "სახელი",
    lastName: "გვარი",
    email: "ელ. ფოსტა",
    phone: "ტელეფონის ნომერი",
    age: "ასაკი",
    contactMe: "დამიკავშირდით და გამაცანით კურსები",
    submitButton: "გაგრძელება →",
    privacyNote:
      "მონაცემები გამოიყენება მხოლოდ ტესტის შედეგის გამოსაგზავნად და თქვენთან დასაკავშირებლად.",
  },
  question: {
    label: "კითხვა",
    listeningHint: "მოისმინე და ჩაწერე პასუხი",
    answerPlaceholder: "შენი პასუხი…",
    nextButton: "შემდეგი →",
    finishButton: "დასრულება",
  },
  result: {
    intro: "თქვენი ინგლისურის მიახლოებითი დონეა",
    detailsButton: "დეტალურად ამ დონის შესახებ",
    hideButton: "დამალვა",
    courseButton: "დაიწყე შესაბამისი კურსი →",
    courseLink: "/courses",
    retakeButton: "↻ ტესტის თავიდან გავლა",
    descriptions: fallbackLevelDescriptions,
  },
};
