"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { locales, type Locale, type Dictionary } from "@/lib/i18n";

interface NavbarProps {
  dict: Dictionary;
  lang: Locale;
}

export function Navbar({ dict, lang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 rounded bg-[#1E4FA3] flex items-center justify-center">
              <span className="text-white font-bold text-sm leading-none">
                UZ
              </span>
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="font-bold text-[#1E4FA3] text-sm">ANEC</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                Uzbekistan
              </p>
            </div>
          </Link>

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
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={switchLang(l)}
                  className={`px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${
                    l === lang
                      ? "bg-[#1E4FA3] text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {l}
                </Link>
              ))}
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
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-[#1E4FA3] flex items-center justify-center">
                      <span className="text-white font-bold text-xs">UZ</span>
                    </div>
                    <span className="font-bold text-[#1E4FA3] text-sm">
                      ANEC Uzbekistan
                    </span>
                  </div>
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
                  <div className="flex gap-2">
                    {locales.map((l) => (
                      <Link
                        key={l}
                        href={switchLang(l)}
                        onClick={() => setOpen(false)}
                        className={`px-3 py-1.5 text-xs font-bold uppercase rounded border transition-colors ${
                          l === lang
                            ? "bg-[#1E4FA3] text-white border-[#1E4FA3]"
                            : "text-gray-600 border-gray-200 hover:border-[#1E4FA3] hover:text-[#1E4FA3]"
                        }`}
                      >
                        {l}
                      </Link>
                    ))}
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
