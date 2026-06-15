import Anthropic from '@anthropic-ai/sdk';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

// ── Per-user rate limit: 15 messages / 24h ───────────────────────────────────
// Keyed by Clerk userId and persisted in the user's Clerk privateMetadata.
// This is a single shared source of truth across ALL serverless instances and
// devices: whether the same account chats from a phone, a second phone, or a
// laptop, every request reads/writes the same record. (The previous in-memory
// Map lived inside one serverless instance, so a second device hitting a
// different instance saw an empty limit — that was the cross-device bug.)
const RATE_LIMIT = 15;
const WINDOW_MS = 24 * 60 * 60 * 1000;

type ChatLimitMeta = { chatTimestamps?: number[] };

/**
 * Atomically-ish check + record a message against the user's 24h window,
 * stored in Clerk privateMetadata. Returns whether the message is allowed and,
 * if not, how many seconds until the oldest message in the window expires.
 */
async function checkRateLimit(
  userId: string
): Promise<{ allowed: boolean; retryAfterSec: number }> {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const meta = (user.privateMetadata ?? {}) as ChatLimitMeta;

  // Keep only timestamps still inside the rolling 24h window.
  const history = (Array.isArray(meta.chatTimestamps) ? meta.chatTimestamps : [])
    .filter((t) => typeof t === 'number' && t > cutoff)
    .sort((a, b) => a - b);

  if (history.length >= RATE_LIMIT) {
    const oldest = history[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000));
    // Persist the pruned list so stale timestamps don't accumulate.
    await clerk.users.updateUserMetadata(userId, {
      privateMetadata: { chatTimestamps: history },
    });
    return { allowed: false, retryAfterSec };
  }

  history.push(now);
  await clerk.users.updateUserMetadata(userId, {
    privateMetadata: { chatTimestamps: history },
  });
  return { allowed: true, retryAfterSec: 0 };
}

export async function POST(req: NextRequest) {
  try {
    // Defense-in-depth: middleware also protects this route, but check here
    // too so the rate-limit key is always a valid Clerk userId.
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const { allowed, retryAfterSec } = await checkRateLimit(userId);
    if (!allowed) {
      return NextResponse.json(
        {
          error: 'rate_limit',
          message: `თქვენ მიაღწიეთ დღევანდელ ${RATE_LIMIT} მესიჯის ლიმიტს. შეგიძლიათ დაბრუნდეთ 24 საათის შემდეგ 💚`,
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
