import Link from 'next/link';
import { ROUTES, SITE } from '@/shared/config';

interface LogoProps {
  className?: string;
  /** Компактный вариант для футера и мобильной шапки. */
  size?: 'md' | 'sm';
  withText?: boolean;
}

export const LogoMark = ({ className = '' }: { className?: string }) => (
  <span
    className={`inline-grid place-items-center rounded-[30%] bg-brand-bright text-[#06282b] ${className}`}
    aria-hidden
  >
    <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  </span>
);

export const Logo = ({ className = '', size = 'md', withText = true }: LogoProps) => {
  const mark = size === 'md' ? 'h-9 w-9' : 'h-7 w-7';
  const text = size === 'md' ? 'text-lg' : 'text-base';
  return (
    <Link
      href={ROUTES.HOME}
      className={`inline-flex items-center gap-2.5 font-display font-bold text-fg no-underline ${text} ${className}`}
      aria-label={`${SITE.name} — на главную`}
    >
      <LogoMark className={mark} />
      {withText && <span>{SITE.name}</span>}
    </Link>
  );
};
