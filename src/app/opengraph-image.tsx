import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/shared/og';

export const alt = 'ThaiWay — личный путеводитель по Таиланду';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpenGraphImage() {
  return renderOgCard({
    eyebrow: 'Личный путеводитель по Таиланду',
    title: 'Таиланд без туристических списков',
    subtitle:
      'Интерактивная карта, маршрут на север на машине и 11 любимых мест с фото и видео.',
    tags: ['Карта', 'Маршрут на север', '11 лучших мест', 'Калькулятор поездки'],
    photo: 'top-places/similan3.jpg',
    photoPosition: '55% 60%',
  });
}
