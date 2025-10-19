import { NextResponse } from "next/server";
import crypto from "crypto";

const BOG_PUBLIC_KEY = process.env.BOG_PUBLIC_KEY!;
const BOG_API_URL = "https://api.bog.ge/payments/v1/ecommerce/orders";

/**
 * BOG callback route
 * Called by BOG after payment completion
 */
export async function POST(req: Request) {
  // --- 1️⃣ Read raw body ---
  const rawBody = await req.arrayBuffer();
  const bodyBytes = new Uint8Array(rawBody);

  // --- 2️⃣ Extract signature header ---
  const signatureHeader = req.headers.get("Callback-Signature");
  if (!signatureHeader) {
    console.warn("Missing Callback-Signature header — rejecting callback.");
    return NextResponse.json(
      { error: "Missing signature header" },
      { status: 400 }
    );
  }

  // --- 3️⃣ Verify signature ---
  const isValid = verifyCallbackSignature(
    bodyBytes,
    signatureHeader,
    BOG_PUBLIC_KEY
  );
  if (!isValid) {
    console.warn("Invalid callback signature — ignoring callback.");
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  // --- 4️⃣ Parse payload safely ---
  let payload: BOGCallbackPayload;
  try {
    const json = new TextDecoder().decode(bodyBytes);
    payload = JSON.parse(json);
  } catch (err) {
    console.error("Failed to parse callback JSON:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log("✅ Verified BOG callback received:", payload);

  // --- 5️⃣ Business logic (mock example) ---
  try {
    await handlePaymentUpdate(payload);
  } catch (err) {
    console.error("Error updating order in DB:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  // --- 6️⃣ Acknowledge callback ---
  return NextResponse.json({ received: true });
}

/**
 * Verifies RSA SHA-256 signature of the callback.
 */
function verifyCallbackSignature(
  body: Uint8Array,
  signatureHeader: string,
  publicKeyPEM: string
): boolean {
  try {
    const verifier = crypto.createVerify("RSA-SHA256");
    verifier.update(body);
    verifier.end();
    const signature = Buffer.from(signatureHeader, "base64");
    return verifier.verify(
      publicKeyPEM,
      signature as unknown as NodeJS.ArrayBufferView
    );
  } catch (err) {
    console.error("Verification error:", err);
    return false;
  }
}

/**
 * Mock function to update your order status based on callback payload.
 */
async function handlePaymentUpdate(payload: BOGCallbackPayload) {
  const { external_order_id, payment_status } = payload.body;

  // Example: update your order in the database
  console.log(
    `Updating order ${external_order_id} to status: ${payment_status}`
  );

  // If payment status is unclear, fallback to direct API check
  if (payment_status !== "SUCCEEDED" && payment_status !== "FAILED") {
    const verifiedStatus = await fetchPaymentDetails(external_order_id);
    console.log(
      `Verified order ${external_order_id} via fallback:`,
      verifiedStatus
    );
  }
}

/**
 * Calls BOG API to retrieve payment details (fallback).
 */
async function fetchPaymentDetails(orderId: string) {
  const token = process.env.BOG_ACCESS_TOKEN!; // ideally fetch dynamically via /bog-token
  const res = await fetch(`${BOG_API_URL}/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept-Language": "ka",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch payment details:", text);
    return null;
  }

  const data = await res.json();
  return data;
}

/**
 * Example callback payload type (simplified).
 */
type BOGCallbackPayload = {
  event: string;
  body: {
    external_order_id: string;
    payment_status: "SUCCEEDED" | "FAILED" | "PENDING" | string;
    [key: string]: any;
  };
};
