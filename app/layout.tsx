import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ANEC Uzbekistan",
    template: "%s | ANEC Uzbekistan",
  },
  description:
    "Official multilingual website of the Association of National Economic Cooperation of Uzbekistan.",
  applicationName: "ANEC Uzbekistan",
  metadataBase: new URL("https://uzmihu.uz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={cn("font-sans", inter.variable)}>
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
