import { ReactNode } from 'react';

interface PolaroidProps {
  children: ReactNode;
  /** Подпись «от руки» внизу карточки. */
  caption?: ReactNode;
  /** Наклон в градусах. */
  tilt?: number;
  className?: string;
}

/** Фото в белой рамке полароида с рукописной подписью. */
export const Polaroid = ({ children, caption, tilt = 0, className = '' }: PolaroidProps) => {
  // `relative` нужен подписи, но если снаружи передали absolute/fixed/sticky —
  // не добавляем его: в Tailwind 4 `relative` идёт в CSS позже и перебил бы `absolute`.
  const position = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className) ? '' : 'relative';

  return (
    <figure
      className={`${position} m-0 bg-white p-3 shadow-polaroid ${caption ? 'pb-12' : ''} ${className}`}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      {children}
      {caption && (
        <figcaption className="absolute left-4 bottom-2 font-hand text-2xl text-ink">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
