export const ROUTES = {
  HOME: '/',
  CALCULATOR: '/calculator',
  TOP_PLACES: '/top-places',
} as const;

/** Якоря секций главной страницы. */
export const HOME_SECTIONS = {
  MAP: 'map',
  TOP: 'top',
  NORTH_TRIP: 'north-trip',
  BUDGET: 'budget',
} as const;

export const NAV_ITEMS = [
  { label: 'Карта', href: ROUTES.HOME },
  { label: '11 лучших мест', href: ROUTES.TOP_PLACES },
  { label: 'Маршрут на север', href: `${ROUTES.HOME}#${HOME_SECTIONS.NORTH_TRIP}` },
  { label: 'Калькулятор', href: ROUTES.CALCULATOR },
] as const;
