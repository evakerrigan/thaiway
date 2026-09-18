/**
 * Публичный адрес сайта. Нужен для абсолютных ссылок в Open Graph / Twitter-превью.
 * На проде задайте NEXT_PUBLIC_SITE_URL, иначе используется адрес Vercel-деплоя.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thaiway.vercel.app';

export const SITE = {
  name: 'ThaiWay',
  title: 'ThaiWay — личный путеводитель по Таиланду',
  description:
    'Карта Таиланда, маршрут на север на машине, 11 лучших мест с фото и видео и калькулятор стоимости поездки из Москвы.',
  locale: 'ru_RU',
  host: SITE_URL.replace(/^https?:\/\//, ''),
} as const;
