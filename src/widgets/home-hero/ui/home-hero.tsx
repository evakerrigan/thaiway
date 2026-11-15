import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/shared/ui/container';
import { HandNote, Polaroid } from '@/shared/ui/journal';
import { HOME_SECTIONS, ROUTES } from '@/shared/config';

export const HomeHero = () => {
  return (
    <Container className="flex flex-wrap items-center gap-12 py-14 sm:py-20">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
        <HandNote className="origin-left -rotate-2">привет! это мой Таиланд</HandNote>
        <h1 className="m-0 font-display text-[clamp(40px,6vw,72px)] font-bold leading-[1.02] tracking-[-0.01em]">
          Места, ради которых <span className="italic text-jade">стоит</span> лететь через полмира
        </h1>
        <p className="m-0 max-w-[520px] text-lg leading-relaxed text-ink-soft">
          Личный путеводитель: храмы в мозаике, водопады, кафе с видом и дорога на север на машине.
          Всё, что я проверила сама, — на одной карте.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`#${HOME_SECTIONS.MAP}`}
            className="inline-flex items-center gap-2.5 rounded-full bg-terracotta px-6 py-4 font-bold text-white transition-colors hover:bg-terracotta-hover"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
              <path d="M9 4v14M15 6v14" />
            </svg>
            Открыть карту
          </Link>
          <Link
            href={ROUTES.TOP_PLACES}
            className="inline-flex items-center rounded-full border-[1.5px] border-ink px-6 py-4 font-bold text-ink transition-colors hover:bg-paper-deep"
          >
            11 лучших мест
          </Link>
        </div>
      </div>

      <div className="relative h-[440px] min-w-0 flex-[1_1_440px] sm:h-[540px]">
        <Polaroid tilt={-5} caption="Sorn Kaew — №1!" className="absolute top-10 left-[2%] w-[54%]">
          <div className="relative h-[250px] sm:h-[330px]">
            <Image
              src="/top-places/Sorn-Kaew4.jpg"
              alt="Храм Wat Pha Sorn Kaew с садом и прудом"
              fill
              priority
              sizes="(max-width: 768px) 55vw, 320px"
              className="object-cover"
            />
          </div>
        </Polaroid>
        <Polaroid tilt={4} caption="Рейли, Краби" className="absolute top-0 right-0 w-[46%]">
          <div className="relative h-[150px] sm:h-[220px]">
            <Image
              src="/top-places/railay-beach.jpg"
              alt="Пляж под скалами на Рейли"
              fill
              sizes="(max-width: 768px) 45vw, 280px"
              className="object-cover"
            />
          </div>
        </Polaroid>
        <Polaroid tilt={-2} caption="Белый храм" className="absolute right-[6%] bottom-0 w-[44%]">
          <div className="relative h-[120px] sm:h-[180px]">
            <Image
              src="/top-places/rong-khun2.jpg"
              alt="Белый храм Ват Ронг Кхун"
              fill
              sizes="(max-width: 768px) 45vw, 260px"
              className="object-cover"
            />
          </div>
        </Polaroid>
        <div
          aria-hidden
          className="absolute bottom-8 left-0 flex h-[104px] w-[104px] -rotate-12 flex-col items-center justify-center rounded-full border-2 border-jade bg-paper/90 text-center text-jade sm:h-[116px] sm:w-[116px]"
        >
          <span className="text-[10px] font-bold tracking-[0.14em] sm:text-[11px]">ПРОВЕРЕНО</span>
          <span className="font-display text-[26px] font-bold leading-tight sm:text-3xl">лично</span>
          <span className="text-[10px] font-bold tracking-[0.14em] sm:text-[11px]">ทางไทย</span>
        </div>
      </div>
    </Container>
  );
};
