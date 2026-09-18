'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/shared/ui/container';
import { Logo } from '@/shared/ui/logo';
import { NAV_ITEMS } from '@/shared/config';
import { WeatherChip } from '@/widgets/weather-widget';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4 md:h-16">
          <Logo />

          {/* На телефоне навигация живёт в нижней панели */}
          <nav className="hidden md:block" aria-label="Основная навигация">
            <ul className="flex items-center gap-7">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative py-5 text-[15px] font-semibold transition-colors ${
                        isActive ? 'text-accent' : 'text-fg-2 hover:text-fg'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute inset-x-0 -bottom-[1px] h-0.5 rounded-full bg-brand-bright" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <WeatherChip />
        </div>
      </Container>
    </header>
  );
};
