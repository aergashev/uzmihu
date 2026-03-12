export const locales = ["uz", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const dictionaries = {
  uz: () => import("@/lib/dictionaries/uz.json").then((m) => m.default),
  ru: () => import("@/lib/dictionaries/ru.json").then((m) => m.default),
  en: () => import("@/lib/dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
