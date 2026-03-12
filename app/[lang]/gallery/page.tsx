import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/gallery-grid/GalleryGrid";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getGallery } from "@/lib/content";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [dict, images] = await Promise.all([
    getDictionary(lang),
    getGallery(lang),
  ]);
  const d = dict.gallery;

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
          <GalleryGrid
            images={images}
            closeLabel={d.close}
            prevLabel={d.prev}
            nextLabel={d.next}
          />
        </div>
      </section>
    </>
  );
}
