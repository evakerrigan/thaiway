'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { MediaItem } from '@/shared/types';

interface MediaGalleryProps {
  items: MediaItem[];
  /** Заголовок для подписей к alt и aria-меткам. */
  title?: string;
}

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => open(index)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200/60 hover:ring-brand transition-all"
            aria-label={item.alt || title || 'Открыть в полном размере'}
          >
            {item.type === 'image' ? (
              <Image
                src={item.src}
                alt={item.alt || title || ''}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <>
                <video
                  src={`${item.src}#t=0.5`}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-brand"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
              </>
            )}
          </button>
        ))}
      </div>

      {active && openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
            aria-label="Закрыть"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                aria-label="Предыдущее"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                aria-label="Следующее"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative max-w-6xl w-full max-h-[88vh] flex items-center justify-center"
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
                className="max-h-[88vh] max-w-full rounded-lg shadow-2xl"
                controls
                autoPlay
                playsInline
              />
            )}

            {items.length > 1 && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium">
                {openIndex + 1} / {items.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
