'use client';

import { useEffect, useRef } from 'react';
import { THAILAND_CENTER, THAILAND_ZOOM, YANDEX_MAPS_CONFIG } from '@/shared/api';

declare global {
  interface Window {
    ymaps: any;
    ymapsLoaded?: boolean;
  }
}

interface YandexMapProps {
  width?: number;
  height?: number;
}

export const YandexMap = ({ width = 1000, height = 1000 }: YandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const isInitializedRef = useRef(false);

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
          }
        });
      }
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
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="rounded-lg shadow-lg"
    />
  );
};

