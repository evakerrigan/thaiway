import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Container } from '@/shared/ui/container';
import { HandNote, Kicker, PlaceCover, RankStamp } from '@/shared/ui/journal';
import { HOME_SECTIONS, ROUTES } from '@/shared/config';
import { TOP_PLACES } from '@/shared/data';

const TOP_THREE = [...TOP_PLACES].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99)).slice(0, 3);
const TILTS = [-1, 0.8, -0.6];

/** Превью трёх лучших мест на главной. */
export const TopPreview = () => {
  return (
    <section id={HOME_SECTIONS.TOP} aria-labelledby="top-preview-title">
      <Container className="py-20 sm:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Kicker className="mb-2">Личная подборка</Kicker>
            <h2 id="top-preview-title" className="m-0 font-display text-[clamp(32px,4vw,48px)] font-bold leading-[1.1]">
              Мой топ-3 из {TOP_PLACES.length}
            </h2>
            <HandNote className="mt-2 text-2xl">от самого крутого — к просто крутому</HandNote>
          </div>
          <Link
            href={ROUTES.TOP_PLACES}
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-5 py-3.5 font-bold text-ink transition-colors hover:bg-paper-deep"
          >
            Все {TOP_PLACES.length} мест
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TOP_THREE.map((place, index) => (
            <li key={place.id}>
              <Link
                href={`${ROUTES.TOP_PLACES}#place-${place.id}`}
                style={{ '--tilt': `${TILTS[index]}deg` } as CSSProperties}
                className="block rotate-[var(--tilt)] bg-white p-3.5 pb-6 text-ink shadow-paper transition-[rotate,translate] duration-200 hover:-translate-y-1 hover:rotate-0"
              >
                <div className="relative">
                  <div className="relative h-64 overflow-hidden bg-paper-deep">
                    <PlaceCover place={place} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px" />
                  </div>
                  {typeof place.rank === 'number' && (
                    <RankStamp rank={place.rank} className="absolute -top-2.5 -right-2.5" />
                  )}
                </div>
                <h3 className="mx-1 mt-4 mb-1.5 font-display text-2xl font-bold leading-tight">{place.name}</h3>
                {place.region && (
                  <p className="mx-1 text-[13px] font-bold uppercase tracking-[0.1em] text-jade">{place.region}</p>
                )}
                <p className="mx-1 mt-2.5 text-[15px] leading-relaxed text-ink-soft">{place.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
