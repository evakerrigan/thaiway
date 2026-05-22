'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { THAILAND_CENTER, THAILAND_ZOOM, YANDEX_MAPS_CONFIG } from '@/shared/api';
import { Place } from '@/shared/types';

interface YandexGeoObject {
  events: {
    add(event: string, handler: () => void): void;
  };
}

interface YandexGeoObjectCollection {
  add(geoObject: YandexGeoObject): void;
  remove(geoObject: YandexGeoObject): void;
}

interface YandexMapContainer {
  fitToViewport?: () => void;
}

interface YandexMapInstance {
  destroy(): void;
  geoObjects: YandexGeoObjectCollection;
  setBounds(
    bounds: number[][],
    options?: { checkZoomRange?: boolean; zoomMargin?: number }
  ): void;
  container?: YandexMapContainer;
}

interface YandexMapsApi {
  ready(callback: () => void): void;
  Map: new (
    container: HTMLElement,
    state: { center: number[]; zoom: number; controls?: string[] }
  ) => YandexMapInstance;
  Polygon: new (
    coordinates: number[][][],
    properties?: Record<string, unknown>,
    options?: Record<string, unknown>
  ) => YandexGeoObject;
  Polyline: new (
    coordinates: number[][],
    properties?: Record<string, unknown>,
    options?: Record<string, unknown>
  ) => YandexGeoObject;
  Placemark: new (
    coordinates: number[],
    properties?: Record<string, unknown>,
    options?: Record<string, unknown>
  ) => YandexGeoObject;
}

declare global {
  interface Window {
    ymaps: YandexMapsApi;
    ymapsLoaded?: boolean;
  }
}

interface YandexMapProps {
  width?: number;
  height?: number;
  className?: string;
  places?: Place[];
  onPlaceClick?: (place: Place) => void;
  showBorders?: boolean;
  borderStyle?: {
    strokeColor: string;
    strokeOpacity: number;
    strokeWidth: number;
    fillColor: string;
    fillOpacity: number;
  };
  showRoute?: boolean;
  routeStyle?: {
    strokeColor: string;
    strokeOpacity: number;
    strokeWidth: number;
  };
  routePlaceIds?: string[];
  /** Центр карты по умолчанию. */
  center?: { lat: number; lng: number };
  /** Зум карты по умолчанию. */
  zoom?: number;
  /** Подогнать видимую область, чтобы все маркеры поместились. */
  fitToPlaces?: boolean;
}

export const YandexMap = ({
  width,
  height,
  className = '',
  places = [],
  onPlaceClick,
  showBorders = false,
  borderStyle,
  showRoute = false,
  routeStyle,
  routePlaceIds = [],
  center,
  zoom,
  fitToPlaces = false,
}: YandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<YandexMapInstance | null>(null);
  const isInitializedRef = useRef(false);
  const placemarksRef = useRef<YandexGeoObject[]>([]);
  const borderPolygonRef = useRef<YandexGeoObject | null>(null);
  const routePolylineRef = useRef<YandexGeoObject | null>(null);

  const borderStyleRef = useRef(borderStyle);
  borderStyleRef.current = borderStyle;
  const routeStyleRef = useRef(routeStyle);
  routeStyleRef.current = routeStyle;

  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const initMap = () => {
      if (window.ymaps && mapRef.current && !mapInstanceRef.current) {
        window.ymaps.ready(() => {
          if (!mapInstanceRef.current && mapRef.current) {
            const initialCenter = center ?? THAILAND_CENTER;
            const initialZoom = zoom ?? THAILAND_ZOOM;
            mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
              center: [initialCenter.lat, initialCenter.lng],
              zoom: initialZoom,
              controls: ['zoomControl', 'fullscreenControl'],
            });
            setIsMapReady(true);
          }
        });
      }
    };

    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]');
    if (existingScript) {
      if (window.ymaps) {
        initMap();
      } else {
        existingScript.addEventListener('load', initMap);
      }
    } else {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/${YANDEX_MAPS_CONFIG.version}/?apikey=${YANDEX_MAPS_CONFIG.apiKey}&lang=${YANDEX_MAPS_CONFIG.lang}`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      placemarksRef.current = [];
      borderPolygonRef.current = null;
      routePolylineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !window.ymaps) return;

    if (showBorders) {
      import('@/shared/data/thailand-borders').then(
        ({ THAILAND_BORDER_COORDINATES, BORDER_STYLE }) => {
          if (!mapInstanceRef.current) return;
          const style = borderStyleRef.current || BORDER_STYLE;
          const polygon = new window.ymaps.Polygon(
            [THAILAND_BORDER_COORDINATES],
            { hintContent: 'Таиланд' },
            {
              strokeColor: style.strokeColor,
              strokeOpacity: style.strokeOpacity,
              strokeWidth: style.strokeWidth,
              fillColor: style.fillColor,
              fillOpacity: style.fillOpacity,
            }
          );
          if (borderPolygonRef.current) {
            mapInstanceRef.current.geoObjects.remove(borderPolygonRef.current);
          }
          mapInstanceRef.current.geoObjects.add(polygon);
          borderPolygonRef.current = polygon;
        }
      );
    } else {
      if (borderPolygonRef.current && mapInstanceRef.current) {
        mapInstanceRef.current.geoObjects.remove(borderPolygonRef.current);
        borderPolygonRef.current = null;
      }
    }
  }, [showBorders, isMapReady]);

  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !window.ymaps) return;

    if (showRoute) {
      import('@/shared/data/travel-route').then(({ TRAVEL_ROUTE_COORDINATES, ROUTE_STYLE }) => {
        if (!mapInstanceRef.current) return;
        const style = routeStyleRef.current || ROUTE_STYLE;
        const polyline = new window.ymaps.Polyline(
          TRAVEL_ROUTE_COORDINATES,
          { hintContent: 'Маршрут путешествия' },
          {
            strokeColor: style.strokeColor,
            strokeOpacity: style.strokeOpacity,
            strokeWidth: style.strokeWidth,
          }
        );
        if (routePolylineRef.current) {
          mapInstanceRef.current.geoObjects.remove(routePolylineRef.current);
        }
        mapInstanceRef.current.geoObjects.add(polyline);
        routePolylineRef.current = polyline;
      });
    } else {
      if (routePolylineRef.current && mapInstanceRef.current) {
        mapInstanceRef.current.geoObjects.remove(routePolylineRef.current);
        routePolylineRef.current = null;
      }
    }
  }, [showRoute, isMapReady]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!isMapReady || !map || !window.ymaps) return;

    placemarksRef.current.forEach((placemark) => {
      map.geoObjects.remove(placemark);
    });
    placemarksRef.current = [];

    places.forEach((place) => {
      const isRoutePlaceId = routePlaceIds.includes(place.id);
      const hasRank = typeof place.rank === 'number';

      let preset = getMarkerPreset(place.category);
      let iconColor: string | undefined = getMarkerColor(place.category);
      const properties: Record<string, unknown> = {
        balloonContent: place.name,
        hintContent: place.name,
      };

      if (isRoutePlaceId) {
        preset = 'islands#circleDotIcon';
        iconColor = '#00CED1';
      } else if (hasRank) {
        preset = 'islands#violetStretchyIcon';
        iconColor = undefined;
        properties.iconContent = String(place.rank);
      }

      const options: Record<string, unknown> = { preset };
      if (iconColor !== undefined) options.iconColor = iconColor;

      const placemark = new window.ymaps.Placemark(
        [place.coordinates.lat, place.coordinates.lng],
        properties,
        options
      );

      if (onPlaceClick) {
        placemark.events.add('click', () => {
          onPlaceClick(place);
        });
      }

      map.geoObjects.add(placemark);
      placemarksRef.current.push(placemark);
    });

    if (fitToPlaces && places.length > 0) {
      const lats = places.map((p) => p.coordinates.lat);
      const lngs = places.map((p) => p.coordinates.lng);
      const bounds = [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
      ];
      map.setBounds(bounds, {
        checkZoomRange: true,
        zoomMargin: 40,
      });
    }
  }, [places, onPlaceClick, routePlaceIds, isMapReady, fitToPlaces]);

  useEffect(() => {
    if (!isMapReady || !mapRef.current || !mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const fit = () => map.container?.fitToViewport?.();

    const observer = new ResizeObserver(fit);
    observer.observe(mapRef.current);
    fit();

    return () => observer.disconnect();
  }, [isMapReady]);

  const sizeStyle: CSSProperties = {
    width: width !== undefined ? `${width}px` : '100%',
    ...(height !== undefined && { height: `${height}px` }),
  };

  return (
    <div
      ref={mapRef}
      style={sizeStyle}
      className={`h-full ${className}`.trim()}
    />
  );
};

function getMarkerPreset(category?: Place['category']): string {
  const presets: Record<NonNullable<Place['category']>, string> = {
    city: 'islands#redIcon',
    island: 'islands#blueIcon',
    beach: 'islands#lightBlueIcon',
    temple: 'islands#violetIcon',
    other: 'islands#grayIcon',
  };
  return category ? presets[category] : 'islands#redIcon';
}

function getMarkerColor(category?: Place['category']): string {
  const colors: Record<NonNullable<Place['category']>, string> = {
    city: '#FF0000',
    island: '#1E98FF',
    beach: '#56CCF2',
    temple: '#9C27B0',
    other: '#757575',
  };
  return category ? colors[category] : '#FF0000';
}
