'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Modal } from '@/shared/ui/modal';
import { Place } from '@/shared/types';

interface PlaceModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlaceModal = ({ place, isOpen, onClose }: PlaceModalProps) => {
  if (!place) return null;

  const cover = pickCover(place);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <div className="relative w-full h-64 bg-gray-200">
          {cover?.type === 'image' && (
            <Image
              src={cover.src}
              alt={place.name}
              fill
              className="object-cover rounded-t-2xl"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          )}
          {cover?.type === 'video' && (
            <video
              src={cover.src}
              className="w-full h-64 object-cover rounded-t-2xl"
              controls
              muted
              playsInline
              autoPlay
              loop
            />
          )}
          {!cover && (
            <div className="w-full h-64 bg-gradient-to-br from-brand to-teal-300 rounded-t-2xl" />
          )}

          {typeof place.rank === 'number' && (
            <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/95 text-brand font-bold text-xl flex items-center justify-center shadow-lg">
              {place.rank}
            </div>
          )}
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{place.name}</h2>

          {place.category && (
            <span className="inline-block px-3 py-1 text-sm font-medium text-brand bg-teal-50 rounded-full mb-4">
              {getCategoryLabel(place.category)}
            </span>
          )}

          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {place.fullDescription || place.description}
          </p>

          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Координаты: {place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}
            </p>

            {place.googleMapsUrl && (
              <Link
                href={place.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-hover"
              >
                Открыть в Google Maps
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

function pickCover(place: Place) {
  if (place.media && place.media.length > 0) {
    const firstImage = place.media.find((m) => m.type === 'image');
    if (firstImage) return firstImage;
    return place.media[0];
  }
  if (place.image) {
    return { type: 'image' as const, src: place.image };
  }
  return null;
}

function getCategoryLabel(category: Place['category']): string {
  const labels: Record<NonNullable<Place['category']>, string> = {
    city: 'Город',
    island: 'Остров',
    beach: 'Пляж',
    temple: 'Храм',
    other: 'Место',
  };
  return category ? labels[category] : 'Место';
}
