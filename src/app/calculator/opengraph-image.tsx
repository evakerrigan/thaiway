import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/shared/og';

export const alt = 'Калькулятор стоимости поездки в Таиланд — ThaiWay';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpenGraphImage() {
  return renderOgCard({
    eyebrow: 'Калькулятор поездки',
    title: 'Сколько стоит поездка в Таиланд',
    subtitle: 'Взрослые, дети и количество дней — примерный бюджет поездки из Москвы за секунду.',
    tags: ['Перелёт', 'Проживание', 'Расходы на месте'],
    photo: 'top-places/Sorn-Kaew6.jpg',
    photoPosition: '50% 42%',
  });
}
