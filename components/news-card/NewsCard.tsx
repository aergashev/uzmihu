import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface NewsCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  lang: string;
  readMoreLabel: string;
}

export function NewsCard({
  slug,
  title,
  excerpt,
  date,
  image,
  lang,
  readMoreLabel,
}: NewsCardProps) {
  const formattedDate = new Date(date).toLocaleDateString(
    lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "uz-UZ",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <Link href={`/${lang}/news/${slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-0 shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-[#1E4FA3]/20 transition-all duration-300 p-0 gap-0">
        <div className="overflow-hidden aspect-video">
          <Image
            src={image}
            alt={title}
            width={800}
            height={450}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-1.5 text-[#1E4FA3] text-xs font-medium">
            <Calendar size={12} />
            <span>{formattedDate}</span>
          </div>
          <h3 className="font-semibold text-[#1A1A1A] text-base leading-snug line-clamp-2 group-hover:text-[#1E4FA3] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-3 flex-1">{excerpt}</p>
          <div className="flex items-center gap-1 text-[#1E4FA3] font-medium text-sm mt-auto">
            <span>{readMoreLabel}</span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
