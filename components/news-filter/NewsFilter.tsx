"use client";

import { useState } from "react";
import { NewsCard } from "@/components/news-card/NewsCard";
import type { NewsItem } from "@/lib/content";

interface NewsFilterProps {
  news: NewsItem[];
  lang: string;
  readMoreLabel: string;
  allLabel: string;
  noNewsLabel: string;
  categories: Record<string, string>;
}

export function NewsFilter({
  news,
  lang,
  readMoreLabel,
  allLabel,
  noNewsLabel,
  categories,
}: NewsFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Build unique category list from the actual news items
  const usedCategories = Array.from(
    new Set(news.map((item) => item.category).filter(Boolean)),
  ) as string[];

  const filtered =
    activeCategory === "all"
      ? news
      : news.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-[#1E4FA3] text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:border-[#1E4FA3] hover:text-[#1E4FA3]"
          }`}
        >
          {allLabel}
        </button>
        {usedCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-[#1E4FA3] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#1E4FA3] hover:text-[#1E4FA3]"
            }`}
          >
            {categories[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* News grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-20">{noNewsLabel}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <NewsCard
              key={item.id}
              slug={item.slug}
              title={item.title}
              excerpt={item.excerpt}
              date={item.date}
              image={item.image}
              lang={lang}
              readMoreLabel={readMoreLabel}
            />
          ))}
        </div>
      )}
    </>
  );
}
