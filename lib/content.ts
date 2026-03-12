import type { Locale } from "./i18n";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  href: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  content: string;
}

export interface Leader {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  category: "strategic" | "member";
  description: string;
  logo?: string;
  website?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

// ─── Loaders ─────────────────────────────────────────────────────────────────

export async function getSlides(locale: Locale): Promise<Slide[]> {
  if (locale === "ru")
    return (await import("@/content/ru/slides.json")).default;
  if (locale === "en")
    return (await import("@/content/en/slides.json")).default;
  return (await import("@/content/uz/slides.json")).default;
}

export async function getNews(locale: Locale): Promise<NewsItem[]> {
  if (locale === "ru") return (await import("@/content/ru/news.json")).default;
  if (locale === "en") return (await import("@/content/en/news.json")).default;
  return (await import("@/content/uz/news.json")).default;
}

export async function getLeadership(locale: Locale): Promise<Leader[]> {
  if (locale === "ru")
    return (await import("@/content/ru/leadership.json")).default;
  if (locale === "en")
    return (await import("@/content/en/leadership.json")).default;
  return (await import("@/content/uz/leadership.json")).default;
}

export async function getPartners(locale: Locale): Promise<Partner[]> {
  if (locale === "ru")
    return (await import("@/content/ru/partners.json")).default as Partner[];
  if (locale === "en")
    return (await import("@/content/en/partners.json")).default as Partner[];
  return (await import("@/content/uz/partners.json")).default as Partner[];
}

export async function getGallery(locale: Locale): Promise<GalleryImage[]> {
  if (locale === "ru")
    return (await import("@/content/ru/gallery.json")).default;
  if (locale === "en")
    return (await import("@/content/en/gallery.json")).default;
  return (await import("@/content/uz/gallery.json")).default;
}
