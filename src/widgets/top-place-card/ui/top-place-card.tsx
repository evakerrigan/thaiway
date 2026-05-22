'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { MediaGallery } from '@/widgets/media-gallery';
import { Place } from '@/shared/types';

interface TopPlaceCardProps {
  place: Place;
}

export const TopPlaceCard = forwardRef<HTMLElement, TopPlaceCardProps>(
  ({ place }, ref) => {
    return (
      <article
        ref={ref}
        id={`place-${place.id}`}
        className="scroll-mt-24 bg-white rounded-3xl shadow-sm ring-1 ring-gray-100 overflow-hidden"
      >
        <div className="p-6 sm:p-8 md:p-10">
          <header className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-brand text-white font-bold text-2xl flex items-center justify-center shadow-md">
              {place.rank}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {place.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}
              </p>
            </div>
            {place.googleMapsUrl && (
              <Link
                href={place.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-brand font-medium hover:bg-teal-100 transition-colors self-start sm:self-auto"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
                <span>Google Maps</span>
              </Link>
            )}
          </header>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {place.fullDescription || place.description}
          </p>

          {place.media && place.media.length > 0 && (
            <div className="mt-6">
              <MediaGallery items={place.media} title={place.name} />
            </div>
          )}
        </div>
      </article>
    );
  }
);

TopPlaceCard.displayName = 'TopPlaceCard';
