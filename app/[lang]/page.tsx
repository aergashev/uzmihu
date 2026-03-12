import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { NewsCard } from "@/components/news-card/NewsCard";
import { GlobalCooperationSection } from "@/components/sections/global-cooperation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getSlides, getNews, getPartners, getGallery } from "@/lib/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [dict, slides, news, partners, gallery] = await Promise.all([
    getDictionary(lang),
    getSlides(lang),
    getNews(lang),
    getPartners(lang),
    getGallery(lang),
  ]);

  const s = dict.home;
  const strategicPartners = partners
    .filter((p) => p.category === "strategic")
    .slice(0, 6);
  const members = partners.filter((p) => p.category === "member").slice(0, 6);

  return (
    <>
      {/* ─── Hero Slider ─────────────────────────────────────────── */}
      <div className="-mt-16">
        <HeroSlider
          slides={slides}
          lang={lang}
          learnMoreLabel={dict.hero.learnMore}
        />
      </div>

      {/* ─── Latest News ─────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F6F8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[#1E4FA3] text-sm font-semibold uppercase tracking-widest mb-1">
                {s.latestNews}
              </p>
              <h2 className="text-3xl font-bold text-[#1A1A1A]">
                {s.latestNews}
              </h2>
            </div>
            <Link
              href={`/${lang}/news`}
              className="hidden sm:flex items-center gap-1.5 text-[#1E4FA3] font-semibold text-sm hover:gap-2.5 transition-all"
            >
              {s.viewAll}
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map((item) => (
              <NewsCard
                key={item.id}
                slug={item.slug}
                title={item.title}
                excerpt={item.excerpt}
                date={item.date}
                image={item.image}
                lang={lang}
                readMoreLabel={s.readMore}
              />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href={`/${lang}/news`}>{s.viewAll}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── About Section ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#1E4FA3]/10 text-[#1E4FA3] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                {s.aboutSection.badge}
              </span>
              <h2 className="text-3xl font-bold text-[#1A1A1A] leading-tight mb-5">
                {s.aboutSection.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {s.aboutSection.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#F5F6F8] rounded-xl p-5">
                  <CheckCircle size={20} className="text-[#1E4FA3] mb-2" />
                  <p className="font-semibold text-[#1A1A1A] text-sm mb-1">
                    {s.aboutSection.mission}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {s.aboutSection.missionText}
                  </p>
                </div>
                <div className="bg-[#F5F6F8] rounded-xl p-5">
                  <CheckCircle size={20} className="text-[#1E4FA3] mb-2" />
                  <p className="font-semibold text-[#1A1A1A] text-sm mb-1">
                    {s.aboutSection.activity}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {s.aboutSection.activityText}
                  </p>
                </div>
              </div>
              <Button
                asChild
                className="bg-[#1E4FA3] hover:bg-[#163a7d] text-white gap-2"
              >
                <Link href={`/${lang}/about`}>
                  {s.aboutSection.cta}
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            <div className="relative h-80 overflow-hidden rounded-2xl shadow-xl lg:h-110">
              <Image
                src="https://picsum.photos/seed/about-main/800/600"
                alt="About ANEC"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="bg-linear-to-tr absolute inset-0 from-[#1E4FA3]/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ───────────────────────────────────────── */}
      <section className="py-14 bg-[#1E4FA3]">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-center text-white text-2xl font-bold mb-10">
            {dict.stats.title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              {
                value: dict.stats.investments,
                label: dict.stats.investmentsLabel,
              },
              { value: dict.stats.projects, label: dict.stats.projectsLabel },
              { value: dict.stats.meetings, label: dict.stats.meetingsLabel },
              {
                value: dict.stats.agreements,
                label: dict.stats.agreementsLabel,
              },
              { value: dict.stats.members, label: dict.stats.membersLabel },
              {
                value: dict.stats.volunteers,
                label: dict.stats.volunteersLabel,
              },
              { value: dict.stats.seminars, label: dict.stats.seminarsLabel },
              { value: dict.stats.countries, label: dict.stats.countriesLabel },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-blue-200 text-xs sm:text-sm leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlobalCooperationSection lang={lang} />

      {/* ─── Partners ────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10">
            <p className="text-[#1E4FA3] text-sm font-semibold uppercase tracking-widest mb-1">
              {s.partnersSection.subtitle}
            </p>
            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              {s.partnersSection.title}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...strategicPartners, ...members.slice(0, 6)]
              .slice(0, 6)
              .map((partner) => (
                <div
                  key={partner.id}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#F5F6F8] hover:bg-[#1E4FA3]/5 transition-colors"
                >
                  <div className="bg-linear-to-br flex h-12 w-12 items-center justify-center rounded-full from-[#1E4FA3] to-[#3C74D8] text-sm font-bold text-white">
                    {partner.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <p className="text-center text-xs font-medium text-gray-700 leading-tight line-clamp-2">
                    {partner.name}
                  </p>
                </div>
              ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              asChild
              className="border-[#1E4FA3] text-[#1E4FA3] hover:bg-[#1E4FA3] hover:text-white gap-2"
            >
              <Link href={`/${lang}/partnership`}>
                {s.viewAll}
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Gallery Preview ─────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F6F8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[#1E4FA3] text-sm font-semibold uppercase tracking-widest mb-1">
                {s.gallerySection.subtitle}
              </p>
              <h2 className="text-3xl font-bold text-[#1A1A1A]">
                {s.gallerySection.title}
              </h2>
            </div>
            <Link
              href={`/${lang}/gallery`}
              className="hidden sm:flex items-center gap-1.5 text-[#1E4FA3] font-semibold text-sm hover:gap-2.5 transition-all"
            >
              {s.gallerySection.viewAll}
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gallery.slice(0, 6).map((img) => (
              <Link
                key={img.id}
                href={`/${lang}/gallery`}
                className="relative aspect-square overflow-hidden rounded-xl group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-400"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              asChild
              className="bg-[#1E4FA3] hover:bg-[#163a7d] text-white gap-2"
            >
              <Link href={`/${lang}/gallery`}>
                {s.gallerySection.viewAll}
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Contact CTA ─────────────────────────────────────────── */}
      <section className="py-20 bg-[#1E4FA3]">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {s.contactSection.title}
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">
            {s.contactSection.description}
          </p>
          <Button
            asChild
            className="bg-white text-[#1E4FA3] hover:bg-blue-50 font-semibold text-base px-8 h-12 shadow-lg"
          >
            <Link href={`/${lang}/contact`}>{s.contactSection.cta}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
