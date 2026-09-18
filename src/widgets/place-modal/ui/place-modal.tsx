'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Modal } from '@/shared/ui/modal';
import { Chip, RankBadge } from '@/shared/ui/chip';
import { ROUTES } from '@/shared/config';
import { getCategoryLabel, getDirectionsUrl, getMediaSummary, getPlaceCover } from '@/shared/lib';
import { Place } from '@/shared/types';

interface PlaceModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
  /** Листание соседних мест. Если не передано — стрелок нет. */
  onPrev?: () => void;
  onNext?: () => void;
  /** Позиция в списке для подписи «3 из 19». */
  position?: { index: number; total: number };
}

export const PlaceModal = ({
  place,
  isOpen,
  onClose,
  onPrev,
  onNext,
  position,
}: PlaceModalProps) => {
  if (!place) return null;

  const cover = getPlaceCover(place);
  const hasRank = typeof place.rank === 'number';
  const mediaSummary = getMediaSummary(place);
  const subtitle = [place.province, getCategoryLabel(place.category)].filter(Boolean).join(' · ');

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="panel" label={place.name}>
      <div className="flex flex-col">
        {/* Обложка с заголовком поверх */}
        <div className="relative h-56 w-full bg-surface-2 sm:h-64">
          {cover?.type === 'image' && (
            <Image
              src={cover.src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 440px"
              priority
            />
          )}
          {cover?.type === 'video' && (
            <video
              src={cover.src}
              className="h-full w-full object-cover"
              muted
              playsInline
              autoPlay
              loop
              preload="metadata"
            />
          )}
          {!cover && (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-brand to-brand-bright font-display text-6xl font-bold text-white/80">
              {place.name.charAt(0)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06282b]/90 via-[#06282b]/25 to-transparent" />

          {hasRank && <RankBadge rank={place.rank!} className="absolute left-4 top-4 h-10 w-10 text-lg" />}

          <div className="absolute inset-x-5 bottom-4 text-white">
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-[26px]">{place.name}</h2>
            {subtitle && <p className="mt-1 text-sm text-white/80">{subtitle}</p>}
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="flex flex-wrap gap-1.5">
            {hasRank && <Chip tone="gold">№{place.rank} в подборке</Chip>}
            {!hasRank && <Chip tone="neutral">Точка маршрута на север</Chip>}
            {place.category && <Chip>{getCategoryLabel(place.category)}</Chip>}
            {mediaSummary && <Chip tone="neutral">{mediaSummary}</Chip>}
          </div>

          <p className="text-[15px] leading-relaxed text-fg-2">{place.description}</p>

          <div className="flex flex-wrap items-center gap-2 border-t border-line pt-5">
            {hasRank && (
              <Link
                href={`${ROUTES.TOP_PLACES}#place-${place.id}`}
                className="inline-flex h-10 items-center rounded-full bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
              >
                Читать в подборке
              </Link>
            )}
            <a
              href={getDirectionsUrl(place)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-sm font-bold text-accent transition-colors hover:border-brand"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
              Маршрут
            </a>

            {(onPrev || onNext) && (
              <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-muted">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={!onPrev}
                  aria-label="Предыдущее место"
                  className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-surface-2 hover:text-fg disabled:opacity-40"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7" /></svg>
                </button>
                {position && (
                  <span className="tabular-nums">
                    {position.index + 1} / {position.total}
                  </span>
                )}
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!onNext}
                  aria-label="Следующее место"
                  className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-surface-2 hover:text-fg disabled:opacity-40"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
