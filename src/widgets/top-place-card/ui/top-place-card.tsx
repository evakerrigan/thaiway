'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { MediaGallery } from '@/widgets/media-gallery';
import { RankStamp } from '@/shared/ui/journal';
import { Place } from '@/shared/types';

interface TopPlaceCardProps {
  place: Place;
}

/** Страница дневника про одно место: штамп с номером, рассказ и вклеенные фото. */
export const TopPlaceCard = forwardRef<HTMLElement, TopPlaceCardProps>(({ place }, ref) => {
  return (
    <article
      ref={ref}
      id={`place-${place.id}`}
      className="scroll-mt-28 bg-white p-6 shadow-paper sm:p-10"
    >
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {typeof place.rank === 'number' && <RankStamp rank={place.rank} size="lg" />}
        <div className="min-w-0 flex-1">
          <h2 className="m-0 font-display text-3xl font-bold leading-tight sm:text-4xl">{place.name}</h2>
          {place.region && (
            <p className="mt-2 text-[13px] font-bold uppercase tracking-[0.12em] text-jade">{place.region}</p>
          )}
        </div>
        {place.googleMapsUrl && (
          <Link
            href={place.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full border-[1.5px] border-ink px-5 py-3 font-bold text-ink transition-colors hover:bg-paper-deep sm:self-auto"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            Google Maps
          </Link>
        )}
      </header>

      <p className="m-0 max-w-3xl whitespace-pre-line text-[17px] leading-relaxed text-ink-soft sm:text-lg">
        {place.fullDescription || place.description}
      </p>

      {place.media && place.media.length > 0 && (
        <div className="mt-8">
          <MediaGallery items={place.media} title={place.name} />
        </div>
      )}
    </article>
  );
});

TopPlaceCard.displayName = 'TopPlaceCard';
