import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 600,
      messages: [
        {
          role: 'user',
          content: `Translate the following English text into Georgian (ქართული). Return ONLY the Georgian translation — no explanations, no notes, just the translation itself:\n\n${text}`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');

    return NextResponse.json({ translation: content.text.trim() });
  } catch (error) {
    console.error('Translate API error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
