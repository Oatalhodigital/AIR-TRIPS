import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
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
        <Footer />
        <Analytics />
        <VercelAnalytics />
        <TravelpayoutsDrive />
        <script
          id="travelpayouts-drive"
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          data-no-defer="1"
          data-cmp-ab="2"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var script = document.createElement("script");
                script.id = "travelpayouts-drive-external";
                script.async = 1;
                script.setAttribute("data-cmp-ab", "2");
                script.src = 'https://emrldtp.cc/NTcwMDUx.js?t=570051';
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
