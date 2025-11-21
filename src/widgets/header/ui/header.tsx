'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/shared/ui/container';
import { NAV_ITEMS } from '@/shared/config';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-center h-16">
          <ul className="flex gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      text-base font-medium transition-colors hover:text-blue-600
                      ${isActive ? 'text-blue-600' : 'text-gray-700'}
                    `}
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

