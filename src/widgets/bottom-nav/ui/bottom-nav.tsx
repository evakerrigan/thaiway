'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, ROUTES } from '@/shared/config';

const ICONS: Record<string, React.ReactNode> = {
  [ROUTES.HOME]: (
    <path d="M9 20l-5.5-2.5V4L9 6.5 15 4l5.5 2.5V20L15 17.5 9 20zm0-13.5v11M15 4v13.5" />
  ),
  [ROUTES.TOP_PLACES]: (
    <path d="M12 2l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 16.8 6.1 20l1.3-6.5L2.5 8.9l6.6-.8L12 2z" />
  ),
  [ROUTES.CALCULATOR]: (
    <path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 4h8v3H8V7zm0 6h2v2H8v-2zm3 0h2v2h-2v-2zm3 0h2v5h-2v-5zm-6 3h2v2H8v-2zm3 0h2v2h-2v-2z" />
  ),
};

/** Нижняя навигация для телефонов. На md+ скрыта — там ссылки в шапке. */
export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Разделы"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <ul className="flex h-16 items-stretch justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                  isActive ? 'text-accent' : 'text-muted'
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {ICONS[item.href]}
                </svg>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
