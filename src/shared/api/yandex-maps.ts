// Конфигурация для Яндекс Карт
export const YANDEX_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || '',
  version: '2.1',
  lang: 'ru_RU',
} as const;

// Координаты центра Таиланда
export const THAILAND_CENTER = {
  lat: 13.736717,
  lng: 100.523186,
} as const;

// Зум для отображения всего Таиланда
export const THAILAND_ZOOM = 6;

