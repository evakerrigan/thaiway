'use client';

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { MediaItem } from '@/shared/types';

interface MediaGalleryProps {
  items: MediaItem[];
  /** Заголовок для подписей к alt и aria-меткам. */
  title?: string;
}

/** Наклоны миниатюр — как фотографии, вклеенные в дневник. */
const TILTS = [-1.5, 1, -0.5, 1.5, -1, 0.5];

const LIGHTBOX_BUTTON =
  'absolute z-10 flex items-center justify-center rounded-full bg-paper/95 text-ink shadow-lg transition-colors hover:bg-white';

export const MediaGallery = ({ items, title }: MediaGalleryProps) => {
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'unset';
    };
  }, [openIndex, close, showPrev, showNext]);

  if (items.length === 0) return null;

  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => open(index)}
            style={{ '--tilt': `${TILTS[index % TILTS.length]}deg` } as CSSProperties}
            className="group cursor-zoom-in bg-white p-2 shadow-paper transition-[rotate,translate] duration-200 rotate-[var(--tilt)] hover:z-10 hover:-translate-y-1 hover:rotate-0"
            aria-label={item.alt || title || 'Открыть в полном размере'}
          >
            <span className="relative block aspect-square overflow-hidden bg-paper-deep">
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt || title || ''}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <>
                  <video
                    src={`${item.src}#t=0.5`}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors group-hover:bg-ink/10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper/95 text-terracotta shadow-lg transition-transform group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </>
              )}
            </span>
          </button>
        ))}
      </div>

      {active && openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="absolute inset-0 bg-ink/90 backdrop-blur-sm" />

          <button
            type="button"
            onClick={close}
            className={`${LIGHTBOX_BUTTON} top-4 right-4 h-11 w-11`}
            aria-label="Закрыть"
          >
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
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
                className={`${LIGHTBOX_BUTTON} left-2 top-1/2 h-11 w-11 -translate-y-1/2 sm:left-4 sm:h-12 sm:w-12`}
                aria-label="Предыдущее"
              >
                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className={`${LIGHTBOX_BUTTON} right-2 top-1/2 h-11 w-11 -translate-y-1/2 sm:right-4 sm:h-12 sm:w-12`}
                aria-label="Следующее"
              >
                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative flex max-h-[88vh] w-full max-w-6xl items-center justify-center"
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
                className="max-h-[88vh] max-w-full shadow-2xl"
                controls
                autoPlay
                playsInline
              />
            )}

            {items.length > 1 && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-hand text-xl text-paper/90">
                {openIndex + 1} из {items.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
