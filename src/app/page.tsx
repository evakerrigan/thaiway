'use client';

import { useState } from 'react';
import { Container } from '@/shared/ui/container';
import { YandexMap } from '@/widgets/yandex-map';
import { PlaceModal } from '@/widgets/place-modal';
import { TagCloud } from '@/widgets/tag-cloud';
import { PLACES } from '@/shared/data';
import { Place } from '@/shared/types';

const ROUTE_PLACE_IDS = [
  'bangkok',
  'phitsanulok',
  'ayutthaya',
  'lopburi',
  'nakhonsawan',
  'chiangrai',
  'chiangmai',
  'mae-ya-waterfall',
];

const INITIAL_ACTIVE_TAGS = ['thailand', 'north-trip', 'top-places'];

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>(INITIAL_ACTIVE_TAGS);

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedPlace(null);
    }, 300);
  };

  const handleTagToggle = (tagId: string) => {
    setActiveTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const showBorders = activeTags.includes('thailand');
  const showRoute = activeTags.includes('north-trip');
  const showNorthTrip = activeTags.includes('north-trip');
  const showTopPlaces = activeTags.includes('top-places');

  // Маркер видим, если активен соответствующий тег.
  // Mae-Ya принадлежит и маршруту, и топ-местам — поэтому появится при любом из них.
  const visiblePlaces = PLACES.filter((p) => {
    const isRoute = ROUTE_PLACE_IDS.includes(p.id);
    const isTop = typeof p.rank === 'number';
    if (showNorthTrip && isRoute) return true;
    if (showTopPlaces && isTop) return true;
    return false;
  });

  // Для приоритета стиля route над top-places: passing routePlaceIds только если north-trip активен.
  const activeRoutePlaceIds = showNorthTrip ? ROUTE_PLACE_IDS : [];

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Container className="py-8 shrink-0">
        <div className="flex flex-col items-center gap-6">
          <TagCloud activeTags={activeTags} onTagToggle={handleTagToggle} />
        </div>
      </Container>

      <YandexMap
        className="flex-1 min-h-[400px]"
        places={visiblePlaces}
        onPlaceClick={handlePlaceClick}
        showBorders={showBorders}
        showRoute={showRoute}
        routePlaceIds={activeRoutePlaceIds}
      />

      <PlaceModal
        place={selectedPlace}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
