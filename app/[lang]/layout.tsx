import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
