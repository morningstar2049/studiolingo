// Builds the "level test result" email (text + HTML). Kept free of Next.js
// imports so it can be rendered/previewed outside the route.

export type LevelTestAnswer = {
  id: number;
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

export function buildLevelTestEmail(p: LevelTestResultPayload) {
  const fullName = `${p.firstName} ${p.lastName}`;
  const answers = Array.isArray(p.answers) ? p.answers : [];
  const correctCount = answers.filter((a) => a.isCorrect).length;

  const rows: [string, string][] = [
    ["სახელი", p.firstName],
    ["გვარი", p.lastName],
    ["ელ. ფოსტა", p.email],
    ["ტელეფონი", String(p.phone ?? "")],
    ["ასაკი", String(p.age ?? "")],
    ["შედეგი", p.result],
    ["დონე (CEFR)", String(p.level ?? "")],
    ["უნდა დაიწყოს", String(p.recommendedLevel ?? "")],
    ["დამიკავშირდით და გამაცანით კურსები", p.contactMe ? "კი" : "არა"],
  ];
  const scores = Array.isArray(p.levelScores) ? p.levelScores.filter((s) => s.answered > 0) : [];
  if (answers.length) {
    rows.push(["სწორი პასუხები", `${correctCount} / ${answers.length}`]);
  }
  if (typeof p.listeningMistakes === "number") {
    rows.push([
      "მოსმენის შეცდომები",
      `${p.listeningMistakes}${p.stoppedByListening ? " — ტესტი შეწყდა მე-3 შეცდომაზე" : ""}`,
    ]);
  }
  if (scores.length) {
    rows.push(["ქულა ჯამში", `${p.totalPoints ?? 0} / ${p.totalMax ?? 0}`]);
    rows.push([
      "ქულები დონეების მიხედვით",
      scores
        .map((s) => `${s.level} ${s.points}/${s.max}${s.answered < 8 ? " (შეწყდა)" : s.passed ? " ✓" : " ✗"}`)
        .join(", "),
    ]);
  }

  // Subject flags whether the taker asked to be contacted (კი/არა).
  const subject = `დონის ტესტის შედეგი — ${fullName} (${p.contactMe ? "კი" : "არა"})`;

  const textAnswers = answers.length
    ? [
        "",
        `პასუხები კითხვების მიხედვით (${correctCount}/${answers.length} სწორი):`,
        ...answers.map(
          (a, i) =>
            `${i + 1}. [${a.level}] ${a.question}\n   პასუხი: ${
              a.given?.trim() ? a.given : NO_ANSWER
            }\n   სწორი: ${a.correct}  →  ${a.isCorrect ? "✓ სწორია" : "✗ არასწორია"}`,
        ),
      ].join("\n")
    : "";
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + textAnswers;

  const answerRows = answers
    .map((a, i) => {
      const given = a.given?.trim() ? a.given : NO_ANSWER;
      const color = a.isCorrect ? "#2f9e4d" : "#e24b4a";
      const mark = a.isCorrect ? "✓" : "✗";
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

  const answersTable = answers.length
    ? `
        <h3 style="color:#293142;margin:24px 0 8px">პასუხები კითხვების მიხედვით
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
        <h2 style="color:#2f9e4d;margin:0 0 12px">დონის ტესტის ახალი შედეგი</h2>
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
