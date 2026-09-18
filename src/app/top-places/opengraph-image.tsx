import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/shared/og';

export const alt = '11 лучших мест Таиланда — личная подборка ThaiWay';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpenGraphImage() {
  return renderOgCard({
    eyebrow: 'Личная подборка',
    title: '11 лучших мест Таиланда',
    subtitle: 'От храма с мозаичными буддами на горе до слияния двух рек в великую Чао Прайя.',
    tags: ['Храмы', 'Водопады', 'Острова', 'Фото и видео'],
    photo: 'top-places/Sorn-Kaew1.jpg',
    photoPosition: '60% 35%',
  });
}
