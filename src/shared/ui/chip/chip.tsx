import { ReactNode } from 'react';

type ChipTone = 'brand' | 'gold' | 'neutral';

const TONES: Record<ChipTone, string> = {
  brand: 'bg-brand-soft text-accent',
  gold: 'bg-gold-soft text-gold',
  neutral: 'bg-surface-2 text-fg-2',
};

interface ChipProps {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
}

export const Chip = ({ children, tone = 'brand', className = '' }: ChipProps) => (
  <span
    className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold ${TONES[tone]} ${className}`}
  >
    {children}
  </span>
);

/** Кружок с номером в рейтинге — золотой, как маркеры топ-мест на карте. */
export const RankBadge = ({ rank, className = '' }: { rank: number; className?: string }) => (
  <span
    className={`inline-grid shrink-0 place-items-center rounded-full bg-gold font-display font-bold text-white shadow-md ${className}`}
    aria-label={`Место ${rank} в рейтинге`}
  >
    {rank}
  </span>
);
