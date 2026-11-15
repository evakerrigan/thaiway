import Link from 'next/link';
import { Container } from '@/shared/ui/container';
import { HOME_SECTIONS, NORTH_TRIP_MAP_ANCHOR, ROUTES } from '@/shared/config';
import { NORTH_TRIP_STOPS } from '@/shared/data';

interface NorthTripProps {
  /**
   * Что делает «Показать на карте». Если задано — вызывается (на /north-trip прокручивает к карте).
   * Если нет — кнопка ведёт на страницу /north-trip прямо к карте (так на главной).
   */
  onShowOnMap?: () => void;
}

const SHOW_ON_MAP_CLASS =
  'inline-flex cursor-pointer items-center gap-2 rounded-full bg-terracotta px-5 py-3.5 font-bold text-white transition-colors hover:bg-terracotta-hover';

/** Лента остановок маршрута «Путешествие на север на машине». */
export const NorthTrip = ({ onShowOnMap }: NorthTripProps) => {
  return (
    <section id={HOME_SECTIONS.NORTH_TRIP} aria-labelledby="north-trip-title">
      <Container className="pt-6 pb-24">
        <div className="relative border-[1.5px] border-ink p-6 pt-10 sm:p-12">
          <p className="absolute -top-5 left-6 m-0 bg-paper px-3 font-hand text-[28px] text-terracotta sm:left-8">
            дорога на север
          </p>
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="north-trip-title" className="m-0 mb-2 font-display text-[clamp(28px,3.4vw,40px)] font-bold leading-tight">
                Путешествие на машине: Бангкок — Чианграй
              </h2>
              <p className="m-0 text-base text-ink-soft">Древние столицы, горы и самые красивые храмы севера.</p>
            </div>
            {onShowOnMap ? (
              <button type="button" onClick={onShowOnMap} className={SHOW_ON_MAP_CLASS}>
                Показать на карте
              </button>
            ) : (
              <Link href={`${ROUTES.NORTH_TRIP}#${NORTH_TRIP_MAP_ANCHOR}`} className={SHOW_ON_MAP_CLASS}>
                Показать на карте
              </Link>
            )}
          </div>
          <ol className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {NORTH_TRIP_STOPS.map((stop) => (
              <li key={stop.id} className="relative flex flex-col gap-1.5 border-t-[2.5px] border-dashed border-terracotta pt-5">
                <span aria-hidden className="absolute -top-[9px] left-0 h-3.5 w-3.5 rounded-full border-[2.5px] border-terracotta bg-paper" />
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-jade">{stop.label}</span>
                <span className="font-display text-[22px] font-bold">{stop.name}</span>
                <span className="text-sm leading-normal text-ink-soft">{stop.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
};
