'use client';

import Link from 'next/link';
import { Modal } from '@/shared/ui/modal';
import { PlaceCover, RankStamp } from '@/shared/ui/journal';
import { ROUTES } from '@/shared/config';
import { Place } from '@/shared/types';

interface PlaceModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlaceModal = ({ place, isOpen, onClose }: PlaceModalProps) => {
  if (!place) return null;

  const hasRank = typeof place.rank === 'number';

  return (
    <Modal isOpen={isOpen} onClose={onClose} label={place.name}>
      <div className="flex flex-col">
        <div className="p-3 pb-0">
          <div className="relative h-64 w-full overflow-hidden bg-paper-deep sm:h-72">
            <PlaceCover place={place} sizes="(max-width: 768px) 100vw, 672px" priority />
          </div>
        </div>

        <div className="relative p-6 sm:p-8">
          {hasRank && <RankStamp rank={place.rank!} className="absolute -top-8 left-6 sm:left-8" />}

          <h2 className={`m-0 font-display text-3xl font-bold leading-tight ${hasRank ? 'mt-4' : ''}`}>
            {place.name}
          </h2>

          <p className="mt-2 text-[13px] font-bold uppercase tracking-[0.12em] text-jade">
            {[place.region, getCategoryLabel(place.category)].filter(Boolean).join(' · ')}
          </p>

          <p className="mt-4 whitespace-pre-line text-[17px] leading-relaxed text-ink-soft">
            {place.fullDescription || place.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-dashed border-line pt-6">
            {/* Ссылка на полную карточку: место из топа — на /top-places, кафе — на /cafes */}
            {(hasRank || place.category === 'cafe') && (
              <Link
                href={`${hasRank ? ROUTES.TOP_PLACES : ROUTES.CAFES}#place-${place.id}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-3 font-bold text-white transition-colors hover:bg-terracotta-hover"
              >
                Читать и смотреть фото
              </Link>
            )}
            {place.googleMapsUrl && (
              <Link
                href={place.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-5 py-3 font-bold text-ink transition-colors hover:bg-paper-deep"
              >
                Google Maps
                <span aria-hidden>↗</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

function getCategoryLabel(category: Place['category']): string {
  const labels: Record<NonNullable<Place['category']>, string> = {
    city: 'Город',
    island: 'Остров',
    beach: 'Пляж',
    temple: 'Храм',
    cafe: 'Кафе',
    other: 'Место',
  };
  return category ? labels[category] : 'Место';
}
