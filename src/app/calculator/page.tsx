import type { Metadata } from 'next';
import { Container } from '@/shared/ui/container';
import { HandNote } from '@/shared/ui/journal';
import { Calculator } from '@/widgets/calculator';
import { ROUTES } from '@/shared/config';
import { pageOpenGraph } from '@/shared/config/site';

const description =
  'Калькулятор стоимости поездки в Таиланд из Москвы: перелёт, жильё и еда для взрослых и детей на нужное число дней.';

export const metadata: Metadata = {
  title: 'Калькулятор поездки в Таиланд',
  description,
  alternates: { canonical: ROUTES.CALCULATOR },
  openGraph: pageOpenGraph('Калькулятор поездки в Таиланд', description, ROUTES.CALCULATOR),
};

export default function CalculatorPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">
        <header className="flex flex-col gap-4">
          <HandNote className="origin-left -rotate-2">прикинуть бюджет</HandNote>
          <h1 className="m-0 font-display text-[clamp(40px,6vw,64px)] font-bold leading-[1.05]">
            Калькулятор поездки
          </h1>
          <p className="m-0 text-lg leading-relaxed text-ink-soft">
            Примерная стоимость путешествия в Таиланд из Москвы: перелёт, жильё и еда — по моему опыту.
          </p>
        </header>
        <Calculator />

        <section aria-labelledby="tickets-title" className="flex flex-col gap-5 pt-4">
          <h2 id="tickets-title" className="m-0 font-display text-[clamp(28px,3.4vw,36px)] font-bold leading-tight">
            Где искать билеты
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {TICKET_LINKS.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex h-full flex-col gap-2 bg-white p-5 text-ink shadow-paper transition-transform duration-200 hover:-translate-y-1 ${
                    index % 2 === 0 ? '-rotate-[0.6deg]' : 'rotate-[0.6deg]'
                  } hover:rotate-0`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-display text-2xl font-bold">{link.title}</span>
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-terracotta" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-soft">{link.note}</span>
                  <span className="mt-auto pt-1 text-sm font-bold text-terracotta group-hover:underline">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}

const TICKET_LINKS = [
  {
    title: 'Авиасейлс',
    note: 'Поиск и сравнение цен на авиабилеты.',
    label: 'aviasales.ru',
    href: 'https://www.aviasales.ru/',
  },
  {
    title: 'Телеграм-чат',
    note: 'Чат в Телеграме — можно спросить про билеты и перелёты.',
    label: 't.me/hkt_bkk',
    href: 'https://t.me/hkt_bkk',
  },
];
