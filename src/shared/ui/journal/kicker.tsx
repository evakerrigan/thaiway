import { ReactNode } from 'react';

interface KickerProps {
  children: ReactNode;
  className?: string;
}

/** Маленькая надпись капителью над заголовком секции. */
export const Kicker = ({ children, className = '' }: KickerProps) => {
  return (
    <p className={`m-0 text-[13px] font-bold uppercase tracking-[0.16em] text-jade ${className}`}>
      {children}
    </p>
  );
};

/** Рукописная приписка. */
export const HandNote = ({ children, className = '' }: KickerProps) => {
  return <p className={`m-0 font-hand text-[28px] leading-tight text-terracotta ${className}`}>{children}</p>;
};
