"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { locales, type Locale, type Dictionary } from "@/lib/i18n";
import { Logo } from "@/components/logo";

interface NavbarProps {
  dict: Dictionary;
  lang: Locale;
}

function LanguageFlag({ lang }: { lang: Locale }) {
  if (lang === "uz") {
    return (
      <svg
        viewBox="0 0 28 20"
        className="h-4 w-5 rounded-sm"
        aria-hidden="true"
      >
        <rect width="28" height="20" fill="#ffffff" />
        <rect width="28" height="7" y="0" fill="#1eb5e8" />
        <rect width="28" height="7" y="13" fill="#1faa59" />
        <rect width="28" height="1" y="7" fill="#ce1126" />
        <rect width="28" height="1" y="12" fill="#ce1126" />
      </svg>
    );
  }

  if (lang === "ru") {
    return (
      <svg
        viewBox="0 0 28 20"
        className="h-4 w-5 rounded-sm"
        aria-hidden="true"
      >
        <rect width="28" height="20" fill="#ffffff" />
        <rect width="28" height="6.67" y="6.67" fill="#0039a6" />
        <rect width="28" height="6.67" y="13.33" fill="#d52b1e" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 28 20" className="h-4 w-5 rounded-sm" aria-hidden="true">
      <rect width="28" height="20" fill="#b22234" />
      <rect y="2" width="28" height="2" fill="#ffffff" />
      <rect y="6" width="28" height="2" fill="#ffffff" />
      <rect y="10" width="28" height="2" fill="#ffffff" />
      <rect y="14" width="28" height="2" fill="#ffffff" />
      <rect y="18" width="28" height="2" fill="#ffffff" />
      <rect width="12" height="10" fill="#3c3b6e" />
    </svg>
  );
}

export function Navbar({ dict, lang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const desktopLangMenuRef = useRef<HTMLDivElement>(null);
  const mobileLangMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedDesktopMenu = desktopLangMenuRef.current?.contains(target);
      const clickedMobileMenu = mobileLangMenuRef.current?.contains(target);

      if (!clickedDesktopMenu && !clickedMobileMenu) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/news`, label: dict.nav.news },
    { href: `/${lang}/partnership`, label: dict.nav.partnership },
    { href: `/${lang}/gallery`, label: dict.nav.gallery },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${lang}`
      ? pathname === `/${lang}` || pathname === `/${lang}/`
      : pathname.startsWith(href);

  const switchLang = (newLang: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLang;
    return segments.join("/") || `/${newLang}`;
  };

  const handleLanguageChange = (newLang: Locale) => {
    if (newLang === lang) {
      setLangOpen(false);
      setOpen(false);
      return;
    }

    const targetPath = switchLang(newLang);
    router.replace(targetPath, { scroll: false });
    setLangOpen(false);
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Logo lang={lang} />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors group ${
                  isActive(link.href)
                    ? "text-[#1E4FA3]"
                    : "text-gray-700 hover:text-[#1E4FA3]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-1 left-3 right-3 h-0.5 bg-[#1E4FA3] rounded-full transition-transform origin-left ${
                    isActive(link.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative" ref={desktopLangMenuRef}>
              <button
                type="button"
                onClick={() => setLangOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold uppercase text-gray-700 transition-colors hover:bg-gray-50"
                aria-haspopup="menu"
                aria-expanded={langOpen}
              >
                <LanguageFlag lang={lang} />
                {lang}
                <svg
                  viewBox="0 0 20 20"
                  className={`h-3.5 w-3.5 transition-transform ${
                    langOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5 10 12.5 15 7.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {langOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-32 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
                >
                  {locales.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => handleLanguageChange(l)}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold uppercase transition-colors ${
                        l === lang
                          ? "bg-[#1E4FA3] text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <LanguageFlag lang={l} />
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu size={20} />
                  <span className="sr-only">{dict.nav.menu}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-14 px-0">
                <div className="px-4 mb-6">
                  <Logo lang={lang} />
                </div>
                <nav className="flex flex-col">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`px-6 py-3.5 text-sm font-medium border-b border-gray-100 transition-colors ${
                        isActive(link.href)
                          ? "text-[#1E4FA3] bg-blue-50"
                          : "text-gray-700 hover:text-[#1E4FA3] hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="px-6 mt-6">
                  <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">
                    Language
                  </p>
                  <div className="relative" ref={mobileLangMenuRef}>
                    <button
                      type="button"
                      onClick={() => setLangOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-semibold uppercase text-gray-700"
                      aria-haspopup="menu"
                      aria-expanded={langOpen}
                    >
                      <span className="flex items-center gap-2">
                        <LanguageFlag lang={lang} />
                        {lang}
                      </span>
                      <svg
                        viewBox="0 0 20 20"
                        className={`h-3.5 w-3.5 transition-transform ${
                          langOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <path
                          d="M5 7.5 10 12.5 15 7.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {langOpen && (
                      <div
                        role="menu"
                        className="mt-2 overflow-hidden rounded-md border border-gray-200 bg-white"
                      >
                        {locales.map((l) => (
                          <button
                            key={l}
                            type="button"
                            onClick={() => handleLanguageChange(l)}
                            className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold uppercase transition-colors ${
                              l === lang
                                ? "bg-[#1E4FA3] text-white"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <LanguageFlag lang={l} />
                            {l}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
