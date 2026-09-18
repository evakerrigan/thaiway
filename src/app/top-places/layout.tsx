import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '11 лучших мест Таиланда',
  description:
    'Личная подборка: храм Wat Pha Sorn Kaew, водопад Mae Ya, Дой Интанон, Белый храм, Симиланы, Рейли и другие места с фото, видео и координатами.',
  openGraph: {
    title: '11 лучших мест Таиланда — ThaiWay',
    description:
      'Личная подборка любимых мест на карте: от храма с мозаичными буддами до слияния двух рек в Чао Прайя.',
  },
};

export default function TopPlacesLayout({ children }: { children: ReactNode }) {
  return children;
}
