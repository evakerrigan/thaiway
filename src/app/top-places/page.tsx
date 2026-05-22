'use client';

import { Container } from '@/shared/ui/container';
import { YandexMap } from '@/widgets/yandex-map';
import { TopPlaceCard } from '@/widgets/top-place-card';
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
    <div className="bg-gradient-to-b from-teal-50/40 via-white to-white">
      <Container className="py-12">
        <header className="text-center max-w-3xl mx-auto mb-10">
          <p className="inline-block px-4 py-1 rounded-full bg-teal-100 text-brand text-sm font-medium mb-4">
            Личная подборка
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            11 лучших мест
          </h1>
          <p className="text-lg text-gray-600">
            Самые любимые точки на карте — от храма с мозаичными буддами на горе до
            слияния двух рек в одну великую Чао Прайя. Места отсортированы от самого
            крутого к крутому.
          </p>
        </header>

        <section className="mb-12 rounded-3xl overflow-hidden shadow-lg ring-1 ring-gray-100 bg-white">
          <div className="h-[420px] sm:h-[520px]">
            <YandexMap
              places={sortedPlaces}
              onPlaceClick={handlePlaceClick}
              fitToPlaces
            />
          </div>
          <p className="text-center text-sm text-gray-500 py-3 px-4 border-t border-gray-100">
            Нажмите на номер на карте — мы прокрутим страницу к описанию места.
          </p>
        </section>

        <div className="space-y-8">
          {sortedPlaces.map((place) => (
            <TopPlaceCard key={place.id} place={place} />
          ))}
        </div>
      </Container>
    </div>
  );
}
