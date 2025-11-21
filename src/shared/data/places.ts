import { Place } from '@/shared/types';

/**
 * База данных мест Таиланда
 * Легко расширяется - просто добавьте новый объект в массив
 */
export const PLACES: Place[] = [
  {
    id: 'bangkok',
    name: 'Бангкок',
    coordinates: {
      lat: 13.736717,
      lng: 100.523186,
    },
    description: 'Бангкок — столица и самый крупный город Таиланда, культурный и экономический центр страны. Город славится величественными храмами, современными торговыми центрами и оживленной ночной жизнью. Здесь древние традиции гармонично сочетаются с современностью. Обязательно посетите Большой дворец и храм Изумрудного Будды. Бангкок — это город, который никогда не спит.',
    image: '/images/places/bangkok.jpg',
    category: 'city',
  },
  {
    id: 'koh-phangan',
    name: 'Ко Панган',
    coordinates: {
      lat: 9.7382,
      lng: 100.0208,
    },
    description: 'Ко Панган — тропический остров в Сиамском заливе, известный своими вечеринками Full Moon Party. Остров предлагает прекрасные пляжи с белым песком и кристально чистой водой. Здесь можно найти уединенные бухты для спокойного отдыха. Панган идеален для любителей дайвинга и снорклинга. Это рай для путешественников, ищущих приключений.',
    image: '/images/places/koh-phangan.jpg',
    category: 'island',
  },
];

/**
 * Получить место по ID
 */
export const getPlaceById = (id: string): Place | undefined => {
  return PLACES.find((place) => place.id === id);
};

/**
 * Получить все места определенной категории
 */
export const getPlacesByCategory = (category: Place['category']): Place[] => {
  return PLACES.filter((place) => place.category === category);
};

