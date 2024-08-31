import questions from "./questions.json";

export function GET() {
  return Response.json(questions);
}

export function POST() {}
