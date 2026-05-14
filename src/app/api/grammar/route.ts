import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 400,
      messages: [
        {
          role: 'user',
          content: `You are an English language expert helping a Georgian student improve their English.

Review this student message and provide a corrected, more natural English version.

Rules:
- If the text is already perfectly correct and natural, respond with ONLY: "✓ Perfect English!"
- If there are improvements to make, return ONLY the corrected version — no labels, no explanations, no "Corrected:" prefix, just the improved text
- Preserve the original meaning and tone
- Make it sound like natural, fluent English

Student's message: "${text}"`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');

    return NextResponse.json({ corrected: content.text.trim() });
  } catch (error) {
    console.error('Grammar API error:', error);
    return NextResponse.json({ error: 'Grammar check failed' }, { status: 500 });
  }
}
