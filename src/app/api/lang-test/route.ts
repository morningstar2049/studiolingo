import questions from "./questions.json";

export function GET() {
  return Response.json(questions);
}

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  console.log(body, "req body");
  return Response.json(body);
}
