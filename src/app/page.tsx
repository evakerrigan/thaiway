'use client';

import { useCallback, useMemo, useState } from 'react';
import { YandexMap, type MapFocus } from '@/widgets/yandex-map';
import { PlaceModal } from '@/widgets/place-modal';
import { MapPanel, LayerKey } from '@/widgets/map-panel';
import { Modal } from '@/shared/ui/modal';
import {
  DEFAULT_ACTIVE_LAYERS,
  MAP_LAYERS,
  PLACES,
  ROUTE_PLACE_IDS,
  type LayerId,
} from '@/shared/data';
import { Place } from '@/shared/types';

export default function Home() {
  const [activeLayers, setActiveLayers] = useState<LayerId[]>(DEFAULT_ACTIVE_LAYERS);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [focus, setFocus] = useState<MapFocus | null>(null);

  const showBorders = activeLayers.includes('thailand');
  const showRoute = activeLayers.includes('north-trip');
  const showTop = activeLayers.includes('top-places');

  /**
   * Места на карте: сначала топ-11 по рангу, затем точки маршрута в порядке движения.
   * Mae Ya входит и в маршрут, и в топ — показывается один раз.
   */
  const visiblePlaces = useMemo(() => {
    const top = showTop
      ? PLACES.filter((p) => typeof p.rank === 'number').sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
      : [];
    const route = showRoute
      ? ROUTE_PLACE_IDS.map((id) => PLACES.find((p) => p.id === id))
          .filter((p): p is Place => Boolean(p))
          .filter((p) => !top.some((t) => t.id === p.id))
      : [];
    return [...top, ...route];
  }, [showTop, showRoute]);

  const counts = useMemo(
    () => ({
      'north-trip': ROUTE_PLACE_IDS.length,
      'top-places': PLACES.filter((p) => typeof p.rank === 'number').length,
    }),
    []
  );

  const selectedIndex = selectedPlace
    ? visiblePlaces.findIndex((p) => p.id === selectedPlace.id)
    : -1;

  const openPlace = useCallback((place: Place, moveMap = false) => {
    setSelectedPlace(place);
    setIsCardOpen(true);
    setIsListOpen(false);
    if (moveMap) {
      setFocus({ lat: place.coordinates.lat, lng: place.coordinates.lng, zoom: 9 });
    }
  }, []);

  const handleMarkerClick = useCallback((place: Place) => openPlace(place, false), [openPlace]);
  const handleListSelect = useCallback((place: Place) => openPlace(place, true), [openPlace]);

  const closeCard = useCallback(() => setIsCardOpen(false), []);
  const closeList = useCallback(() => setIsListOpen(false), []);

  const goTo = (offset: number) => {
    if (selectedIndex < 0 || visiblePlaces.length === 0) return;
    const next = visiblePlaces[(selectedIndex + offset + visiblePlaces.length) % visiblePlaces.length];
    openPlace(next, true);
  };

  const toggleLayer = (id: LayerId) =>
    setActiveLayers((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]));

  const panelProps = {
    activeLayers,
    onLayerToggle: toggleLayer,
    places: visiblePlaces,
    counts,
    selectedPlaceId: isCardOpen && selectedPlace ? selectedPlace.id : null,
    onPlaceSelect: handleListSelect,
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col pb-16 md:pb-0 lg:h-[calc(100dvh-4rem)] lg:flex-row">
      {/* Боковая панель на десктопе */}
      <aside className="hidden w-[340px] shrink-0 overflow-y-auto border-r border-line bg-surface lg:block xl:w-[380px]">
        <MapPanel {...panelProps} variant="sidebar" />
      </aside>

      <div className="relative flex min-h-[70vh] flex-1 flex-col lg:min-h-0">
        {/* Компактная панель слоёв на телефонах и планшетах */}
        <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2 lg:hidden">
          <div className="no-scrollbar flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
            {MAP_LAYERS.map((layer) => {
              const on = activeLayers.includes(layer.id);
              return (
                <button
                  key={layer.id}
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => toggleLayer(layer.id)}
                  className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border pl-1.5 pr-3 text-sm font-semibold transition-colors ${
                    on ? 'border-brand bg-brand-soft text-accent' : 'border-line bg-surface text-muted'
                  }`}
                >
                  <LayerKey layer={layer} muted={!on} />
                  {layer.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setIsListOpen(true)}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-brand px-3 text-sm font-bold text-white"
          >
            Список
            <span className="rounded-full bg-white/20 px-1.5 text-xs tabular-nums">{visiblePlaces.length}</span>
          </button>
        </div>

        <YandexMap
          className="min-h-[420px] flex-1"
          places={visiblePlaces}
          onPlaceClick={handleMarkerClick}
          showBorders={showBorders}
          showRoute={showRoute}
          routePlaceIds={showRoute ? ROUTE_PLACE_IDS : []}
          selectedPlaceId={isCardOpen && selectedPlace ? selectedPlace.id : null}
          focus={focus}
        />

        {/* Легенда */}
        <div className="pointer-events-none absolute bottom-3 left-3 z-10 hidden flex-col gap-1 rounded-xl bg-surface/95 px-3 py-2 text-xs font-semibold text-fg-2 shadow-card ring-1 ring-line md:flex">
          {MAP_LAYERS.filter((l) => activeLayers.includes(l.id) && l.id !== 'thailand').map((layer) => (
            <span key={layer.id} className="flex items-center gap-2">
              <LayerKey layer={layer} />
              {layer.id === 'north-trip' ? 'Точка маршрута' : 'Место из топ-11'}
            </span>
          ))}
        </div>
      </div>

      {/* Список мест на телефоне — шторкой */}
      <Modal isOpen={isListOpen} onClose={closeList} variant="sheet" label="Слои и места">
        <MapPanel {...panelProps} variant="sheet" />
      </Modal>

      <PlaceModal
        place={selectedPlace}
        isOpen={isCardOpen}
        onClose={closeCard}
        onPrev={visiblePlaces.length > 1 ? () => goTo(-1) : undefined}
        onNext={visiblePlaces.length > 1 ? () => goTo(1) : undefined}
        position={selectedIndex >= 0 ? { index: selectedIndex, total: visiblePlaces.length } : undefined}
      />
    </div>
  );
}
