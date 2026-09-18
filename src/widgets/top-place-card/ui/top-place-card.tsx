'use client';

import { forwardRef, useState } from 'react';
import { MediaGallery } from '@/widgets/media-gallery';
import { Chip, RankBadge } from '@/shared/ui/chip';
import { ROUTES } from '@/shared/config';
import { getCategoryLabel, getDirectionsUrl, getMediaSummary } from '@/shared/lib';
import { Place } from '@/shared/types';

interface TopPlaceCardProps {
  place: Place;
}

export const TopPlaceCard = forwardRef<HTMLElement, TopPlaceCardProps>(({ place }, ref) => {
  const [copied, setCopied] = useState(false);
  const anchor = `place-${place.id}`;
  const mediaSummary = getMediaSummary(place);

  const copyLink = async () => {
    try {
      const url = `${window.location.origin}${ROUTES.TOP_PLACES}#${anchor}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Буфер обмена недоступен — оставляем якорь в адресной строке
      window.location.hash = anchor;
    }
  };

  return (
    <article
      ref={ref}
      id={anchor}
      className="scroll-mt-28 overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line md:scroll-mt-24"
    >
      <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-[280px_1fr] md:gap-8 md:p-8">
        <div className="md:sticky md:top-24 md:self-start">
          {place.media && place.media.length > 0 ? (
            <MediaGallery items={place.media} title={place.name} variant="cover" />
          ) : (
            <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-bright font-display text-5xl font-bold text-white/80">
              {place.rank}
            </div>
          )}
        </div>

        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <RankBadge rank={place.rank ?? 0} className="h-9 w-9 text-base" />
            {place.province && <Chip>{place.province}</Chip>}
            {place.category && <Chip tone="neutral">{getCategoryLabel(place.category)}</Chip>}
            {mediaSummary && <Chip tone="neutral">{mediaSummary}</Chip>}
          </div>

          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{place.name}</h2>

          <p className="whitespace-pre-line text-base leading-relaxed text-fg-2 sm:text-[17px]">
            {place.fullDescription || place.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <a
              href={getDirectionsUrl(place)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
              Маршрут
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-bold text-fg-2 transition-colors hover:border-brand hover:text-accent"
              aria-live="polite"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7L12 19" />
              </svg>
              {copied ? 'Ссылка скопирована' : 'Поделиться'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
});

TopPlaceCard.displayName = 'TopPlaceCard';
