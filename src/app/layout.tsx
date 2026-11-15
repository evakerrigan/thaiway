import type { Metadata } from "next";
import { Caveat, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

// Playfair и Caveat — вариативные шрифты: подключаем без списка весов.
// С явными weight Google отдаёт один и тот же файл на каждый вес, и Turbopack в dev
// падает с «next/font/google queries have exactly one entry».
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Тайский путь — личный путеводитель по Таиланду",
  description:
    "Личный путеводитель по Таиланду: 11 лучших мест, дорога на север на машине и калькулятор поездки.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${manrope.variable} ${playfair.variable} ${caveat.variable} antialiased flex flex-col min-h-screen bg-paper text-ink font-sans`}
      >
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
