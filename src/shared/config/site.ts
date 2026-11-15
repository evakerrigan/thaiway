/**
 * Общие данные сайта для SEO и превью ссылок.
 *
 * Адрес сайта — https://thaiway.vercel.app. Если появится свой домен, задайте
 * NEXT_PUBLIC_SITE_URL (например, https://thaiway.ru) в настройках Vercel или поменяйте значение ниже.
 * Адрес нужен, чтобы ссылки на картинку превью были полными — иначе мессенджеры её не покажут.
 */
const DEFAULT_SITE_URL = 'https://thaiway.vercel.app';

function resolveSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
}

export const SITE = {
  url: resolveSiteUrl(),
  name: 'Тайский путь',
  title: 'Тайский путь — личный путеводитель по Таиланду',
  description:
    'Личный путеводитель по Таиланду: 11 лучших мест с фото и видео, маршрут на север на машине от Бангкока до Чианграя, любимые кафе и калькулятор стоимости поездки из Москвы.',
  keywords: [
    'Таиланд',
    'путеводитель по Таиланду',
    'что посмотреть в Таиланде',
    'лучшие места Таиланда',
    'достопримечательности Таиланда',
    'путешествие по Таиланду',
    'Таиланд самостоятельно',
    'Таиланд на машине',
    'север Таиланда',
    'Бангкок',
    'Чиангмай',
    'Чианграй',
    'Краби',
    'Рейли',
    'Белый храм Ват Ронг Кхун',
    'Wat Pha Sorn Kaew',
    'Дой Интанон',
    'Ангкор Ват',
    'кафе Таиланда',
    'стоимость поездки в Таиланд',
  ],
  locale: 'ru_RU',
} as const;

/**
 * Картинка превью (src/app/opengraph-image.jpg). Её нужно явно указывать на страницах,
 * которые задают свой openGraph: иначе Next.js не наследует картинку из корня.
 */
export const OG_IMAGE = {
  url: '/opengraph-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Тайский путь — личный путеводитель по Таиланду: места, ради которых стоит лететь через полмира',
} as const;

/** openGraph для внутренней страницы: своё название/описание + общая картинка и данные сайта. */
export function pageOpenGraph(title: string, description: string, url: string) {
  return {
    type: 'website' as const,
    locale: SITE.locale,
    siteName: SITE.name,
    title,
    description,
    url,
    images: [OG_IMAGE],
  };
}
