import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildLevelTestEmail, type LevelTestResultPayload } from "./email";

export const runtime = "nodejs";

const RECIPIENT = process.env.LEVEL_TEST_RECIPIENT || "info@studiolingo.ge";
// Resend's shared sender works with no domain verification; override with a
// verified-domain address via RESEND_FROM once the domain is set up.
const FROM = process.env.RESEND_FROM || "Studio Lingo <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LevelTestResultPayload;
    const { firstName, lastName, email, result } = payload;

    if (!firstName || !lastName || !email || !result) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("level-test-result: RESEND_API_KEY unset");
      return NextResponse.json(
        { error: "Email is not configured" },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const { subject, text, html } = buildLevelTestEmail(payload);

    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("level-test-result: resend error", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("level-test-result: send failed", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
