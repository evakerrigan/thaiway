'use client';

import { useEffect, useState } from 'react';
import { Place } from '@/shared/types';

interface TopPlacesTocProps {
  places: Place[];
  /** sidebar — вертикальный список; strip — горизонтальная лента номеров для телефона. */
  variant: 'sidebar' | 'strip';
}

/** Следит, какая карточка сейчас в зоне чтения, и подсвечивает её в оглавлении. */
function useActivePlace(ids: string[]) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(`place-${id}`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id.replace('place-', '');
          if (entry.isIntersecting) visible.set(id, entry.boundingClientRect.top);
          else visible.delete(id);
        });
        if (visible.size > 0) {
          // Активна самая верхняя из видимых карточек
          const top = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0];
          setActive(top);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.1, 0.5] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export const TopPlacesToc = ({ places, variant }: TopPlacesTocProps) => {
  const ids = places.map((p) => p.id);
  const active = useActivePlace(ids);

  if (variant === 'strip') {
    return (
      <nav
        aria-label="Быстрый переход к месту"
        className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6"
      >
        <ol className="flex w-max gap-1.5 py-2">
          {places.map((place) => {
            const isActive = place.id === active;
            return (
              <li key={place.id}>
                <a
                  href={`#place-${place.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  title={place.name}
                  className={`grid h-9 min-w-9 place-items-center rounded-full px-2 text-sm font-bold transition-colors ${
                    isActive ? 'bg-gold text-white' : 'bg-surface text-fg-2 ring-1 ring-line'
                  }`}
                >
                  {place.rank}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-label="Оглавление" className="space-y-1">
      <p className="px-2 pb-1 text-xs font-bold uppercase tracking-wider text-muted">Оглавление</p>
      <ol className="space-y-0.5">
        {places.map((place) => {
          const isActive = place.id === active;
          return (
            <li key={place.id}>
              <a
                href={`#place-${place.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                  isActive ? 'bg-brand-soft font-bold text-accent' : 'text-fg-2 hover:bg-surface-2 hover:text-fg'
                }`}
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-gold text-white' : 'bg-surface-2 text-muted'
                  }`}
                >
                  {place.rank}
                </span>
                <span className="truncate">{place.name}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
