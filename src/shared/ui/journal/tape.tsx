interface TapeProps {
  className?: string;
}

/** Полоска «скотча», которой в дневнике приклеены карточки. Чисто декоративная. */
export const Tape = ({ className = '' }: TapeProps) => {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -top-3.5 h-7 w-28 bg-tape/75 ${className}`}
    />
  );
};
