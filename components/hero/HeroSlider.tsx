"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Slide {
  id: string | number;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  href: string;
}

interface HeroSliderProps {
  slides: Slide[];
  lang: string;
  learnMoreLabel: string;
}

export function HeroSlider({ slides, lang, learnMoreLabel }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const go = useCallback(
    (idx: number) => setCurrent((idx + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      6000,
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(
      lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "uz-UZ",
      { year: "numeric", month: "long", day: "numeric" },
    );

  return (
    <div className="relative h-[72vh] min-h-120 max-h-195 w-full overflow-hidden bg-[#163a7d]">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay gradient */}
      <div className="bg-linear-to-t absolute inset-0 from-black/80 via-black/35 to-black/5" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 max-w-7xl pb-16 sm:pb-20">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`max-w-2xl text-white transition-all duration-500 ${
                i === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 absolute pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
                <Calendar size={14} />
                <span>{formatDate(slide.date)}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold leading-tight mb-3">
                {slide.title}
              </h1>
              <p className="text-blue-100 text-base sm:text-lg mb-6 line-clamp-2 max-w-xl">
                {slide.subtitle}
              </p>
              <Button
                asChild
                className="bg-white text-[#1E4FA3] hover:bg-blue-50 font-semibold shadow-lg"
              >
                <Link href={slide.href}>{learnMoreLabel}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => go(current - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(current + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-7 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
