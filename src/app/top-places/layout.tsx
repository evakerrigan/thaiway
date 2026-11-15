import type { Metadata } from 'next';
import { ROUTES } from '@/shared/config';

// Сама страница — клиентский компонент, поэтому метаданные задаём здесь.
const description =
  'Личная подборка 11 лучших мест Таиланда с фото и видео: Wat Pha Sorn Kaew, водопад Mae Ya, Дой Интанон, Белый храм, Рейли, Симиланы, Ангкор Ват и другие.';

export const metadata: Metadata = {
  title: '11 лучших мест Таиланда',
  description,
  alternates: { canonical: ROUTES.TOP_PLACES },
  openGraph: { title: '11 лучших мест Таиланда', description, url: ROUTES.TOP_PLACES },
};

export default function TopPlacesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
