"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
}

export function GalleryGrid({
  images,
  closeLabel,
  prevLabel,
  nextLabel,
}: GalleryGridProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = (idx: number) => setLightbox(idx);
  const close = () => setLightbox(null);
  const prev = () =>
    setLightbox((i) =>
      i !== null ? (i - 1 + images.length) % images.length : null,
    );
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => open(idx)}
            className="relative aspect-square overflow-hidden rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4FA3]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-400"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <ZoomIn
                size={24}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={close}
        >
          {/* Close */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            onClick={close}
            aria-label={closeLabel}
          >
            <X size={24} />
          </Button>

          {/* Counter */}
          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm z-10">
            {lightbox + 1} / {images.length}
          </span>

          {/* Prev */}
          <button
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors flex items-center justify-center z-10"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label={prevLabel}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors flex items-center justify-center z-10"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label={nextLabel}
          >
            <ChevronRight size={22} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[80vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              width={1200}
              height={800}
              className="max-h-[72vh] w-auto object-contain rounded-lg shadow-2xl"
            />
            {images[lightbox].caption && (
              <p className="text-white/80 text-sm text-center mt-3 max-w-lg">
                {images[lightbox].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
