import Image from 'next/image';
import { getPlaceCover } from '@/shared/lib';
import { Place } from '@/shared/types';

interface PlaceCoverProps {
  place: Place;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Обложка места, заполняющая родителя (родитель должен быть `relative` с заданной высотой).
 * Для мест, где есть только видео, показывает кадр из видео и значок «play».
 */
export const PlaceCover = ({ place, sizes, priority, className = '' }: PlaceCoverProps) => {
  const cover = getPlaceCover(place);

  if (!cover) {
    return <div className={`absolute inset-0 bg-jade ${className}`} />;
  }

  if (cover.type === 'image') {
    return (
      <Image
        src={cover.src}
        alt={cover.alt || place.name}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <>
      <video
        src={`${cover.src}#t=0.5`}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        muted
        playsInline
        preload="metadata"
        aria-label={cover.alt || place.name}
      />
      <span className="absolute inset-0 flex items-center justify-center bg-ink/20">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/95 text-terracotta shadow-lg">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </>
  );
};
