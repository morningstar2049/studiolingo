import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const response = await client.messages.create({
      // Using Opus for accurate Georgian — Haiku mixes scripts and makes grammar errors
      model: "claude-opus-4-6",
      max_tokens: 800,
      messages: [
        {
          role: "user",
          content: `You are a professional Georgian (ქართული) translator. Translate the following English text into Georgian.

CRITICAL RULES:
- Use ONLY the Georgian Mkhedruli script (ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ)
- Do NOT mix in any Korean, Japanese, Chinese, or other non-Georgian characters
- Do NOT include any Latin characters unless they are proper nouns with no Georgian equivalent
- Return ONLY the Georgian translation — no explanations, no notes, no quotes

English text to translate:
${text}`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    return NextResponse.json({ translation: content.text.trim() });
  } catch (error) {
    console.error("Translate API error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
