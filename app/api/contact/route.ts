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
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || !phone || !message) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields (name, phone, message)",
      },
      { status: 400 },
    );
  }

  // Basic phone validation: must contain at least 7 digits
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || /[^\d+\s\-()]/.test(phone)) {
    return NextResponse.json(
      { success: false, error: "Invalid phone number format" },
      { status: 400 },
    );
  }

  // Basic email validation (only if provided)
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 },
      );
    }
  }

  const formData: ContactFormData = {
    name,
    organization:
      typeof data.organization === "string" ? data.organization.trim() : "",
    email,
    phone,
    message,
  };

  const telegramResult = await sendTelegramMessage(formData);

  if (!telegramResult.ok) {
    console.error(
      "Contact form: Telegram delivery failed:",
      telegramResult.error,
    );
    return NextResponse.json(
      {
        success: false,
        error:
          telegramResult.error ||
          "Telegram delivery failed. Check bot token, chat ID, and bot permissions.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
