import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { Logo } from "@/components/logo";

interface FooterProps {
  dict: Dictionary;
  lang: Locale;
}

const socialLinks = [
  { label: "Telegram", href: "https://t.me/mihu_uz", icon: "✈" },
  { label: "Instagram", href: "https://www.instagram.com/mihu_uz", icon: "📷" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61578190050763",
    icon: "👥",
  },
  { label: "YouTube", href: "https://www.youtube.com/@MIHU_UZ", icon: "▶" },
];

export function Footer({ dict, lang }: FooterProps) {
  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/news`, label: dict.nav.news },
    { href: `/${lang}/partnership`, label: dict.nav.partnership },
    { href: `/${lang}/gallery`, label: dict.nav.gallery },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="bg-[#1E4FA3] text-white">
      <div className="container mx-auto px-4 max-w-7xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4 rounded-md bg-white px-2 py-1.5 inline-flex">
              <Logo lang={lang} />
            </div>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
              {dict.footer.description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white text-base mb-5">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-100 hover:text-white transition-colors text-sm flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-300 group-hover:bg-white transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white text-base mb-5">
              {dict.footer.contactInfo}
            </h3>
            <div className="space-y-3 text-sm text-blue-100">
              <div className="flex gap-2.5">
                <span className="mt-0.5 shrink-0">📍</span>
                <span>{dict.footer.address}</span>
              </div>
              <div className="flex gap-2.5">
                <span className="shrink-0">📞</span>
                <a
                  href={`tel:${dict.footer.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {dict.footer.phone}
                </a>
              </div>
              <div className="flex gap-2.5">
                <span className="shrink-0">✉️</span>
                <a
                  href={`mailto:${dict.footer.email}`}
                  className="hover:text-white transition-colors"
                >
                  {dict.footer.email}
                </a>
              </div>
            </div>
          </div>
          {/* Social */}
          <div>
            <h3 className="font-semibold text-white text-base mb-5">
              {dict.footer.social}
            </h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-blue-100 hover:text-white transition-colors text-sm"
                >
                  <span className="text-base w-5 text-center">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-400/40">
        <div className="container mx-auto px-4 max-w-7xl py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-blue-200">
          <span>
            © {new Date().getFullYear()} ANEC Uzbekistan. {dict.footer.rights}.
          </span>
          <span className="text-blue-300 text-xs">info@uzmihu.com</span>
        </div>
      </div>
    </footer>
  );
}
