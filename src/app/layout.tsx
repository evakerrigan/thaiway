import type { Metadata } from "next";
import { Golos_Text, Unbounded } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets/header";
import { LayoutFooter } from "@/widgets/footer";
import { BottomNav } from "@/widgets/bottom-nav";
import { SITE, SITE_URL } from "@/shared/config";

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Таиланд",
    "путеводитель",
    "карта Таиланда",
    "маршрут на север Таиланда",
    "лучшие места Таиланда",
    "стоимость поездки в Таиланд",
  ],
  // Картинки для превью подхватываются автоматически из opengraph-image.tsx
  // в корне и в сегментах /top-places и /calculator.
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${golos.variable} ${unbounded.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        <LayoutFooter />
        <BottomNav />
      </body>
    </html>
  );
}
