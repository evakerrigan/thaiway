export const ROUTES = {
  HOME: '/',
  PAGE_2: '/page-2',
  PAGE_3: '/page-3',
} as const;

export const NAV_ITEMS = [
  { label: 'Главная', href: ROUTES.HOME },
  { label: 'Калькулятор', href: ROUTES.PAGE_2 },
  { label: 'Топ 11 мест', href: ROUTES.PAGE_3 },
] as const;

