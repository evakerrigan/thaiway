'use client';

import { useEffect, useRef } from 'react';
import { THAILAND_CENTER, THAILAND_ZOOM, YANDEX_MAPS_CONFIG } from '@/shared/api';
import { Place } from '@/shared/types';

declare global {
  interface Window {
    ymaps: any;
    ymapsLoaded?: boolean;
  }
}

interface YandexMapProps {
  width?: number;
  height?: number;
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
}

export const YandexMap = ({ 
  width = 1000, 
  height = 1000,
  places = [],
  onPlaceClick,
  showBorders = false,
  borderStyle,
  showRoute = false,
  routeStyle,
  routePlaceIds = [],
}: YandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const isInitializedRef = useRef(false);
  const placemarksRef = useRef<any[]>([]);
  const borderPolygonRef = useRef<any>(null);
  const routePolylineRef = useRef<any>(null);

  useEffect(() => {
    // Предотвращаем повторную инициализацию в Strict Mode
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const initMap = () => {
      if (window.ymaps && mapRef.current && !mapInstanceRef.current) {
        window.ymaps.ready(() => {
          // Дополнительная проверка что карта еще не создана
          if (!mapInstanceRef.current && mapRef.current) {
            mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
              center: [THAILAND_CENTER.lat, THAILAND_CENTER.lng],
              zoom: THAILAND_ZOOM,
              controls: ['zoomControl', 'fullscreenControl'],
            });

            // Добавляем границы (если включено)
            if (showBorders) {
              addBorder();
            }

            // Добавляем маршрут (если включено)
            if (showRoute) {
              addRoute();
            }

            // Добавляем маркеры после создания карты
            addPlacemarks();
          }
        });
      }
    };

    // Функция добавления границ Таиланда
    const addBorder = () => {
      if (!mapInstanceRef.current || !window.ymaps) return;

      // Импортируем координаты динамически
      import('@/shared/data/thailand-borders').then(({ THAILAND_BORDER_COORDINATES, BORDER_STYLE }) => {
        // Используем переданный стиль или стиль по умолчанию
        const style = borderStyle || BORDER_STYLE;

        // Создаем полигон границы
        const polygon = new window.ymaps.Polygon(
          [THAILAND_BORDER_COORDINATES],
          {
            hintContent: 'Таиланд',
          },
          {
            strokeColor: style.strokeColor,
            strokeOpacity: style.strokeOpacity,
            strokeWidth: style.strokeWidth,
            fillColor: style.fillColor,
            fillOpacity: style.fillOpacity,
          }
        );

        // Удаляем старую границу если есть
        if (borderPolygonRef.current) {
          mapInstanceRef.current.geoObjects.remove(borderPolygonRef.current);
        }

        // Добавляем на карту
        mapInstanceRef.current.geoObjects.add(polygon);
        borderPolygonRef.current = polygon;
      });
    };

    // Функция добавления маршрута путешествия
    const addRoute = () => {
      if (!mapInstanceRef.current || !window.ymaps) return;

      // Импортируем координаты маршрута
      import('@/shared/data/travel-route').then(({ TRAVEL_ROUTE_COORDINATES, ROUTE_STYLE }) => {
        // Используем переданный стиль или стиль по умолчанию
        const style = routeStyle || ROUTE_STYLE;

        // Создаем линию маршрута
        const polyline = new window.ymaps.Polyline(
          TRAVEL_ROUTE_COORDINATES,
          {
            hintContent: 'Маршрут путешествия',
          },
          {
            strokeColor: style.strokeColor,
            strokeOpacity: style.strokeOpacity,
            strokeWidth: style.strokeWidth,
          }
        );

        // Удаляем старый маршрут если есть
        if (routePolylineRef.current) {
          mapInstanceRef.current.geoObjects.remove(routePolylineRef.current);
        }

        // Добавляем на карту
        mapInstanceRef.current.geoObjects.add(polyline);
        routePolylineRef.current = polyline;
      });
    };

    // Функция добавления маркеров на карту
    const addPlacemarks = () => {
      if (!mapInstanceRef.current || !window.ymaps) return;

      // Удаляем старые маркеры
      placemarksRef.current.forEach(placemark => {
        mapInstanceRef.current.geoObjects.remove(placemark);
      });
      placemarksRef.current = [];

      // Добавляем новые маркеры
      places.forEach(place => {
        // Проверяем, является ли место частью маршрута
        const isRoutePlaceId = routePlaceIds.includes(place.id);
        
        const placemark = new window.ymaps.Placemark(
          [place.coordinates.lat, place.coordinates.lng],
          {
            balloonContent: place.name,
            hintContent: place.name,
          },
          {
            preset: isRoutePlaceId ? 'islands#circleDotIcon' : getMarkerPreset(place.category),
            iconColor: isRoutePlaceId ? '#00CED1' : getMarkerColor(place.category),
          }
        );

        // Обработчик клика по маркеру
        if (onPlaceClick) {
          placemark.events.add('click', () => {
            onPlaceClick(place);
          });
        }

        mapInstanceRef.current.geoObjects.add(placemark);
        placemarksRef.current.push(placemark);
      });
    };

    // Проверяем, загружен ли уже скрипт Яндекс.Карт
    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]');
    
    if (existingScript) {
      // Скрипт уже загружен
      if (window.ymaps) {
        initMap();
      } else {
        existingScript.addEventListener('load', initMap);
      }
    } else {
      // Загружаем скрипт впервые
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/${YANDEX_MAPS_CONFIG.version}/?apikey=${YANDEX_MAPS_CONFIG.apiKey}&lang=${YANDEX_MAPS_CONFIG.lang}`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      // Очищаем карту при размонтировании
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      placemarksRef.current = [];
      borderPolygonRef.current = null;
      routePolylineRef.current = null;
    };
  }, [showBorders, showRoute]);

  // Обновляем маркеры при изменении списка мест
  useEffect(() => {
    if (mapInstanceRef.current && window.ymaps && places.length > 0) {
      // Удаляем старые маркеры
      placemarksRef.current.forEach(placemark => {
        mapInstanceRef.current.geoObjects.remove(placemark);
      });
      placemarksRef.current = [];

      // Добавляем новые маркеры
      places.forEach(place => {
        // Проверяем, является ли место частью маршрута
        const isRoutePlaceId = routePlaceIds.includes(place.id);
        
        const placemark = new window.ymaps.Placemark(
          [place.coordinates.lat, place.coordinates.lng],
          {
            balloonContent: place.name,
            hintContent: place.name,
          },
          {
            preset: isRoutePlaceId ? 'islands#circleDotIcon' : getMarkerPreset(place.category),
            iconColor: isRoutePlaceId ? '#00CED1' : getMarkerColor(place.category),
          }
        );

        // Обработчик клика по маркеру
        if (onPlaceClick) {
          placemark.events.add('click', () => {
            onPlaceClick(place);
          });
        }

        mapInstanceRef.current.geoObjects.add(placemark);
        placemarksRef.current.push(placemark);
      });
    }
  }, [places, onPlaceClick, routePlaceIds]);

  return (
    <div
      ref={mapRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="rounded-lg shadow-lg"
    />
  );
};

// Вспомогательные функции для стилизации маркеров
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

