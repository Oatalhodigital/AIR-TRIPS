import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Analytics } from "@/components/Analytics";
import { TravelpayoutsDrive } from "@/components/TravelpayoutsDrive";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "AIR-TRIP — Passagens, hotéis e passeios",
  description: "Compare ofertas de voos corporativos, hotéis e passeios. O AIR-TRIP é um divulgador e comparador, não uma agência.",
  openGraph: {
    title: "AIR-TRIP",
    description: "Compare ofertas de voos, hotéis e passeios.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Analytics />
        <TravelpayoutsDrive />
      </body>
    </html>
  );
}
