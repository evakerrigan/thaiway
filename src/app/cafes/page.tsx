import type { Metadata } from 'next';
import { Container } from '@/shared/ui/container';
import { HandNote, Tape } from '@/shared/ui/journal';
import { TopPlaceCard } from '@/widgets/top-place-card';
import { CafesMap } from '@/widgets/cafes-map';
import { getPlacesByCategory } from '@/shared/data';
import { ROUTES } from '@/shared/config';
import { pageOpenGraph } from '@/shared/config/site';

const description =
  'Любимые кафе Таиланда из личных поездок: кафе Lalitta в Чианграе, котокафе в Бангкоке и другие места, где хочется сделать паузу.';

export const metadata: Metadata = {
  title: 'Кафе Таиланда',
  description,
  alternates: { canonical: ROUTES.CAFES },
  openGraph: pageOpenGraph('Кафе Таиланда', description, ROUTES.CAFES),
};

// Все места с category: 'cafe' попадают сюда автоматически.
const CAFES = getPlacesByCategory('cafe');

export default function CafesPage() {
  return (
    <>
      <Container className="py-14 sm:py-20">
        <header className="max-w-2xl">
          <HandNote className="mb-3 origin-left -rotate-2">где выпить кофе</HandNote>
          <h1 className="m-0 font-display text-[clamp(48px,8vw,96px)] font-bold leading-[0.95] tracking-[-0.02em]">
            Мои <span className="italic text-jade">кафе</span>
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-ink-soft">
            Места, где хочется сделать паузу в дороге: с видом, атмосферой и вкусным кофе.
          </p>
        </header>
      </Container>

      <Container className="pb-14">
        <CafesMap cafes={CAFES} />
      </Container>

      <Container className="flex flex-col gap-10 pb-24">
        {CAFES.map((place) => (
          <TopPlaceCard key={place.id} place={place} />
        ))}

        <aside className="relative border-[1.5px] border-dashed border-[#9C8E7B] bg-paper-light px-6 py-10 text-center sm:px-10">
          <Tape className="left-[44%] rotate-2" />
          <p className="m-0 font-hand text-[30px] leading-tight text-terracotta">скоро здесь будет больше</p>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Собираю любимые кафе из поездок — добавлю их сюда и на карту.
          </p>
        </aside>
      </Container>
    </>
  );
}
