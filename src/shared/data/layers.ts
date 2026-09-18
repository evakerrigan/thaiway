/**
 * Слои карты на главной. Цвет слоя совпадает с цветом маркера — переключатели
 * одновременно работают легендой.
 */
export type LayerId = 'north-trip' | 'top-places' | 'thailand';

export interface MapLayer {
  id: LayerId;
  label: string;
  /** Короткое пояснение под названием. */
  hint: string;
  /** Цвет маркера / линии слоя. */
  color: string;
  /** Форма маркера в легенде. */
  marker: 'dot' | 'number' | 'outline';
}

export const MAP_LAYERS: MapLayer[] = [
  {
    id: 'north-trip',
    label: 'Маршрут на север',
    hint: 'На машине из Бангкока через Аюттхаю и Чиангмай до Чианграя',
    color: '#0b7f79',
    marker: 'dot',
  },
  {
    id: 'top-places',
    label: '11 лучших мест',
    hint: 'Личный рейтинг, от самого крутого',
    color: '#d9962b',
    marker: 'number',
  },
  {
    id: 'thailand',
    label: 'Граница страны',
    hint: 'Контур Таиланда на карте',
    color: '#6d8386',
    marker: 'outline',
  },
];

export const DEFAULT_ACTIVE_LAYERS: LayerId[] = ['north-trip', 'top-places', 'thailand'];

/** Что появится позже — показываем свёрнутым списком, а не мёртвыми кнопками. */
export const COMING_SOON_LAYERS = ['Музеи', 'Кафе', 'Достопримечательности', 'Отели'];

/** Точки маршрута «на север» в порядке движения. */
export const ROUTE_PLACE_IDS = [
  'bangkok',
  'ayutthaya',
  'lopburi',
  'phitsanulok',
  'chiangmai',
  'mae-ya-waterfall',
  'chiangrai',
  'nakhonsawan',
];
