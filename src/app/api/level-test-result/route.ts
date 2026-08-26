import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const RECIPIENT = process.env.LEVEL_TEST_RECIPIENT || "info@studiolingo.ge";
// Resend's shared sender works with no domain verification; override with a
// verified-domain address via RESEND_FROM once the domain is set up.
const FROM = process.env.RESEND_FROM || "Studio Lingo <onboarding@resend.dev>";

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      age,
      contactMe,
      result,
      level,
      recommendedLevel,
    } = await request.json();

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

    const fullName = `${firstName} ${lastName}`;
    const subject = `დონის ტესტის შედეგი — ${fullName} (${result})`;
    const rows: [string, string][] = [
      ["სახელი", firstName],
      ["გვარი", lastName],
      ["ელ. ფოსტა", email],
      ["ტელეფონი", String(phone ?? "")],
      ["ასაკი", String(age ?? "")],
      ["შედეგი", result],
      ["დონე (CEFR)", String(level ?? "")],
      ["უნდა დაიწყოს", String(recommendedLevel ?? "")],
      ["დამიკავშირდით და გამაცანით კურსები", contactMe ? "კი" : "არა"],
    ];

    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
    const html = `
      <div style="font-family:Arial,sans-serif;font-size:15px;color:#293142">
        <h2 style="color:#2f9e4d;margin:0 0 12px">დონის ტესტის ახალი შედეგი</h2>
        <table style="border-collapse:collapse">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:4px 12px 4px 0;color:#8a929d">${escapeHtml(
                  k,
                )}</td><td style="padding:4px 0;font-weight:bold">${escapeHtml(
                  String(v),
                )}</td></tr>`,
            )
            .join("")}
        </table>
      </div>`;

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
