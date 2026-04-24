import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

// 30 seconds is plenty for Opus on a short sentence; prevents Vercel timeout
export const maxDuration = 30;

const client = new Anthropic();

// Returns true if the text contains characters outside Georgian + Latin + common punctuation.
// Korean, Chinese, Japanese, Cyrillic etc. all fail this check.
function hasNonGeorgianScript(text: string): boolean {
  // Allowed: Georgian Mkhedruli (U+10D0–10FF), Asomtavruli (U+10A0–10CF),
  //          ASCII (Latin/punctuation/digits/spaces), and common Unicode punctuation.
  const allowed = /^[\u10D0-\u10FF\u10A0-\u10CF\x00-\x7F\s]+$/;
  return !allowed.test(text);
}

const SYSTEM_PROMPT = `You are a Georgian (ქართული) language expert working for Studio Lingo, an English school in Tbilisi, Georgia. Your ONLY task is to translate English text into Georgian.

ABSOLUTE REQUIREMENTS — failure to follow ANY of these makes the output useless:
1. Output MUST use ONLY the Georgian Mkhedruli alphabet: ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ
2. NEVER output Korean, Japanese, Chinese, Cyrillic, Arabic, or any other non-Georgian script.
3. Latin letters are allowed ONLY for proper nouns that have no Georgian equivalent (e.g. iPhone, Netflix).
4. Output ONLY the Georgian translation — no English, no labels, no explanations, no quotation marks.
5. Grammar and idiom must be natural Georgian — not word-for-word.`;

async function translateToGeorgian(
  text: string,
  model: string,
): Promise<string> {
  const response = await client.messages.create({
    model,
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Translate this English text into Georgian (Mkhedruli script only):\n\n${text}`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");
  return content.text.trim();
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    // Translate with Opus — the only model confirmed available in this account
    let translation = await translateToGeorgian(text, "claude-opus-4-6");

    // Safety net: if non-Georgian scripts leaked in, retry with a more explicit prompt
    if (hasNonGeorgianScript(translation)) {
      console.warn(
        "Translation contained non-Georgian characters, retrying…",
        translation,
      );
      const retry = await client.messages.create({
        model: "claude-opus-4-6",
        max_tokens: 600,
        messages: [
          {
            role: "user",
            content: `CRITICAL: Translate the following English text into GEORGIAN (ქართული) using ONLY the Georgian Mkhedruli alphabet.
DO NOT use Korean, Japanese, Chinese, or any other writing system.
DO NOT use Cyrillic.
ONLY Georgian script: ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ

Return ONLY the Georgian translation, nothing else.

Text: ${text}`,
          },
        ],
      });
      const retryContent = retry.content[0];
      if (retryContent.type === "text") {
        translation = retryContent.text.trim();
      }
    }

    return NextResponse.json({ translation });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Translate API error:", errMsg, error);
    return NextResponse.json(
      { error: `Translation failed: ${errMsg}` },
      { status: 500 },
    );
  }
}
