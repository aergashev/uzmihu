import { NextResponse } from "next/server";
import { sendTelegramMessage, type ContactFormData } from "@/lib/telegram";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  // Validate required fields
  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { success: false, error: "Invalid email address" },
      { status: 400 },
    );
  }

  const formData: ContactFormData = {
    name,
    organization:
      typeof data.organization === "string" ? data.organization.trim() : "",
    email,
    phone: typeof data.phone === "string" ? data.phone.trim() : "",
    message,
  };

  const sent = await sendTelegramMessage(formData);

  if (!sent) {
    // Log failure but return success to avoid leaking system details
    console.error("Contact form: Telegram message delivery failed for", email);
    // If no Telegram config, still treat as success (form was received)
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}
