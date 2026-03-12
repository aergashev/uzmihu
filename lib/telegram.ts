export interface ContactFormData {
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
}

interface TelegramSendResult {
  ok: boolean;
  error?: string;
}

export async function sendTelegramMessage(
  data: ContactFormData,
): Promise<TelegramSendResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram bot token or chat ID not configured");
    return {
      ok: false,
      error:
        "Telegram configuration missing (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID)",
    };
  }

  const text =
    `New Contact Request\n\n` +
    `Name: ${data.name}\n` +
    `Organization: ${data.organization || "-"}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone || "-"}\n\n` +
    `Message:\n${data.message}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      },
    );
    const result = await response.json();

    if (!response.ok || result.ok !== true) {
      const description =
        typeof result?.description === "string"
          ? result.description
          : "Unknown Telegram API error";
      console.error("Telegram API error:", description);
      return { ok: false, error: description };
    }

    return { ok: true };
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return { ok: false, error: "Network error while contacting Telegram" };
  }
}
