'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { MediaItem } from '@/shared/types';

interface MediaGalleryProps {
  items: MediaItem[];
  /** Заголовок для подписей к alt и aria-меткам. */
  title?: string;
  /**
   * grid — сетка миниатюр;
   * cover — одна крупная обложка со счётчиком «+N», галерея открывается по клику.
   */
  variant?: 'grid' | 'cover';
  className?: string;
}

export const MediaGallery = ({ items, title, variant = 'grid', className = '' }: MediaGalleryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setOpenIndex(index), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => {
    setOpenIndex((idx) => (idx === null ? null : (idx - 1 + items.length) % items.length));
  }, [items.length]);
  const showNext = useCallback(() => {
    setOpenIndex((idx) => (idx === null ? null : (idx + 1) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (openIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, showPrev, showNext]);

  if (items.length === 0) return null;

  const active = openIndex !== null ? items[openIndex] : null;
  const first = items[0];
  const rest = items.length - 1;

  return (
    <>
      {variant === 'cover' ? (
        <button
          type="button"
          onClick={() => open(0)}
          className={`group relative block w-full overflow-hidden rounded-2xl bg-surface-2 ring-1 ring-line transition-all hover:ring-brand ${className}`}
          aria-label={`Открыть галерею: ${title ?? ''}`.trim()}
        >
          <Thumb item={first} title={title} sizes="(max-width: 768px) 100vw, 320px" />
          {rest > 0 && (
            <span className="absolute bottom-3 right-3 rounded-full bg-[#06282b]/75 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
              +{rest} ещё
            </span>
          )}
        </button>
      ) : (
        <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 ${className}`}>
          {items.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              onClick={() => open(index)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-surface-2 ring-1 ring-line transition-all hover:ring-brand"
              aria-label={item.alt || title || 'Открыть в полном размере'}
            >
              <Thumb item={item} title={title} sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw" />
            </button>
          ))}
        </div>
      )}

      {active && openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={title ? `Галерея: ${title}` : 'Галерея'}
        >
          <div className="tw-fade-in absolute inset-0 bg-black/85 backdrop-blur-sm" />

          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-lg transition-colors hover:bg-white"
            aria-label="Закрыть"
          >
            <svg className="h-5 w-5 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-lg transition-colors hover:bg-white sm:left-4 sm:h-12 sm:w-12"
                aria-label="Предыдущее"
              >
                <svg className="h-5 w-5 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-lg transition-colors hover:bg-white sm:right-4 sm:h-12 sm:w-12"
                aria-label="Следующее"
              >
                <svg className="h-5 w-5 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            className="tw-slide-up relative flex max-h-[88vh] w-full max-w-6xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {active.type === 'image' ? (
              <div className="relative w-full" style={{ height: '88vh' }}>
                <Image
                  src={active.src}
                  alt={active.alt || title || ''}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <video
                key={active.src}
                src={active.src}
                poster={active.poster}
                className="max-h-[88vh] max-w-full rounded-lg shadow-2xl"
                controls
                autoPlay
                playsInline
              />
            )}

            {items.length > 1 && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium tabular-nums text-white/80">
                {openIndex + 1} / {items.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

function Thumb({ item, title, sizes }: { item: MediaItem; title?: string; sizes: string }) {
  if (item.type === 'image') {
    return (
      <span className="relative block aspect-[4/3] w-full">
        <Image
          src={item.src}
          alt={item.alt || title || ''}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </span>
    );
  }
  return (
    <span className="relative block aspect-[4/3] w-full">
      <video
        src={`${item.src}#t=0.5`}
        poster={item.poster}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="metadata"
      />
      <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-brand" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </span>
  );
}
