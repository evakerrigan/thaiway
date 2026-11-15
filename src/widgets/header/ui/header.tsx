'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/shared/ui/container';
import { NAV_ITEMS, ROUTES } from '@/shared/config';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-dashed border-line bg-paper/95 backdrop-blur-sm">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3 sm:py-4">
        <Link href={ROUTES.HOME} className="flex items-center gap-3 text-ink no-underline">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-terracotta"
            aria-hidden
          >
            <path d="M18 3v5M14 12c0-3 2-4 4-4s4 1 4 4M11 20c0-4 3-8 7-8s7 4 7 8M8 33h20M10 33V20h16v13M15 33v-6h6v6" />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl font-bold italic sm:text-[26px]">Тайский путь</span>
            <span className="mt-1 text-xs tracking-[0.08em] text-ink-muted">ทางไทย · личный путеводитель</span>
          </span>
        </Link>

        <nav aria-label="Основное меню" className="-mx-2 max-w-full overflow-x-auto">
          <ul className="flex gap-1 whitespace-nowrap px-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`inline-block rounded-full px-4 py-3 text-[15px] font-semibold transition-colors ${
                      isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-paper-deep'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
