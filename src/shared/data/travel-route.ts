/**
 * Маршрут путешествия по северному Таиланду
 * Бангкок -> Пхитсанулок -> Чиангмай -> Чианграй -> Чиангмай -> Накхонсаван -> Бангкок
 */

// Координаты городов маршрута
export const ROUTE_CITIES = {
  bangkok: { lat: 13.736717, lng: 100.523186 },
  phitsanulok: { lat: 16.821200, lng: 100.265100 },
  chiangmai: { lat: 18.788135, lng: 98.985520 },
  chiangrai: { lat: 19.910530, lng: 99.840576 },
  nakhonsawan: { lat: 15.704800, lng: 100.113200 },
} as const;

/**
 * Координаты маршрута для отрисовки линии
 * Порядок важен - определяет направление путешествия
 */
export const TRAVEL_ROUTE_COORDINATES = [
  // Старт в Бангкоке
  [ROUTE_CITIES.bangkok.lat, ROUTE_CITIES.bangkok.lng],
  
  // В Пхитсанулок (промежуточные точки для плавности)
  [14.500000, 100.400000],
  [15.200000, 100.350000],
  [ROUTE_CITIES.phitsanulok.lat, ROUTE_CITIES.phitsanulok.lng],
  
  // В Чиангмай
  [17.200000, 100.100000],
  [17.800000, 99.500000],
  [ROUTE_CITIES.chiangmai.lat, ROUTE_CITIES.chiangmai.lng],
  
  // В Чианграй
  [19.000000, 99.200000],
  [19.500000, 99.600000],
  [ROUTE_CITIES.chiangrai.lat, ROUTE_CITIES.chiangrai.lng],
  
  // Обратно в Чиангмай
  [19.500000, 99.600000],
  [19.000000, 99.200000],
  [ROUTE_CITIES.chiangmai.lat, ROUTE_CITIES.chiangmai.lng],
  
  // В Накхонсаван
  [18.200000, 99.300000],
  [17.000000, 99.800000],
  [16.200000, 100.000000],
  [ROUTE_CITIES.nakhonsawan.lat, ROUTE_CITIES.nakhonsawan.lng],
  
  // Обратно в Бангкок
  [15.200000, 100.200000],
  [14.500000, 100.350000],
  [ROUTE_CITIES.bangkok.lat, ROUTE_CITIES.bangkok.lng],
];

/**
 * Стиль линии маршрута (циан)
 */
export const ROUTE_STYLE = {
  strokeColor: '#B8432A', // Терракота — цвет маршрута в дизайне «Дневник»
  strokeOpacity: 0.9,
  strokeWidth: 4,
  strokeStyle: 'dash',
} as const;

/**
 * Альтернативные стили маршрута
 */
export const ROUTE_STYLE_BRIGHT_CYAN = {
  strokeColor: '#00FFFF', // Яркий циан
  strokeOpacity: 0.8,
  strokeWidth: 5,
} as const;

export const ROUTE_STYLE_TEAL = {
  strokeColor: '#20B2AA', // Бирюзовый
  strokeOpacity: 0.85,
  strokeWidth: 4,
} as const;


/**
 * Остановки маршрута «Путешествие на север на машине» — для ленты на главной.
 */
export const NORTH_TRIP_STOPS = [
  { id: 'bangkok', label: 'Старт', name: 'Бангкок', note: 'Большой дворец и город, который никогда не спит' },
  { id: 'ayutthaya', label: 'По пути', name: 'Аюттхая', note: 'Руины древней столицы Сиама' },
  { id: 'lopburi', label: 'По пути', name: 'Лопбури', note: 'Кхмерские храмы и сотни обезьян' },
  { id: 'phitsanulok', label: 'Остановка', name: 'Пхитсанулок', note: 'Будда Чиннарат и река Нан' },
  { id: 'chiangmai', label: 'Север', name: 'Чиангмай', note: '300 храмов, ночные рынки, Дой Интанон' },
  { id: 'chiangrai', label: 'Финиш', name: 'Чианграй', note: 'Белый храм и чайные плантации' },
] as const;
