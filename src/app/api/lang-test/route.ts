import { NextResponse } from "next/server";
import questions from "./questions.json";

export function GET() {
  return NextResponse.json(questions);
}

const levels: TLevel[] = ["A1", "A2", "B1", "B1+", "B2", "C1"];

const mistakesToLevelsMap: { [key: number]: TLevel } = {
  0: "C1",
  1: "C1",
  2: "C1",
  3: "C1",
  4: "B2",
};

export async function POST(request: Request) {
  let resultLevel: TLevel;
  const incorrectAnswers: TIncorrectAnswersCounter = await request.json();

  if (incorrectAnswers.length === 5) {
    resultLevel =
      incorrectAnswers[Math.floor(incorrectAnswers.length / 2) + 1].level;
    return NextResponse.json({
      resultLevel,
    });
  }

  const mistakesSum = incorrectAnswers.reduce((prev, curr) => {
    return prev + curr.count;
  }, 0);

  if (mistakesSum < 5 || !incorrectAnswers.length) {
    resultLevel = mistakesToLevelsMap[mistakesSum];
    return NextResponse.json({
      resultLevel,
    });
  }

  const maxMistakesCount = Math.max(...incorrectAnswers.map((el) => el.count));

  const mostMistakesLevels = incorrectAnswers.filter(
    (el) => el.count === maxMistakesCount
  );

  const mostMistakesLevelIndex = levels.findIndex(
    (el) => el === mostMistakesLevels[0].level
  );

  if (mostMistakesLevelIndex > 0) {
    resultLevel = levels[mostMistakesLevelIndex - 1];
    return NextResponse.json({
      resultLevel,
    });
  } else {
    resultLevel = levels[mostMistakesLevelIndex];
    return NextResponse.json({
      resultLevel,
    });
  }
}
