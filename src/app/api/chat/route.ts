import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

// ── Per-IP rate limit: 15 messages / 24h ─────────────────────────────────────
// In-memory store. Resets on serverless cold start — fine for a single-region
// school-scale deployment. For multi-instance persistence, swap to Vercel KV.
const RATE_LIMIT = 15;
const WINDOW_MS = 24 * 60 * 60 * 1000;
const ipHistory = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const history = (ipHistory.get(ip) || []).filter(t => t > cutoff);

  if (history.length >= RATE_LIMIT) {
    const oldest = history[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000));
    ipHistory.set(ip, history);
    return { allowed: false, retryAfterSec };
  }

  history.push(now);
  ipHistory.set(ip, history);
  return { allowed: true, retryAfterSec: 0 };
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { allowed, retryAfterSec } = checkRateLimit(ip);
    if (!allowed) {
      const hours = Math.ceil(retryAfterSec / 3600);
      return NextResponse.json(
        {
          error: 'rate_limit',
          message: `You've reached today's limit of ${RATE_LIMIT} messages. Please come back in about ${hours} hour${hours === 1 ? '' : 's'}.`,
          retryAfterSec,
        },
        { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
      );
    }

    const { messages, level, topic, isFirstMessage } = await req.json();

    const levelDescriptions: Record<string, string> = {
      A1: 'complete beginner — use very simple words and very short sentences only',
      A2: 'elementary — use basic vocabulary and simple grammar structures',
      B1: 'intermediate — use everyday language with moderate complexity',
      B2: 'upper-intermediate — use varied vocabulary and some complex structures',
      C1: 'advanced — use sophisticated language, idioms, and nuanced expressions',
      C2: 'near-native — use any language naturally and precisely',
    };

    const levelDesc = levelDescriptions[level] || 'intermediate';
    const isGeneral = topic.toLowerCase().trim() === 'general';
    const topicDesc = isGeneral
      ? 'general everyday topics (travel, food, hobbies, culture, daily life, current trends, etc.)'
      : topic;

    const openingInstruction = isFirstMessage
      ? `This is the START of the conversation. Begin by warmly greeting the student and ask an engaging opening question about "${topicDesc}". Keep it friendly, natural, and welcoming.`
      : '';

    const systemPrompt = `You are Alex, a friendly, warm, and enthusiastic native English speaker having a real chat with a Georgian student who is practicing their English.

Student's English level: ${level} (${levelDesc})
Conversation topic: ${topicDesc}

${openingInstruction}

Your conversation rules:
1. KEEP IT SHORT: Write 2-4 sentences maximum per message. This is a chat, not an essay.
2. ALWAYS END WITH A QUESTION: Every single message must end with a follow-up question. No exceptions.
3. KEEP THE CONVERSATION GOING: If the student gives a short, vague, or one-word answer, ask a specific curious follow-up question to draw them out. Example: If they say "yes" → ask "Really? Tell me more! What exactly...?"
4. ADAPT YOUR LANGUAGE: Match vocabulary and grammar complexity to the ${level} level. ${level === 'A1' || level === 'A2' ? 'Use very simple, clear words and short sentences.' : level === 'B1' ? 'Use accessible but natural language.' : 'Use rich, varied, natural English with idioms.'}
5. BE GENUINELY INTERESTED: React naturally — show curiosity, surprise, enthusiasm. Use natural phrases like "Oh wow!", "That's so interesting!", "No way!", "I love that!"
6. STAY ON TOPIC: Keep the conversation naturally centered around "${topicDesc}".
7. NEVER CORRECT GRAMMAR: Don't point out language mistakes. Just model correct English naturally in your own responses.
8. YOU ARE ALEX: You are a real person having a friendly chat. Never break this persona or mention being an AI.`;

    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 300,
      system: systemPrompt,
      messages: messages,
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');

    return NextResponse.json({ message: content.text });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response. Please try again.' },
      { status: 500 }
    );
  }
}
