export const ROUTES = {
  HOME: '/',
  CALCULATOR: '/calculator',
  TOP_PLACES: '/top-places',
  ABOUT: '/about',
} as const;

export const NAV_ITEMS = [
  { label: 'Карта', href: ROUTES.HOME },
  { label: '11 мест', href: ROUTES.TOP_PLACES },
  { label: 'Калькулятор', href: ROUTES.CALCULATOR },
] as const;

export const FOOTER_ITEMS = [...NAV_ITEMS, { label: 'О проекте', href: ROUTES.ABOUT }] as const;
