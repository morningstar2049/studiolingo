import { NextRequest, NextResponse } from 'next/server';

// Allow up to 20s for OpenAI TTS to respond (usually <2s for short messages)
export const maxDuration = 20;

// TTS speed by English level — slower for beginners so every word is clear
const speedByLevel: Record<string, number> = {
  A1: 0.75,
  A2: 0.85,
  B1: 0.92,
  B2: 1.0,
  C1: 1.0,
  C2: 1.0,
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  // If no API key is configured, return 503 so the client falls back to
  // the browser's built-in voice gracefully — nothing breaks for the student.
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY not configured' },
      { status: 503 }
    );
  }

  try {
    const { text, level } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    // Truncate to OpenAI's 4096-char limit (bot messages are always well under this)
    const input = text.slice(0, 4096);
    const speed = speedByLevel[level] ?? 1.0;

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',      // tts-1 = fast, great for real-time chat
                              // tts-1-hd = slightly better but slower
        voice: 'nova',       // nova: warm, natural, engaging — ideal for a teacher
        input,
        speed,
        response_format: 'mp3',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI TTS error:', response.status, errorText);
      return NextResponse.json(
        { error: `OpenAI TTS failed: ${response.status}` },
        { status: response.status }
      );
    }

    // Stream the mp3 audio directly back to the browser
    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
        // Cache for 10 minutes — if the same sentence is played again, browser
        // serves from cache instantly instead of calling OpenAI again
        'Cache-Control': 'public, max-age=600',
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('TTS route error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
