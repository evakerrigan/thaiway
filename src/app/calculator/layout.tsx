import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Калькулятор поездки в Таиланд',
  description:
    'Прикиньте примерную стоимость путешествия в Таиланд из Москвы: перелёт, проживание и расходы на месте для взрослых и детей.',
  openGraph: {
    title: 'Калькулятор поездки в Таиланд — ThaiWay',
    description: 'Примерный бюджет поездки из Москвы: укажите взрослых, детей и количество дней.',
  },
};

export default function CalculatorLayout({ children }: { children: ReactNode }) {
  return children;
}
