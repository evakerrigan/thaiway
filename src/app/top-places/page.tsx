'use client';

import { Container } from '@/shared/ui/container';
import { Chip } from '@/shared/ui/chip';
import { BackToTop } from '@/shared/ui/back-to-top';
import { YandexMap } from '@/widgets/yandex-map';
import { TopPlaceCard } from '@/widgets/top-place-card';
import { TopPlacesToc } from '@/widgets/top-places-toc';
import { TOP_PLACES } from '@/shared/data';
import { Place } from '@/shared/types';

const sortedPlaces = [...TOP_PLACES].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));

export default function TopPlacesPage() {
  const handlePlaceClick = (place: Place) => {
    const el = document.getElementById(`place-${place.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-bg">
      <Container className="py-10 sm:py-14">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <Chip tone="gold" className="mb-4">
            Личная подборка
          </Chip>
          <h1 className="text-4xl font-bold sm:text-5xl">11 лучших мест</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-fg-2">
            Самые любимые точки на карте: от храма с мозаичными буддами на горе до слияния двух
            рек в одну великую Чао Прайя. Отсортированы от самого крутого к крутому.
          </p>
        </header>

        <section className="mb-10 overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line">
          <div className="h-[360px] sm:h-[460px]">
            <YandexMap places={sortedPlaces} onPlaceClick={handlePlaceClick} fitToPlaces />
          </div>
          <p className="border-t border-line px-4 py-3 text-center text-sm text-muted">
            Нажмите на номер на карте — страница прокрутится к описанию места.
          </p>
        </section>

        {/* Лента номеров на телефоне и планшете */}
        <div className="sticky top-14 z-30 -mx-4 mb-6 border-b border-line bg-bg/95 px-4 backdrop-blur sm:-mx-6 sm:px-6 md:top-16 lg:hidden">
          <TopPlacesToc places={sortedPlaces} variant="strip" />
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TopPlacesToc places={sortedPlaces} variant="sidebar" />
            </div>
          </aside>

          <div className="min-w-0 space-y-8">
            {sortedPlaces.map((place) => (
              <TopPlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </Container>

      <BackToTop />
    </div>
  );
}
