export const ROUTES = {
  HOME: '/',
  CALCULATOR: '/calculator',
  TOP_PLACES: '/top-places',
} as const;

export const NAV_ITEMS = [
  { label: 'Главная', href: ROUTES.HOME },
  { label: 'Калькулятор', href: ROUTES.CALCULATOR },
  { label: '11 лучших мест', href: ROUTES.TOP_PLACES },
] as const;

