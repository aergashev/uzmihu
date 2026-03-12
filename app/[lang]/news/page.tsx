import { notFound } from "next/navigation";
import { NewsFilter } from "@/components/news-filter/NewsFilter";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getNews } from "@/lib/content";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [dict, news] = await Promise.all([getDictionary(lang), getNews(lang)]);
  const d = dict.news;

  return (
    <>
      {/* Header */}
      <div className="bg-[#1E4FA3] text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <p className="text-blue-200 text-sm uppercase tracking-widest font-medium mb-2">
            ANEC
          </p>
          <h1 className="text-4xl font-bold">{d.title}</h1>
          <p className="text-blue-100 mt-3">{d.subtitle}</p>
        </div>
      </div>

      {/* Grid */}
      <section className="py-14 bg-[#F5F6F8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <NewsFilter
            news={news}
            lang={lang}
            readMoreLabel={d.readMore}
            allLabel={d.allCategories}
            noNewsLabel={d.noNews}
            categories={d.categories}
          />
        </div>
      </section>
    </>
  );
}
