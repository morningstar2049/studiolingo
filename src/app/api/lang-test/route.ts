import { NextResponse } from "next/server";
import questions from "./questions.json";

export function GET() {
  return NextResponse.json(questions);
}

// Scoring rule: each level has 7 multiple-choice questions (1 point each) and
// 1 listening question (2 points) = 9 points. A level is passed when all its
// questions were answered and at most 2 points were lost. The result is the
// last passed level in order; failing A1 means "სრულიად დამწყები".
// Additionally, the 3rd listening mistake anywhere in the test fails the level
// in progress, so the result becomes the previous (last passed) level.
const LEVELS: TLevel[] = ["A1", "A2", "B1", "B1+", "B2", "C1"];
const PASS_MAX_LOST = 2;
const LISTENING_MISTAKES_LIMIT = 3;

const normalize = (s: string) =>
  s.trim().toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, " ");

type SubmittedAnswer = { id: number; given: string };

export async function POST(request: Request) {
  const body = (await request.json()) as { answers?: SubmittedAnswer[] };
  const submitted = Array.isArray(body?.answers) ? body.answers : [];
  const bank = questions.levelTest as TQuestion[];

  // Re-grade every answer against the question bank (the client's verdict is
  // only used for the live stop rule).
  const graded = submitted
    .map((a) => {
      const q = bank.find((x) => x.id === a.id);
      if (!q) return null;
      const listening = q.audioFile !== null;
      const correct = listening
        ? normalize(String(a.given ?? "")) === normalize(q.answer as string)
        : String(a.given ?? "") === q.choices![q.answer as number];
      return { level: q.level, correct, weight: listening ? 2 : 1, listening };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // Level in which the 3rd listening mistake happened (if any).
  let listeningMistakes = 0;
  let listeningFailLevel: TLevel | null = null;
  for (const g of graded) {
    if (g.listening && !g.correct) {
      listeningMistakes++;
      if (listeningMistakes === LISTENING_MISTAKES_LIMIT && !listeningFailLevel) {
        listeningFailLevel = g.level;
      }
    }
  }

  const levelScores: TLevelScore[] = LEVELS.map((level) => {
    const max = bank
      .filter((q) => q.level === level)
      .reduce((sum, q) => sum + (q.audioFile !== null ? 2 : 1), 0);
    const total = bank.filter((q) => q.level === level).length;
    const got = graded.filter((g) => g.level === level);
    const points = got.reduce((sum, g) => sum + (g.correct ? g.weight : 0), 0);
    const lost = got.reduce((sum, g) => sum + (g.correct ? 0 : g.weight), 0);
    return {
      level,
      points,
      max,
      answered: got.length,
      passed:
        got.length === total &&
        lost <= PASS_MAX_LOST &&
        level !== listeningFailLevel,
    };
  });

  let resultLevel: TLevel = "სრულიად დამწყები";
  for (const score of levelScores) {
    if (!score.passed) break;
    resultLevel = score.level;
  }

  const result: TTestResult = {
    resultLevel,
    levelScores,
    totalPoints: levelScores.reduce((sum, s) => sum + s.points, 0),
    totalMax: levelScores.reduce((sum, s) => sum + s.max, 0),
    listeningMistakes,
    stoppedByListening: listeningFailLevel !== null,
  };
  return NextResponse.json(result);
}
