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
  {
    id: 'vana-tara',
    name: 'Vana Tara Cafe & Glamping',
    region: 'По дороге Чиангмай — Чианграй',
    category: 'cafe',
    coordinates: { lat: 19.0151023, lng: 99.3002822 },
    googleMapsUrl: 'https://maps.app.goo.gl/H5bsR2piRFoeZ5aVA',
    description: 'Кафе и глэмпинг на горной реке по дороге из Чиангмая в Чианграй.',
    media: [
      // Обложкой станет фото (берётся первое изображение), видео идут в галерее первыми.
      { type: 'video', src: '/cafes/vana-tara-1.mp4', alt: 'Vana Tara — видео 1' },
      { type: 'video', src: '/cafes/vana-tara-2.mp4', alt: 'Vana Tara — видео 2' },
      { type: 'image', src: '/cafes/vana-tara-river.jpg', alt: 'Горная река с камнями у кафе Vana Tara' },
    ],
  },
  {
    id: 'baan-langsuan',
    name: 'Baan Langsuan',
    region: 'Бангкок',
    category: 'cafe',
    coordinates: { lat: 13.7418412, lng: 100.5435946 },
    googleMapsUrl: 'https://maps.app.goo.gl/tMFXW7PdXtwYNSJa8',
    description: 'Очень милое, уютное и необычное кафе возле метро.',
    media: [
      { type: 'image', src: '/cafes/baan-langsuan.jpg', alt: 'Стена из картин в резных рамах и ваза с цветком лотоса в кафе Baan Langsuan' },
    ],
  },
  {
    id: 'road-garden-cafe',
    name: 'Кафе в саду с гамаками',
    region: 'По дороге из Бангкока',
    category: 'cafe',
    // Точное место неизвестно — без координат кафе не показывается на карте.
    // TODO: когда найдётся — добавить coordinates и googleMapsUrl, поправить название.
    description: 'Кафе в саду по дороге из Бангкока — со столиками на корягах и гамаками.',
    media: [
      { type: 'image', src: '/cafes/road-cafe-welcome.jpg', alt: 'Фигурка девочки с табличкой «добро пожаловать» среди зелени' },
      { type: 'image', src: '/cafes/road-cafe-table.jpg', alt: 'Стеклянный столик на коряге с цветами в саду кафе' },
      { type: 'image', src: '/cafes/road-cafe-hammock.jpg', alt: 'Ребёнок отдыхает в гамаке в саду кафе' },
    ],
  },
];
