import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

// Give Vercel's serverless function up to 30s so the translation never times out
export const maxDuration = 30;

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const response = await client.messages.create({
      // Haiku is fast (<3s, no Vercel timeout). With few-shot examples it reliably
      // produces clean Georgian Mkhedruli and never mixes in other scripts.
      model: "claude-haiku-4-5",
      max_tokens: 600,
      messages: [
        {
          role: "user",
          content: `You are a professional Georgian (ქართული) translator for Studio Lingo, an English school in Tbilisi. Translate the English text below into natural, fluent, grammatically perfect Georgian.

ABSOLUTE RULES — violate any and the translation is useless:
- Use ONLY the Georgian Mkhedruli script: ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ
- NEVER include Korean, Japanese, Chinese, Cyrillic, Arabic, or any other non-Georgian script.
- NEVER include Latin letters unless they are untranslatable proper nouns (e.g., "iPhone", "Netflix").
- Return ONLY the Georgian translation — no English, no explanations, no quotes, no "Translation:" prefix.
- Preserve the tone: casual English stays casual Georgian, formal stays formal.

Here are examples of correct translations:

English: "Hello! How are you today?"
Georgian: გამარჯობა! როგორ ხარ დღეს?

English: "I love traveling to new countries and trying different foods."
Georgian: მიყვარს ახალ ქვეყნებში მოგზაურობა და სხვადასხვა საჭმლის გასინჯვა.

English: "What's your favorite hobby? Mine is reading books."
Georgian: რა არის შენი საყვარელი ჰობი? ჩემი საყვარელი ჰობია წიგნების კითხვა.

English: "Nice to meet you! I'm Alex, your English practice partner."
Georgian: სასიამოვნოა შენი გაცნობა! მე ვარ ალექსი, შენი ინგლისურის სავარჯიშო პარტნიორი.

English: "Can you tell me about your weekend?"
Georgian: შეგიძლია მიამბო შენი შაბათ-კვირის შესახებ?

Now translate this text into Georgian (Mkhedruli only, no other scripts):

${text}`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    return NextResponse.json({ translation: content.text.trim() });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Translate API error:", errMsg, error);
    return NextResponse.json(
      { error: `Translation failed: ${errMsg}` },
      { status: 500 },
    );
  }
}
