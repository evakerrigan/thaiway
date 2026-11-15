'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/shared/ui/container';
import { HandNote, Kicker, Tape } from '@/shared/ui/journal';
import { HOME_SECTIONS, ROUTES } from '@/shared/config';
import { YandexMap } from '@/widgets/yandex-map';
import { PlaceModal } from '@/widgets/place-modal';
import { TagCloud } from '@/widgets/tag-cloud';
import { HomeHero } from '@/widgets/home-hero';
import { TravelFacts } from '@/widgets/travel-facts';
import { TopPreview } from '@/widgets/top-preview';
import { NorthTrip } from '@/widgets/north-trip';
import { Calculator } from '@/widgets/calculator';
import { NORTH_TRIP_PLACE_IDS as ROUTE_PLACE_IDS, PLACES } from '@/shared/data';
import { Place } from '@/shared/types';

const INITIAL_ACTIVE_TAGS = ['thailand', 'north-trip', 'top-places'];

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>(INITIAL_ACTIVE_TAGS);

  const handlePlaceClick = useCallback((place: Place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedPlace(null);
    }, 300);
  }, []);

  const handleTagToggle = (tagId: string) => {
    setActiveTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const showBorders = activeTags.includes('thailand');
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
    <>
      <HomeHero />
      <TravelFacts />

      <section id={HOME_SECTIONS.MAP} aria-labelledby="map-title" className="bg-paper-deep py-20">
        <Container className="flex flex-wrap items-center gap-12">
          <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
            <Kicker>Карта</Kicker>
            <h2 id="map-title" className="m-0 font-display text-[clamp(32px,4vw,48px)] font-bold leading-[1.1]">
              Карта моих путешествий
            </h2>
            <p className="m-0 text-[17px] leading-relaxed text-ink-soft">
              Включайте слои, как страницы дневника: границы страны, дорогу на север или только лучшие
              места. Нажмите на точку — откроется рассказ с фото.
            </p>
            <TagCloud activeTags={activeTags} onTagToggle={handleTagToggle} />
            <ul className="mt-2 flex flex-col gap-2.5 text-[15px] text-ink-soft">
              <li className="flex items-center gap-2.5">
                <span aria-hidden className="h-[22px] w-[22px] rounded-full bg-jade" />
                место из моего топа
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden className="w-[22px] border-t-[2.5px] border-dashed border-terracotta" />
                дорога на север на машине
              </li>
            </ul>
          </div>

          <div className="relative min-w-0 flex-[1_1_520px] bg-paper-light p-3 shadow-polaroid">
            <Tape className="left-[40%] -rotate-3" />
            <div className="h-[440px] sm:h-[560px]">
              <YandexMap
                places={visiblePlaces}
                onPlaceClick={handlePlaceClick}
                showBorders={showBorders}
                showRoute={showNorthTrip}
                routePlaceIds={activeRoutePlaceIds}
              />
            </div>
          </div>
        </Container>
      </section>

      <TopPreview />
      {/* «Показать на карте» ведёт на страницу /north-trip к карте маршрута */}
      <NorthTrip />

      <section id={HOME_SECTIONS.BUDGET} aria-labelledby="budget-title" className="bg-jade py-20 text-paper">
        <Container className="flex flex-wrap items-center gap-12">
          <div className="min-w-0 flex-[1_1_340px]">
            <HandNote className="mb-2 text-tape">прикинуть бюджет</HandNote>
            <h2 id="budget-title" className="m-0 mb-4 font-display text-[clamp(32px,4vw,48px)] font-bold leading-[1.1]">
              Сколько стоит поездка из Москвы?
            </h2>
            <p className="m-0 mb-6 text-[17px] leading-relaxed text-jade-soft">
              Перелёт, жильё и еда — быстрый расчёт по моему опыту.
            </p>
            <Link href={ROUTES.CALCULATOR} className="inline-block py-2 font-bold text-paper underline underline-offset-4 hover:text-tape">
              Открыть калькулятор отдельно
            </Link>
          </div>
          <Calculator className="min-w-0 flex-[1_1_440px]" initialAdults={2} initialDays={14} />
        </Container>
      </section>

      <PlaceModal place={selectedPlace} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
