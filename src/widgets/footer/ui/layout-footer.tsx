'use client';

import { usePathname } from 'next/navigation';
import { ROUTES } from '@/shared/config';
import { Footer } from './footer';

export const LayoutFooter = () => {
  const pathname = usePathname();

  if (pathname === ROUTES.HOME) {
    return null;
  }

  return <Footer />;
};
