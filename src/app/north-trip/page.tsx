'use client';

import { useCallback, useState } from 'react';
import { Container } from '@/shared/ui/container';
import { HandNote, Tape } from '@/shared/ui/journal';
import { YandexMap } from '@/widgets/yandex-map';
import { PlaceModal } from '@/widgets/place-modal';
import { NorthTrip } from '@/widgets/north-trip';
import { NORTH_TRIP_PLACE_IDS, PLACES } from '@/shared/data';
import { NORTH_TRIP_MAP_ANCHOR as MAP_SECTION_ID } from '@/shared/config';
import { Place } from '@/shared/types';

const ROUTE_PLACES = PLACES.filter((p) => NORTH_TRIP_PLACE_IDS.includes(p.id));

export default function NorthTripPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlaceClick = useCallback((place: Place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPlace(null), 300);
  }, []);

  const scrollToMap = () => {
    document.getElementById(MAP_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Container className="py-14 sm:py-20">
        <header className="max-w-2xl">
          <HandNote className="mb-3 origin-left -rotate-2">дорога на север</HandNote>
          <h1 className="m-0 font-display text-[clamp(44px,7vw,88px)] font-bold leading-[0.98] tracking-[-0.02em]">
            Маршрут <span className="italic text-jade">на север</span>
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-ink-soft">
            На машине из Бангкока до Чианграя: древние столицы, горы и самые красивые храмы севера.
          </p>
        </header>
      </Container>

      <Container className="pb-6">
        <section
          id={MAP_SECTION_ID}
          aria-label="Карта маршрута на север"
          className="relative w-full scroll-mt-28 bg-paper-light p-3 shadow-polaroid"
        >
          <Tape className="left-[42%] -rotate-3" />
          <div className="aspect-[2/1] max-h-[560px] min-h-[360px] w-full">
            <YandexMap
              places={ROUTE_PLACES}
              onPlaceClick={handlePlaceClick}
              showBorders
              showRoute
              routePlaceIds={NORTH_TRIP_PLACE_IDS}
              fitToPlaces
            />
          </div>
          <p className="m-0 px-2 pt-3 text-center font-hand text-2xl text-ink-soft">
            нажмите на город на карте — расскажу о нём
          </p>
        </section>
      </Container>

      {/* Тот же блок, что на главной */}
      <NorthTrip onShowOnMap={scrollToMap} />

      {/* Здесь будет рассказ о поездке — текст допишу позже */}

      <PlaceModal place={selectedPlace} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
