export interface ContactFormData {
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
}

function escapeMarkdown(text: string): string {
  return String(text).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

export async function sendTelegramMessage(
  data: ContactFormData,
): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram bot token or chat ID not configured");
    return false;
  }

  const text =
    `🔔 *Yangi murojaat / Новое обращение / New Contact Request*\n\n` +
    `👤 *Ism / Имя / Name:* ${escapeMarkdown(data.name)}\n` +
    `🏢 *Tashkilot / Организация / Org:* ${escapeMarkdown(data.organization)}\n` +
    `📧 *Email:* ${escapeMarkdown(data.email)}\n` +
    `📞 *Tel:* ${escapeMarkdown(data.phone)}\n\n` +
    `💬 *Xabar / Сообщение / Message:*\n${escapeMarkdown(data.message)}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "MarkdownV2",
        }),
      },
    );
    const result = await response.json();
    return result.ok === true;
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return false;
  }
}
