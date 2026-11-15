export const ROUTES = {
  HOME: '/',
  CALCULATOR: '/calculator',
  TOP_PLACES: '/top-places',
  CAFES: '/cafes',
  PLACES: '/places',
  NORTH_TRIP: '/north-trip',
} as const;

/** Якоря секций главной страницы. */
export const HOME_SECTIONS = {
  MAP: 'map',
  TOP: 'top',
  NORTH_TRIP: 'north-trip',
  BUDGET: 'budget',
} as const;

/** Якорь карты на странице /north-trip — туда ведёт «Показать на карте» с главной. */
export const NORTH_TRIP_MAP_ANCHOR = 'north-trip-map';

export const NAV_ITEMS = [
  { label: 'Карта', href: ROUTES.HOME },
  { label: '11 лучших мест', href: ROUTES.TOP_PLACES },
  { label: 'Места', href: ROUTES.PLACES },
  { label: 'Маршрут на север', href: ROUTES.NORTH_TRIP },
  { label: 'Кафе', href: ROUTES.CAFES },
  { label: 'Калькулятор', href: ROUTES.CALCULATOR },
] as const;
