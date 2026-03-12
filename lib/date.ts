import type { Locale } from "@/lib/i18n";

export function formatContentDate(date: string, locale: Locale): string {
  void locale;
  const parsed = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  const day = String(parsed.getUTCDate()).padStart(2, "0");
  const month = String(parsed.getUTCMonth() + 1).padStart(2, "0");
  const year = parsed.getUTCFullYear();

  return `${day}.${month}.${year}`;
}
