import { Container } from '@/shared/ui/container';
import { NORTH_TRIP_STOPS, TOP_PLACES } from '@/shared/data';

const FACTS = [
  { value: String(TOP_PLACES.length), label: 'любимых мест в личном топе' },
  { value: String(NORTH_TRIP_STOPS.length), label: 'городов на пути на север на машине' },
  { value: '2 565 м', label: 'крыша королевства — Дой Интанон' },
  { value: '1 234', label: 'ступеньки до пагоды пещеры Тигра' },
];

/** Разделители ячеек: в 2 колонки на телефоне и в 4 на десктопе. */
const CELL_BORDERS = [
  'border-r border-b lg:border-b-0',
  'border-b lg:border-b-0 lg:border-r',
  'border-r',
  '',
];

export const TravelFacts = () => {
  return (
    <Container className="pb-16">
      <ul aria-label="Коротко о путешествиях" className="grid grid-cols-2 border-y border-ink lg:grid-cols-4">
        {FACTS.map((fact, index) => (
          <li key={fact.label} className={`border-dashed border-line px-4 py-5 sm:px-5 sm:py-6 ${CELL_BORDERS[index]}`}>
            <p className="m-0 font-display text-[clamp(32px,4vw,44px)] font-bold leading-none">{fact.value}</p>
            <p className="mt-2 text-[15px] text-ink-soft">{fact.label}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};
