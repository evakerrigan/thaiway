'use client';

import Image from 'next/image';
import { useState } from 'react';
import { COMING_SOON_LAYERS, MAP_LAYERS, type LayerId, type MapLayer } from '@/shared/data';
import { getCategoryLabel, getPlaceCover } from '@/shared/lib';
import { Place } from '@/shared/types';

interface MapPanelProps {
  activeLayers: LayerId[];
  onLayerToggle: (id: LayerId) => void;
  /** Места, которые сейчас видны на карте, в порядке показа в списке. */
  places: Place[];
  /** Сколько точек в каждом слое — для счётчиков. */
  counts: Partial<Record<LayerId, number>>;
  selectedPlaceId: string | null;
  onPlaceSelect: (place: Place) => void;
  /** sidebar — с заголовком и описанием; sheet — компактно, для шторки на телефоне. */
  variant?: 'sidebar' | 'sheet';
}

export const MapPanel = ({
  activeLayers,
  onLayerToggle,
  places,
  counts,
  selectedPlaceId,
  onPlaceSelect,
  variant = 'sidebar',
}: MapPanelProps) => {
  const [soonOpen, setSoonOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-5">
      {variant === 'sidebar' && (
        <div className="space-y-2">
          <h1 className="text-2xl font-bold leading-tight">Куда поехать в Таиланде</h1>
          <p className="text-sm text-fg-2">
            Личная карта: маршрут на север на машине и одиннадцать мест, ради которых стоит
            ехать. Нажимайте на маркеры или на места в списке.
          </p>
        </div>
      )}

      <section aria-labelledby="layers-title" className="space-y-2">
        <h2 id="layers-title" className="font-sans text-xs font-bold uppercase tracking-wider text-muted">
          Слои карты
        </h2>
        <ul className="space-y-1.5">
          {MAP_LAYERS.map((layer) => (
            <li key={layer.id}>
              <LayerSwitch
                layer={layer}
                checked={activeLayers.includes(layer.id)}
                count={counts[layer.id]}
                onToggle={() => onLayerToggle(layer.id)}
              />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="places-title" className="space-y-2">
        <div className="flex items-baseline justify-between">
          <h2 id="places-title" className="font-sans text-xs font-bold uppercase tracking-wider text-muted">
            На карте
          </h2>
          <span className="text-xs text-muted">{places.length}</span>
        </div>
        {places.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line p-4 text-sm text-muted">
            Включите хотя бы один слой, чтобы увидеть места.
          </p>
        ) : (
          <ul className="space-y-0.5">
            {places.map((place) => (
              <li key={place.id}>
                <PlaceRow
                  place={place}
                  selected={place.id === selectedPlaceId}
                  onSelect={() => onPlaceSelect(place)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border-t border-line pt-4">
        <button
          type="button"
          onClick={() => setSoonOpen((v) => !v)}
          aria-expanded={soonOpen}
          className="flex w-full items-center justify-between text-left text-sm font-semibold text-muted transition-colors hover:text-fg-2"
        >
          Скоро появится
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 transition-transform ${soonOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {soonOpen && (
          <p className="mt-2 text-sm text-muted">{COMING_SOON_LAYERS.join(' · ')}</p>
        )}
      </section>
    </div>
  );
};

function LayerSwitch({
  layer,
  checked,
  count,
  onToggle,
}: {
  layer: MapLayer;
  checked: boolean;
  count?: number;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
        checked ? 'border-line bg-surface' : 'border-transparent bg-surface-2/60 hover:bg-surface-2'
      }`}
    >
      <LayerKey layer={layer} muted={!checked} />
      <span className="min-w-0 flex-1">
        <span className={`block text-sm font-semibold ${checked ? 'text-fg' : 'text-fg-2'}`}>
          {layer.label}
          {typeof count === 'number' && (
            <span className="ml-1.5 text-xs font-medium text-muted">{count}</span>
          )}
        </span>
        <span className="block truncate text-xs text-muted">{layer.hint}</span>
      </span>
      <span
        aria-hidden
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-brand' : 'bg-line'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </span>
    </button>
  );
}

/** Условное обозначение слоя — повторяет форму и цвет маркера на карте. */
export function LayerKey({ layer, muted = false }: { layer: MapLayer; muted?: boolean }) {
  const color = muted ? 'var(--muted)' : layer.color;
  if (layer.marker === 'number') {
    return (
      <span
        aria-hidden
        className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
        style={{ backgroundColor: color }}
      >
        1
      </span>
    );
  }
  if (layer.marker === 'outline') {
    return (
      <span
        aria-hidden
        className="h-5 w-5 shrink-0 rounded-[40%_60%_55%_45%/50%_40%_60%_50%] border-2"
        style={{ borderColor: color }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className="grid h-5 w-5 shrink-0 place-items-center"
    >
      <span className="h-3 w-3 rounded-full border-2 border-white shadow" style={{ backgroundColor: color }} />
    </span>
  );
}

function PlaceRow({
  place,
  selected,
  onSelect,
}: {
  place: Place;
  selected: boolean;
  onSelect: () => void;
}) {
  const cover = getPlaceCover(place);
  const hasRank = typeof place.rank === 'number';

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors ${
        selected ? 'bg-brand-soft' : 'hover:bg-surface-2'
      }`}
    >
      {hasRank ? (
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-[11px] font-bold text-white">
          {place.rank}
        </span>
      ) : (
        <span className="grid h-6 w-6 shrink-0 place-items-center">
          <span className="h-3 w-3 rounded-full border-2 border-white bg-brand shadow" />
        </span>
      )}
      {cover?.type === 'image' ? (
        <span className="relative h-9 w-12 shrink-0 overflow-hidden rounded-md bg-surface-2">
          <Image src={cover.src} alt="" fill sizes="48px" className="object-cover" />
        </span>
      ) : (
        <span className="grid h-9 w-12 shrink-0 place-items-center rounded-md bg-surface-2 text-xs font-bold text-muted">
          {cover?.type === 'video' ? '▶' : place.name.charAt(0)}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className={`block truncate text-sm font-semibold ${selected ? 'text-accent' : 'text-fg'}`}>
          {place.name}
        </span>
        <span className="block truncate text-xs text-muted">
          {place.province ?? (hasRank ? getCategoryLabel(place.category) : 'Точка маршрута')}
        </span>
      </span>
    </button>
  );
}
