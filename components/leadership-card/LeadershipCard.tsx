import Image from "next/image";
import { Card } from "@/components/ui/card";

interface LeadershipCardProps {
  name: string;
  position: string;
  bio?: string;
  image: string;
}

export function LeadershipCard({
  name,
  position,
  bio,
  image,
}: LeadershipCardProps) {
  return (
    <Card className="overflow-hidden group border-0 shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-[#1E4FA3]/20 transition-all duration-300 p-0 gap-0">
      <div className="relative aspect-4/5 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="bg-linear-to-t absolute inset-0 from-[#1E4FA3]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[#1A1A1A] text-base leading-tight">
          {name}
        </h3>
        <p className="text-[#1E4FA3] text-sm font-medium mt-1">{position}</p>
        {bio && (
          <p className="text-gray-500 text-sm mt-2 line-clamp-3 leading-relaxed">
            {bio}
          </p>
        )}
      </div>
    </Card>
  );
}
