'use client';

import { useCallback } from 'react';
import { Tape } from '@/shared/ui/journal';
import { YandexMap } from '@/widgets/yandex-map';
import { Place } from '@/shared/types';

interface CafesMapProps {
  cafes: Place[];
}

/** Все метки кафе одного «кофейного» цвета, без номеров из топа. */
const CAFE_MARKER = { preset: 'islands#dotIcon', iconColor: '#8A5A12' };

/**
 * Карта кафе: граница Таиланда и метки кафе.
 * Клик по метке прокручивает страницу к карточке кафе (id `place-<id>` из TopPlaceCard).
 */
export const CafesMap = ({ cafes }: CafesMapProps) => {
  const handlePlaceClick = useCallback((place: Place) => {
    document.getElementById(`place-${place.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section aria-label="Карта кафе" className="relative w-full bg-paper-light p-3 shadow-polaroid">
      <Tape className="left-[42%] -rotate-3" />
      <div className="aspect-[2/1] max-h-[480px] min-h-[320px] w-full">
        <YandexMap
          places={cafes}
          onPlaceClick={handlePlaceClick}
          showBorders
          markerStyle={CAFE_MARKER}
          fitToPlaces
        />
      </div>
      <p className="m-0 px-2 pt-3 text-center font-hand text-2xl text-ink-soft">
        нажмите на метку — прокручу к кафе, или приблизьте карту
      </p>
    </section>
  );
};
