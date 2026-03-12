import { WorldMap } from "@/components/ui/map";
import type { Locale } from "@/lib/i18n";

type CooperationCopy = {
  title: string;
  description: string;
  uzbekistan: string;
};

const cooperationCopy: Record<Locale, CooperationCopy> = {
  en: {
    title: "International Cooperation",
    description:
      "The Association of National Economic Cooperation of Uzbekistan works with partners across multiple countries worldwide, strengthening economic collaboration and investment opportunities.",
    uzbekistan: "Uzbekistan",
  },
  ru: {
    title: "Международное сотрудничество",
    description:
      "Ассоциация Национального Экономического Сотрудничества Узбекистана работает с партнёрами во многих странах мира, укрепляя экономическое взаимодействие и инвестиционные возможности.",
    uzbekistan: "Узбекистан",
  },
  uz: {
    title: "Xalqaro hamkorlik",
    description:
      "O'zbekiston Milliy Iqtisodiy Hamkorlik Uyushmasi dunyoning turli mamlakatlaridagi hamkorlar bilan ishlab, iqtisodiy hamkorlik va investitsiya imkoniyatlarini mustahkamlaydi.",
    uzbekistan: "O'zbekiston",
  },
};

const TASHKENT = { lat: 41.2995, lng: 69.2401 };

const destinations = [
  { lat: 39.9042, lng: 116.4074 }, // Beijing
  { lat: 41.0082, lng: 28.9784 }, // Istanbul
  { lat: 40.7128, lng: -74.006 }, // New York
  { lat: 51.5074, lng: -0.1278 }, // London
  { lat: 24.7136, lng: 46.6753 }, // Riyadh
  { lat: 35.6762, lng: 139.6503 }, // Tokyo
  { lat: 52.2297, lng: 21.0122 }, // Warsaw
  { lat: 3.139, lng: 101.6869 }, // Kuala Lumpur
  { lat: -35.2809, lng: 149.13 }, // Canberra
  { lat: 33.6844, lng: 73.0479 }, // Islamabad
];

interface GlobalCooperationSectionProps {
  lang: Locale;
}

export function GlobalCooperationSection({
  lang,
}: GlobalCooperationSectionProps) {
  const c = cooperationCopy[lang];

  const dots = destinations.map((dest, i) => ({
    start: { ...TASHKENT, label: i === 0 ? c.uzbekistan : undefined },
    end: dest,
  }));

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

        <WorldMap dots={dots} lineColor="#1e4fa3" />
      </div>
    </section>
  );
}
