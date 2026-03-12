import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getNews } from "@/lib/content";
import { formatContentDate } from "@/lib/date";

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const [dict, news] = await Promise.all([getDictionary(lang), getNews(lang)]);
  const article = news.find((n) => n.slug === slug);

  if (!article) notFound();

  const d = dict.news;
  const formattedDate = formatContentDate(article.date, lang);

  return (
    <>
      {/* Header */}
      <div className="bg-[#1E4FA3] text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href={`/${lang}/news`}
            className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            {d.back}
          </Link>
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Calendar size={14} />
            <span>
              {d.publishedOn}: {formattedDate}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Article body */}
      <article className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-md">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-gray-700 text-base leading-relaxed mb-5"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back button */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <Button
              variant="outline"
              asChild
              className="gap-2 text-[#1E4FA3] border-[#1E4FA3]"
            >
              <Link href={`/${lang}/news`}>
                <ArrowLeft size={16} />
                {d.back}
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
