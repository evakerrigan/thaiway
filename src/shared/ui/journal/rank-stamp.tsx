interface RankStampProps {
  rank: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'w-10 h-10 text-lg',
  md: 'w-14 h-14 text-2xl',
  lg: 'w-16 h-16 sm:w-20 sm:h-20 text-3xl sm:text-4xl',
} as const;

/** Круглый терракотовый штамп с номером места в топе. */
export const RankStamp = ({ rank, size = 'md', className = '' }: RankStampProps) => {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-terracotta font-display font-bold text-white ${SIZES[size]} ${className}`}
      aria-label={`Место №${rank}`}
    >
      {rank}
    </span>
  );
};
