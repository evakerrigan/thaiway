import { Place } from '@/shared/types';

/**
 * Кафе, которых нет в «11 лучших местах».
 * Показываются на странице /cafes (вместе с топ-местами, у которых category: 'cafe').
 * Чтобы добавить кафе — допишите объект в массив; фото — в `media` (первое станет обложкой).
 */
export const CAFES: Place[] = [
  {
    id: 'cat-cafe-bangkok',
    name: 'Котокафе Caturday',
    region: 'Бангкок',
    category: 'cafe',
    coordinates: { lat: 13.7514018, lng: 100.5321443 },
    googleMapsUrl: 'https://maps.app.goo.gl/JWZ2qX786dCKivM48',
    description: 'Кафе с котиками в Бангкоке.',
    media: [
      // Первое фото — обложка.
      { type: 'image', src: '/cafes/cat-cafe-hall.jpg', alt: 'Зал котокафе Caturday с котами на столах и полках' },
      { type: 'image', src: '/cafes/cat-cafe-windows.jpg', alt: 'Котокафе Caturday: столики у арочных окон' },
      { type: 'image', src: '/cafes/cat-cafe-cat.jpg', alt: 'Пушистый вислоухий кот в котокафе Caturday' },
      { type: 'image', src: '/cafes/cat-cafe-bow.jpg', alt: 'Сонный кот с бантиком на шее' },
      { type: 'image', src: '/cafes/cat-cafe-ginger.jpg', alt: 'Рыжий пушистый кот дремлет на полу' },
      { type: 'image', src: '/cafes/cat-cafe-persian.jpg', alt: 'Белый персидский кот сидит у окна' },
    ],
  },
];
