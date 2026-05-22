import { Place } from '@/shared/types';

/**
 * 11 лучших мест Таиланда (личная подборка).
 * Порядок важен — `rank` соответствует месту в списке (1 = самое крутое).
 */
export const TOP_PLACES: Place[] = [
  {
    id: 'wat-pha-sorn-kaew',
    rank: 1,
    name: 'Храм Wat Pha Sorn Kaew',
    coordinates: { lat: 16.790141, lng: 101.0509634 },
    category: 'temple',
    googleMapsUrl: 'https://maps.app.goo.gl/iLPWupoV1VGP6eUG9',
    image: '/top-places/Sorn-Kaew1.jpg',
    description:
      'Храм Пяти Будд на горе в провинции Пхетчабун. Многоуровневый комплекс, украшенный миллионами кусочков мозаики, керамики и зеркал.',
    fullDescription:
      'Wat Pha Sorn Kaew — храм Пяти Будд, расположенный на горе в провинции Пхетчабун. Многоуровневый храмовый комплекс облицован миллионами кусочков мозаики, керамики и зеркал — каждая поверхность словно сияет. Виды отсюда на холмы и облака — захватывающие. Это место по-настоящему завораживает, и поэтому оно у меня на первом месте.',
    media: [
      { type: 'image', src: '/top-places/Sorn-Kaew1.jpg', alt: 'Wat Pha Sorn Kaew 1' },
      { type: 'image', src: '/top-places/Sorn-Kaew2.jpg', alt: 'Wat Pha Sorn Kaew 2' },
      { type: 'image', src: '/top-places/Sorn-Kaew3.jpg', alt: 'Wat Pha Sorn Kaew 3' },
      { type: 'image', src: '/top-places/Sorn-Kaew4.jpg', alt: 'Wat Pha Sorn Kaew 4' },
      { type: 'image', src: '/top-places/Sorn-Kaew5.jpg', alt: 'Wat Pha Sorn Kaew 5' },
      { type: 'image', src: '/top-places/Sorn-Kaew6.jpg', alt: 'Wat Pha Sorn Kaew 6' },
      { type: 'image', src: '/top-places/Sorn-Kaew7.jpg', alt: 'Wat Pha Sorn Kaew 7' },
      { type: 'image', src: '/top-places/Sorn-Kaew8.jpg', alt: 'Wat Pha Sorn Kaew 8' },
      { type: 'image', src: '/top-places/Sorn-Kaew9.jpg', alt: 'Wat Pha Sorn Kaew 9' },
      { type: 'image', src: '/top-places/Sorn-Kaew10.jpg', alt: 'Wat Pha Sorn Kaew 10' },
    ],
  },
  {
    id: 'mae-ya-waterfall',
    rank: 2,
    name: 'Водопад Mae Ya',
    coordinates: { lat: 18.443903, lng: 98.611788 },
    category: 'other',
    googleMapsUrl: 'https://maps.app.goo.gl/vwhAV9T4t3YorUv8A',
    description:
      'Один из самых высоких и красивых водопадов Таиланда (~280 м) в национальном парке Дой Интанон.',
    fullDescription:
      'Водопад Mae Ya — один из самых высоких и красивых водопадов Таиланда. Вода падает каскадами с высоты более 280 метров через множество уровней — выглядит как огромная природная лестница. Особенно впечатляет в сезон дождей.',
    media: [
      { type: 'video', src: '/top-places/Mae-Ya.mp4', alt: 'Видео водопада Mae Ya' },
    ],
  },
  {
    id: 'doi-inthanon',
    rank: 3,
    name: 'Дой Интанон',
    coordinates: { lat: 18.58849, lng: 98.487061 },
    category: 'other',
    googleMapsUrl: 'https://maps.app.goo.gl/qNNN5dUa6NQae53L7',
    image: '/top-places/doi-inthanon.jpg',
    description:
      'Самая высокая точка Таиланда (2 565 м) — «крыша королевства» с облаками, чеди и горными тропами.',
    fullDescription:
      'Дой Интанон — самая высокая точка Таиланда (2 565 м), её называют «крышей королевства». Здесь можно встретить рассвет среди облаков, заглянуть в королевские чеди и пройтись по тропе Анг Ка — мшистому лесу с орхидеями и редкими птицами.',
    media: [
      { type: 'image', src: '/top-places/doi-inthanon.jpg', alt: 'Дой Интанон' },
    ],
  },
  {
    id: 'lalitta-cafe',
    rank: 4,
    name: 'Кафе Lalitta',
    coordinates: { lat: 19.9424463, lng: 99.8115731 },
    category: 'other',
    googleMapsUrl: 'https://maps.app.goo.gl/s1BekjmPzRWHzjd36',
    image: '/top-places/lalitta1.jpg',
    description: 'Атмосферное кафе в северном Таиланде с уникальным интерьером и видами.',
    fullDescription:
      'Lalitta — атмосферное кафе в северном Таиланде. Уникальный интерьер, красивые виды, вкусный кофе и тайская кухня — идеальное место, чтобы сделать паузу в путешествии.',
    media: [
      { type: 'image', src: '/top-places/lalitta1.jpg', alt: 'Кафе Lalitta — фото 1' },
      { type: 'video', src: '/top-places/lalitta1.mp4', alt: 'Кафе Lalitta — видео 1' },
      { type: 'image', src: '/top-places/lalitta2.jpg', alt: 'Кафе Lalitta — фото 2' },
      { type: 'video', src: '/top-places/lalitta2.mp4', alt: 'Кафе Lalitta — видео 2' },
    ],
  },
  {
    id: 'wat-rong-khun',
    rank: 5,
    name: 'Белый храм Ват Ронг Кхун',
    coordinates: { lat: 19.823469, lng: 99.762666 },
    category: 'temple',
    googleMapsUrl: 'https://maps.app.goo.gl/NZVidKWNfih57m2s9',
    image: '/top-places/rong-khun1.jpg',
    description:
      'Один из самых необычных храмов мира — сказочно-белый комплекс с зеркальной мозаикой работы Чалермчая Коситпипата.',
    fullDescription:
      'Ват Ронг Кхун — один из самых необычных храмов мира, созданный художником Чалермчаем Коситпипатом. Сказочно-белый комплекс с зеркальной мозаикой, символическими скульптурами и яркой современной интерпретацией буддизма — здесь хочется ходить и рассматривать каждую деталь.',
    media: [
      { type: 'image', src: '/top-places/rong-khun1.jpg', alt: 'Ват Ронг Кхун 1' },
      { type: 'image', src: '/top-places/rong-khun2.jpg', alt: 'Ват Ронг Кхун 2' },
      { type: 'image', src: '/top-places/rong-khun3.jpg', alt: 'Ват Ронг Кхун 3' },
    ],
  },
  {
    id: 'tiger-cave-temple',
    rank: 6,
    name: 'Закат на Пагоде пещеры Тигра',
    coordinates: { lat: 8.128054, lng: 98.922938 },
    category: 'temple',
    googleMapsUrl: 'https://maps.app.goo.gl/5DzS7jiruumVUowF6',
    image: '/top-places/Cave-Temple1.jpg',
    description:
      'Смотровая площадка с пагодой на вершине горы в провинции Краби. 1234 крутых ступеньки с обезьянками вокруг.',
    fullDescription:
      'Viewpoint at Tiger Cave Temple — закат с пагоды на вершине горы в провинции Краби. 1234 крутых ступеньки наверх, с обезьянками вокруг. Прийти надо заранее — успеть подняться до заката и насладиться видом, который открывается со смотровой.',
    media: [
      { type: 'image', src: '/top-places/Cave-Temple1.jpg', alt: 'Tiger Cave Temple 1' },
      { type: 'image', src: '/top-places/Cave-Temple2.jpg', alt: 'Tiger Cave Temple 2' },
    ],
  },
  {
    id: 'railay-princess-lagoon',
    rank: 7,
    name: 'Остров Рейли и Лагуна Принцессы',
    coordinates: { lat: 8.004857, lng: 98.842463 },
    category: 'beach',
    googleMapsUrl: 'https://maps.app.goo.gl/wtB5ZSAwhxWMSsWP6',
    image: '/top-places/raily1.jpg',
    description:
      'Полуостров Рейли с нависающими над пляжем скалами и труднодоступной Лагуной Принцессы.',
    fullDescription:
      'Остров Рейли с его нависающими над пляжем скалами и труднодоступной Лагуной Принцессы — рай для любителей приключений. Именно лагуна, а не пещера: пещера Принцессы там тоже есть, но её — гугли сам. Маршрут к лагуне требует немного скалолазной решимости, зато виды награждают сполна.',
    media: [
      { type: 'image', src: '/top-places/raily1.jpg', alt: 'Рейли 1' },
      { type: 'image', src: '/top-places/raily2.jpg', alt: 'Рейли 2' },
      { type: 'image', src: '/top-places/raily3.jpg', alt: 'Рейли 3' },
      { type: 'image', src: '/top-places/raily4.jpg', alt: 'Рейли 4' },
      { type: 'image', src: '/top-places/raily5.jpg', alt: 'Рейли 5' },
      { type: 'image', src: '/top-places/raily6.jpg', alt: 'Рейли 6' },
      { type: 'image', src: '/top-places/raily7.jpg', alt: 'Рейли 7' },
    ],
  },
  {
    id: 'similan-islands',
    rank: 8,
    name: 'Заповедник Симиланы',
    coordinates: { lat: 8.668039, lng: 97.648393 },
    category: 'island',
    googleMapsUrl: 'https://maps.app.goo.gl/kS6rvkTPywCHyrsbA',
    image: '/top-places/similan1.jpg',
    description:
      'Идеально чистая вода, снорклинг, дайвинг, черепахи и рыбки. В идеале — с ночёвкой.',
    fullDescription:
      'Заповедник Симиланы. В идеале — с ночёвкой, но, кажется, сейчас ночёвки на островах запретили. Идеально чистая вода, снорклинг, дайвинг, черепахи, рыбки. Фото сняты на старенькую мыльницу лет 15 назад — но красота этого места не стареет.',
    media: [
      { type: 'image', src: '/top-places/similan1.jpg', alt: 'Симиланы 1' },
      { type: 'image', src: '/top-places/similan2.jpg', alt: 'Симиланы 2' },
      { type: 'image', src: '/top-places/similan3.jpg', alt: 'Симиланы 3' },
      { type: 'image', src: '/top-places/similan4.jpg', alt: 'Симиланы 4' },
      { type: 'image', src: '/top-places/similan5.jpg', alt: 'Симиланы 5' },
      { type: 'image', src: '/top-places/similan6.jpg', alt: 'Симиланы 6' },
    ],
  },
  {
    id: 'bangkok-skyscrapers',
    rank: 9,
    name: 'Небоскрёбы Бангкока',
    coordinates: { lat: 13.7236, lng: 100.5277 },
    category: 'city',
    description:
      'В Бангкоке 190 небоскрёбов. Крыши, рестораны на высоте, торговые центры — всё это за год не обойти.',
    fullDescription:
      'В Бангкоке 190 небоскрёбов. Обязательно посетите крышу какого-нибудь из них — закат над городом сверху это отдельное переживание. Прекрасные торговые центры, необычные рестораны на высоте, парящие бассейны. Всё это за год не обойти.',
    media: [
      { type: 'video', src: '/top-places/skyscraper1.mp4', alt: 'Небоскрёб Бангкока 1' },
      { type: 'video', src: '/top-places/skyscraper2.mp4', alt: 'Небоскрёб Бангкока 2' },
      { type: 'video', src: '/top-places/skyscraper3.mp4', alt: 'Небоскрёб Бангкока 3' },
      { type: 'video', src: '/top-places/skyscraper4.mp4', alt: 'Небоскрёб Бангкока 4' },
      { type: 'video', src: '/top-places/skyscraper5.mp4', alt: 'Небоскрёб Бангкока 5' },
      { type: 'video', src: '/top-places/skyscraper7.mp4', alt: 'Небоскрёб Бангкока 7' },
      { type: 'video', src: '/top-places/skyscraper8.mp4', alt: 'Небоскрёб Бангкока 8' },
    ],
  },
  {
    id: 'angkor-wat',
    rank: 10,
    name: 'Ангкор Ват (Камбоджа)',
    coordinates: { lat: 13.413746, lng: 103.866548 },
    category: 'temple',
    googleMapsUrl: 'https://maps.app.goo.gl/ZXWVJvhrL8EsFdtW9',
    image: '/top-places/angkor-wat1.jpg',
    description:
      'Огромная сеть старинных храмов в Камбодже. Лететь из Бангкока около часа, билеты дешёвые.',
    fullDescription:
      'Из Бангкока — слетать на самолёте в Ангкор Ват в Камбодже. Больше в Камбодже делать нечего, но Ангкор Ват увидеть обязан каждый. Лететь около часа, билеты дешёвые. Лучше на 3 дня — чтобы приезжать из отеля в Ангкор Ват перед рассветом. Это особое место. И он огромный — там целая сеть из старинных храмов.',
    media: [
      { type: 'image', src: '/top-places/angkor-wat1.jpg', alt: 'Ангкор Ват 1' },
      { type: 'image', src: '/top-places/angkor-wat2.jpg', alt: 'Ангкор Ват 2' },
      { type: 'image', src: '/top-places/angkor-wat3.jpg', alt: 'Ангкор Ват 3' },
      { type: 'image', src: '/top-places/angkor-wat4.jpg', alt: 'Ангкор Ват 4' },
      { type: 'image', src: '/top-places/angkor-wat5.jpg', alt: 'Ангкор Ват 5' },
    ],
  },
  {
    id: 'pasaan',
    rank: 11,
    name: 'Pasaan — исток реки Чао Прайя',
    coordinates: { lat: 15.701678, lng: 100.142588 },
    category: 'other',
    googleMapsUrl: 'https://maps.app.goo.gl/vEA16kDLPHVxB6gF9',
    image: '/top-places/pasaan1.jpg',
    description:
      'Слияние двух рек — Пинг и Нан сходятся, образуя великую Чао Прайя. Особое место с особой энергетикой.',
    fullDescription:
      'Pasaan, The Origin of the Chao Phraya River — здание-смотровая в точке слияния рек Пинг и Нан, образующих великую реку Чао Прайя, важнейшую водную артерию страны. Здание построено очень интересно архитектурно. Кому-то этот объект покажется простым и небольшим — но это особые ощущения: гулять внутри него, рядом и сверху. И стоять на самом его краю, когда внизу под ногами две огромные реки сливаются воедино. Особая энергетика. Я вернусь туда ещё.',
    media: [
      { type: 'image', src: '/top-places/pasaan1.jpg', alt: 'Pasaan 1' },
      { type: 'image', src: '/top-places/pasaan2.jpg', alt: 'Pasaan 2' },
      { type: 'image', src: '/top-places/pasaan3.jpg', alt: 'Pasaan 3' },
      { type: 'image', src: '/top-places/pasaan4.jpg', alt: 'Pasaan 4' },
      { type: 'image', src: '/top-places/pasaan5.jpg', alt: 'Pasaan 5' },
    ],
  },
];

/**
 * Идентификаторы всех топ-мест (для удобной фильтрации на карте).
 */
export const TOP_PLACE_IDS = TOP_PLACES.map((p) => p.id);
