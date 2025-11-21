export const ROUTES = {
  HOME: '/',
  PAGE_2: '/page-2',
  PAGE_3: '/page-3',
} as const;

export const NAV_ITEMS = [
  { label: 'Страница 1', href: ROUTES.HOME },
  { label: 'Страница 2', href: ROUTES.PAGE_2 },
  { label: 'Страница 3', href: ROUTES.PAGE_3 },
] as const;

