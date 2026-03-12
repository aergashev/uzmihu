import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PartnerCardProps {
  name: string;
  description: string;
  website?: string;
  visitLabel: string;
}

export function PartnerCard({
  name,
  description,
  website,
  visitLabel,
}: PartnerCardProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="flex flex-col items-center text-center p-6 gap-4 border-0 shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-[#1E4FA3]/20 transition-all duration-300">
      {/* Logo placeholder */}
      <div className="bg-linear-to-br flex h-16 w-16 shrink-0 items-center justify-center rounded-full from-[#1E4FA3] to-[#3C74D8] text-lg font-bold text-white">
        {initials}
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-[#1A1A1A] text-sm leading-snug">
          {name}
        </h3>
        <p className="text-xs text-gray-500 mt-1.5 line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>

      {website && website !== "#" && (
        <Button variant="outline" size="sm" asChild className="text-xs gap-1">
          <Link href={website} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={12} />
            {visitLabel}
          </Link>
        </Button>
      )}
    </Card>
  );
}
