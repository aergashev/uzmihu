import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

interface LogoProps {
  lang: Locale;
}

export function Logo({ lang }: LogoProps) {
  return (
    <Link href={`/${lang}`} className="flex items-center shrink-0">
      <Image
        src="/logo/logo_full.svg"
        alt="ANEC Uzbekistan"
        width={220}
        height={74}
        priority
        className="h-14 w-auto"
      />
    </Link>
  );
}
