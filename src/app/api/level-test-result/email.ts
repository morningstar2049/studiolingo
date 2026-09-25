// Builds the "level test result" email (text + HTML). Kept free of Next.js
// imports so it can be rendered/previewed outside the route.

export type LevelTestAnswer = {
  id: number | string;
  level: string;
  question: string;
  given: string;
  correct: string;
  isCorrect: boolean;
  listening?: boolean;
  points?: number;
  maxPoints?: number;
};

export type LevelScore = {
  level: string;
  points: number;
  max: number;
  answered: number;
  passed: boolean;
};

export type LevelTestResultPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  age?: string;
  contactMe?: boolean;
  result: string;
  level?: string;
  recommendedLevel?: string;
  answers?: LevelTestAnswer[];
  levelScores?: LevelScore[];
  totalPoints?: number;
  totalMax?: number;
  listeningMistakes?: number;
  stoppedByListening?: boolean;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const NO_ANSWER = "— (პასუხი არ არის)";

// Data fields the email can show, in the rows table at the top.
export const EMAIL_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "age",
  "result",
  "level",
  "recommendedLevel",
  "contactMe",
  "correctCount",
  "listeningMistakes",
  "totalPoints",
  "levelScores",
] as const;
export type EmailField = (typeof EMAIL_FIELDS)[number];

// The email's editable structure (Sanity "დონის ტესტი — ტექსტები" → email tab).
export type LevelTestEmailConfig = {
  // {name}, {contact} (კი/არა), {result} and {level} are filled in.
  subject: string;
  heading: string;
  rows: { field: EmailField; label: string }[];
  includeAnswers: boolean;
  answersHeading: string;
};

export const FALLBACK_EMAIL: LevelTestEmailConfig = {
  subject: "დონის ტესტის შედეგი — {name} ({contact})",
  heading: "დონის ტესტის ახალი შედეგი",
  rows: [
    { field: "firstName", label: "სახელი" },
    { field: "lastName", label: "გვარი" },
    { field: "email", label: "ელ. ფოსტა" },
    { field: "phone", label: "ტელეფონი" },
    { field: "age", label: "ასაკი" },
    { field: "result", label: "შედეგი" },
    { field: "level", label: "დონე (CEFR)" },
    { field: "recommendedLevel", label: "უნდა დაიწყოს" },
    { field: "contactMe", label: "დამიკავშირდით და გამაცანით კურსები" },
    { field: "correctCount", label: "სწორი პასუხები" },
    { field: "listeningMistakes", label: "მოსმენის შეცდომები" },
    { field: "totalPoints", label: "ქულა ჯამში" },
    { field: "levelScores", label: "ქულები დონეების მიხედვით" },
  ],
  includeAnswers: true,
  answersHeading: "პასუხები კითხვების მიხედვით",
};

export function buildLevelTestEmail(
  p: LevelTestResultPayload,
  config: LevelTestEmailConfig = FALLBACK_EMAIL,
) {
  const fullName = `${p.firstName} ${p.lastName}`;
  const answers = Array.isArray(p.answers) ? p.answers : [];
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const scores = Array.isArray(p.levelScores) ? p.levelScores.filter((s) => s.answered > 0) : [];

  // Value of each field; null = no data for this result, so the row is left out.
  const value = (field: EmailField): string | null => {
    switch (field) {
      case "firstName":
        return p.firstName;
      case "lastName":
        return p.lastName;
      case "email":
        return p.email;
      case "phone":
        return String(p.phone ?? "");
      case "age":
        return String(p.age ?? "");
      case "result":
        return p.result;
      case "level":
        return String(p.level ?? "");
      case "recommendedLevel":
        return String(p.recommendedLevel ?? "");
      case "contactMe":
        return p.contactMe ? "კი" : "არა";
      case "correctCount":
        return answers.length ? `${correctCount} / ${answers.length}` : null;
      case "listeningMistakes":
        return typeof p.listeningMistakes === "number"
          ? `${p.listeningMistakes}${p.stoppedByListening ? " — ტესტი შეწყდა მე-3 შეცდომაზე" : ""}`
          : null;
      case "totalPoints":
        return scores.length ? `${p.totalPoints ?? 0} / ${p.totalMax ?? 0}` : null;
      case "levelScores":
        return scores.length
          ? scores
              .map((s) => `${s.level} ${s.points}/${s.max}${s.answered < 8 ? " (შეწყდა)" : s.passed ? " ✓" : " ✗"}`)
              .join(", ")
          : null;
      default:
        return null;
    }
  };

  const rows: [string, string][] = [];
  for (const row of config.rows) {
    const v = value(row.field);
    if (v !== null) rows.push([row.label, v]);
  }

  // Default subject flags whether the taker asked to be contacted (კი/არა).
  const placeholders: Record<string, string> = {
    name: fullName,
    contact: p.contactMe ? "კი" : "არა",
    result: p.result,
    level: String(p.level ?? ""),
  };
  const subject = config.subject.replace(
    /\{(name|contact|result|level)\}/g,
    (_, key: string) => placeholders[key],
  );

  const showAnswers = config.includeAnswers && answers.length > 0;
  const textAnswers = showAnswers
    ? [
        "",
        `${config.answersHeading} (${correctCount}/${answers.length} სწორი):`,
        ...answers.map(
          (a, i) =>
            `${i + 1}. [${a.level}] ${a.question}\n   პასუხი: ${
              a.given?.trim() ? a.given : NO_ANSWER
            }\n   სწორი: ${a.correct}  →  ${
              a.isCorrect
                ? "✓ სწორია"
                : (a.points ?? 0) > 0
                  ? `± ნაწილობრივ (${a.points}/${a.maxPoints})`
                  : "✗ არასწორია"
            }`,
        ),
      ].join("\n")
    : "";
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + textAnswers;

  const answerRows = answers
    .map((a, i) => {
      const given = a.given?.trim() ? a.given : NO_ANSWER;
      // Near-miss spellings can earn part of the points — shown in orange.
      const partial = !a.isCorrect && (a.points ?? 0) > 0;
      const color = a.isCorrect ? "#2f9e4d" : partial ? "#d98416" : "#e24b4a";
      const mark = a.isCorrect ? "✓" : partial ? "±" : "✗";
      const pts = typeof a.maxPoints === "number" ? `${a.isCorrect ? a.maxPoints : 0}/${a.maxPoints}` : "";
      return `<tr style="border-top:1px solid #e5e8ec">
        <td style="padding:8px 10px 8px 0;color:#8a929d;vertical-align:top">${i + 1}</td>
        <td style="padding:8px 10px;color:#8a929d;vertical-align:top;white-space:nowrap">${escapeHtml(a.level)}</td>
        <td style="padding:8px 10px;vertical-align:top">${escapeHtml(a.question)}</td>
        <td style="padding:8px 10px;vertical-align:top;font-weight:bold;color:${color}">${escapeHtml(given)}</td>
        <td style="padding:8px 10px;vertical-align:top;color:#293142">${escapeHtml(a.correct)}</td>
        <td style="padding:8px 0 8px 10px;vertical-align:top;font-weight:bold;color:${color};white-space:nowrap">${mark} ${pts}</td>
      </tr>`;
    })
    .join("");

  const answersTable = showAnswers
    ? `
        <h3 style="color:#293142;margin:24px 0 8px">${escapeHtml(config.answersHeading)}
          <span style="color:#8a929d;font-weight:normal">(${correctCount}/${answers.length} სწორი)</span>
        </h3>
        <table style="border-collapse:collapse;width:100%;max-width:820px;font-size:14px">
          <thead>
            <tr style="text-align:left;color:#8a929d;font-size:12px">
              <th style="padding:4px 10px 4px 0;font-weight:normal">#</th>
              <th style="padding:4px 10px;font-weight:normal">დონე</th>
              <th style="padding:4px 10px;font-weight:normal">კითხვა</th>
              <th style="padding:4px 10px;font-weight:normal">პასუხი</th>
              <th style="padding:4px 10px;font-weight:normal">სწორი პასუხი</th>
              <th style="padding:4px 0 4px 10px;font-weight:normal">ქულა</th>
            </tr>
          </thead>
          <tbody>${answerRows}</tbody>
        </table>`
    : "";

  const html = `
      <div style="font-family:Arial,sans-serif;font-size:15px;color:#293142">
        <h2 style="color:#2f9e4d;margin:0 0 12px">${escapeHtml(config.heading)}</h2>
        <table style="border-collapse:collapse">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:4px 12px 4px 0;color:#8a929d">${escapeHtml(
                  k,
                )}</td><td style="padding:4px 0;font-weight:bold">${escapeHtml(
                  String(v),
                )}</td></tr>`,
            )
            .join("")}
        </table>${answersTable}
      </div>`;

  return { subject, text, html };
}
