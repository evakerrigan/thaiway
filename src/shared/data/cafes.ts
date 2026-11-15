import { Place } from '@/shared/types';

/**
 * Кафе, которых нет в «11 лучших местах».
 * Показываются на странице /cafes (вместе с топ-местами, у которых category: 'cafe').
 * Чтобы добавить кафе — допишите объект в массив; фото — в `media` (первое станет обложкой).
 */
export const CAFES: Place[] = [
  {
    id: 'cat-cafe-bangkok',
    name: 'Котокафе',
    region: 'Бангкок',
    category: 'cafe',
    // TODO: заменить на точные координаты котокафе (сейчас — центр Бангкока)
    coordinates: { lat: 13.7563, lng: 100.5018 },
    description: 'Кафе с котиками в Бангкоке.',
    // TODO: добавить googleMapsUrl и фото в media
  },
];
