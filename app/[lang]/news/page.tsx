import { notFound } from "next/navigation";
import { NewsCard } from "@/components/news-card/NewsCard";
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
          {news.length === 0 ? (
            <p className="text-gray-500 text-center py-20">{d.noNews}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard
                  key={item.id}
                  slug={item.slug}
                  title={item.title}
                  excerpt={item.excerpt}
                  date={item.date}
                  image={item.image}
                  lang={lang}
                  readMoreLabel={d.readMore}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
