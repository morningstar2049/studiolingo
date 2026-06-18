import { NextRequest, NextResponse } from "next/server";

// Allow up to 30s for transcription (short voice clips usually return in <3s).
export const maxDuration = 30;

// Speech-to-text for the chat's voice input. Used by iPhone/iPad, where the
// browser Web Speech API is unreliable inside standalone PWAs. The client
// records a short audio clip and posts it here; we forward it to OpenAI Whisper
// (same OPENAI_API_KEY already used by /api/tts) and return the transcript.
export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY not configured" },
      { status: 503 },
    );
  }

  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Missing audio file" }, { status: 400 });
    }

    const filename =
      file instanceof File && file.name ? file.name : "recording.mp4";

    const upstream = new FormData();
    upstream.append("file", file, filename);
    upstream.append("model", "whisper-1");
    // Students are practicing English — hinting the language improves accuracy.
    upstream.append("language", "en");
    upstream.append("response_format", "json");

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
        body: upstream,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI transcription error:", response.status, errorText);
      return NextResponse.json(
        { error: `Transcription failed: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({ text: typeof data.text === "string" ? data.text : "" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Transcribe route error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
