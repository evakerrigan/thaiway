import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { Container } from '@/shared/ui/container';
import { HandNote, Kicker } from '@/shared/ui/journal';
import { UPCOMING_PLACES } from '@/shared/data';
import { ROUTES } from '@/shared/config';
import { pageOpenGraph } from '@/shared/config/site';

const description =
  'Места Таиланда, о которых скоро расскажу: ботанический сад в Паттайе, музей роботов, Аюттхая, чайные поля Чианграя, парки Люмпини и Бенджакити в Бангкоке.';

export const metadata: Metadata = {
  title: 'Места Таиланда',
  description,
  alternates: { canonical: ROUTES.PLACES },
  openGraph: pageOpenGraph('Места Таиланда', description, ROUTES.PLACES),
};

/** Наклоны карточек — как вклеенные в дневник. */
const TILTS = [-1, 0.8, -0.6, 1, -0.8, 0.5];

export default function PlacesPage() {
  return (
    <>
      <Container className="py-14 sm:py-20">
        <header className="max-w-2xl">
          <HandNote className="mb-3 origin-left -rotate-2">куда ещё сходить</HandNote>
          <h1 className="m-0 font-display text-[clamp(48px,8vw,96px)] font-bold leading-[0.95] tracking-[-0.02em]">
            <span className="italic text-jade">Места</span>
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-ink-soft">
            Парки, музеи, сады и города, про которые скоро расскажу подробно — с фото и советами.
          </p>
        </header>
      </Container>

      <Container className="pb-24">
        <Kicker className="mb-8">Скоро на сайте</Kicker>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {UPCOMING_PLACES.map((place, index) => (
            <li
              key={place.id}
              id={`place-${place.id}`}
              style={{ '--tilt': `${TILTS[index % TILTS.length]}deg` } as CSSProperties}
              className="place-card scroll-mt-28 rotate-[var(--tilt)] bg-white p-3.5 pb-6 shadow-paper"
            >
              {/* Фото пока нет — залитый квадрат */}
              <div aria-hidden className="relative aspect-[4/3] bg-jade">
                <span className="absolute right-3 bottom-2 font-hand text-2xl text-paper/90">скоро</span>
              </div>
              <h2 className="mx-1 mt-4 mb-1.5 font-display text-2xl font-bold leading-tight">{place.name}</h2>
              <p className="mx-1 text-[13px] font-bold uppercase tracking-[0.1em] text-jade">{place.region}</p>
              <p className="mx-1 mt-3 font-hand text-[22px] text-terracotta">скоро расскажу</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
