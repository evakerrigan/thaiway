import type { Metadata } from 'next';
import { Container } from '@/shared/ui/container';
import { HandNote } from '@/shared/ui/journal';
import { Calculator } from '@/widgets/calculator';
import { ROUTES } from '@/shared/config';

const description =
  'Калькулятор стоимости поездки в Таиланд из Москвы: перелёт, жильё и еда для взрослых и детей на нужное число дней.';

export const metadata: Metadata = {
  title: 'Калькулятор поездки в Таиланд',
  description,
  alternates: { canonical: ROUTES.CALCULATOR },
  openGraph: { title: 'Калькулятор поездки в Таиланд', description, url: ROUTES.CALCULATOR },
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
      </div>
    </Container>
  );
}
