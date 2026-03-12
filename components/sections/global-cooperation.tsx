import { WorldMap } from "@/components/ui/map";
import type { Locale } from "@/lib/i18n";

type CooperationCopy = {
  title: string;
  description: string;
  countries: {
    uzbekistan: string;
    china: string;
    turkey: string;
    usa: string;
    uk: string;
    saudiArabia: string;
    japan: string;
    poland: string;
    pakistan: string;
    australia: string;
    malaysia: string;
  };
};

const cooperationCopy: Record<Locale, CooperationCopy> = {
  en: {
    title: "International Cooperation",
    description:
      "The Association of National Economic Cooperation of Uzbekistan works with partners across multiple countries worldwide, strengthening economic collaboration and investment opportunities.",
    countries: {
      uzbekistan: "Uzbekistan",
      china: "China",
      turkey: "Turkey",
      usa: "United States",
      uk: "United Kingdom",
      saudiArabia: "Saudi Arabia",
      japan: "Japan",
      poland: "Poland",
      pakistan: "Pakistan",
      australia: "Australia",
      malaysia: "Malaysia",
    },
  },
  ru: {
    title: "Международное сотрудничество",
    description:
      "Ассоциация Национального Экономического Сотрудничества Узбекистана работает с партнёрами во многих странах мира, укрепляя экономическое взаимодействие и инвестиционные возможности.",
    countries: {
      uzbekistan: "Узбекистан",
      china: "Китай",
      turkey: "Турция",
      usa: "США",
      uk: "Великобритания",
      saudiArabia: "Саудовская Аравия",
      japan: "Япония",
      poland: "Польша",
      pakistan: "Пакистан",
      australia: "Австралия",
      malaysia: "Малайзия",
    },
  },
  uz: {
    title: "Xalqaro hamkorlik",
    description:
      "O'zbekiston Milliy Iqtisodiy Hamkorlik Uyushmasi dunyoning turli mamlakatlaridagi hamkorlar bilan ishlab, iqtisodiy hamkorlik va investitsiya imkoniyatlarini mustahkamlaydi.",
    countries: {
      uzbekistan: "O'zbekiston",
      china: "Xitoy",
      turkey: "Turkiya",
      usa: "Amerika Qo'shma Shtatlari",
      uk: "Buyuk Britaniya",
      saudiArabia: "Saudiya Arabistoni",
      japan: "Yaponiya",
      poland: "Polsha",
      pakistan: "Pokiston",
      australia: "Avstraliya",
      malaysia: "Malayziya",
    },
  },
};

interface GlobalCooperationSectionProps {
  lang: Locale;
}

export function GlobalCooperationSection({
  lang,
}: GlobalCooperationSectionProps) {
  const c = cooperationCopy[lang];
  const cooperationDots = [
    {
      start: { lat: 41.2995, lng: 69.2401, label: c.countries.uzbekistan },
      end: { lat: 39.9042, lng: 116.4074, label: c.countries.china },
    },
    {
      start: { lat: 41.2995, lng: 69.2401, label: c.countries.uzbekistan },
      end: { lat: 39.9334, lng: 32.8597, label: c.countries.turkey },
    },
    {
      start: { lat: 41.2995, lng: 69.2401, label: c.countries.uzbekistan },
      end: { lat: 38.9072, lng: -77.0369, label: c.countries.usa },
    },
    {
      start: { lat: 41.2995, lng: 69.2401, label: c.countries.uzbekistan },
      end: { lat: 51.5074, lng: -0.1278, label: c.countries.uk },
    },
    {
      start: { lat: 41.2995, lng: 69.2401, label: c.countries.uzbekistan },
      end: { lat: 24.7136, lng: 46.6753, label: c.countries.saudiArabia },
    },
    {
      start: { lat: 41.2995, lng: 69.2401, label: c.countries.uzbekistan },
      end: { lat: 35.6762, lng: 139.6503, label: c.countries.japan },
    },
    {
      start: { lat: 41.2995, lng: 69.2401, label: c.countries.uzbekistan },
      end: { lat: 52.2297, lng: 21.0122, label: c.countries.poland },
    },
    {
      start: { lat: 41.2995, lng: 69.2401, label: c.countries.uzbekistan },
      end: { lat: 33.6844, lng: 73.0479, label: c.countries.pakistan },
    },
    {
      start: { lat: 41.2995, lng: 69.2401, label: c.countries.uzbekistan },
      end: { lat: -35.2809, lng: 149.13, label: c.countries.australia },
    },
    {
      start: { lat: 41.2995, lng: 69.2401, label: c.countries.uzbekistan },
      end: { lat: 3.139, lng: 101.6869, label: c.countries.malaysia },
    },
  ] as const;

  return (
    <section className="bg-[#F5F6F8] py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1E4FA3]">
            {c.title}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-[#1A1A1A]">{c.title}</h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {c.description}
          </p>
        </div>

        <WorldMap dots={[...cooperationDots]} />
      </div>
    </section>
  );
}
