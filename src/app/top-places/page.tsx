'use client';

import { Container } from '@/shared/ui/container';
import { HandNote, Kicker, Tape } from '@/shared/ui/journal';
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
    <>
      <Container className="flex flex-wrap items-start gap-12 py-14 sm:py-20">
        <header className="min-w-0 flex-[1_1_480px]">
          <HandNote className="mb-3 origin-left -rotate-2">личная подборка</HandNote>
          <h1 className="m-0 font-display text-[clamp(48px,8vw,104px)] font-bold leading-[0.95] tracking-[-0.02em]">
            11 лучших
            <br />
            <span className="italic text-jade">мест</span> Таиланда
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            От храма с мозаичными буддами на горе до слияния двух рек в одну великую Чао Прайя. Места
            отсортированы от самого крутого к крутому.
          </p>
        </header>

        <nav aria-label="Содержание" className="relative min-w-0 flex-[1_1_320px] bg-paper-light px-7 pt-7 pb-4 shadow-paper">
          <Tape className="left-[30%] rotate-2" />
          <Kicker className="mb-3">Оглавление</Kicker>
          <ol>
            {sortedPlaces.map((place) => (
              <li key={place.id} className="border-b border-dashed border-line last:border-b-0">
                <a href={`#place-${place.id}`} className="flex items-baseline gap-3.5 py-2.5 text-ink hover:text-terracotta">
                  <span className="w-7 shrink-0 font-display text-lg font-bold text-terracotta">{place.rank}</span>
                  <span className="flex-1 text-[15px] font-semibold">{place.name}</span>
                  {place.region && <span className="text-xs text-ink-muted">{place.region}</span>}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Container>

      <Container className="pb-14">
        <section aria-label="Карта лучших мест" className="relative bg-paper-light p-3 shadow-polaroid">
          <Tape className="left-[42%] -rotate-3" />
          <div className="h-[420px] sm:h-[520px]">
            <YandexMap places={sortedPlaces} onPlaceClick={handlePlaceClick} fitToPlaces />
          </div>
          <p className="m-0 px-2 pt-3 text-center font-hand text-2xl text-ink-soft">
            нажмите на номер на карте — прокручу к рассказу о месте
          </p>
        </section>
      </Container>

      <Container className="flex flex-col gap-10 pb-24">
        {sortedPlaces.map((place) => (
          <TopPlaceCard key={place.id} place={place} />
        ))}
      </Container>
    </>
  );
}
