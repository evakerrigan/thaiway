import type { Metadata } from 'next';
import { ROUTES } from '@/shared/config';
import { pageOpenGraph } from '@/shared/config/site';

// Сама страница — клиентский компонент (карта, окно места), поэтому метаданные задаём здесь.
const description =
  'Маршрут на север Таиланда на машине: Бангкок, Аюттхая, Лопбури, Пхитсанулок, Чиангмай и Чианграй — карта и остановки.';

export const metadata: Metadata = {
  title: 'Маршрут на север на машине',
  description,
  alternates: { canonical: ROUTES.NORTH_TRIP },
  openGraph: pageOpenGraph('Маршрут на север Таиланда на машине', description, ROUTES.NORTH_TRIP),
};

export default function NorthTripLayout({ children }: { children: React.ReactNode }) {
  return children;
}
