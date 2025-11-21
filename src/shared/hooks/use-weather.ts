'use client';

import { useEffect, useState } from 'react';
import { WeatherData } from '@/shared/api';

/**
 * Хук для получения данных о погоде
 */
export function useWeather(lat: number, lon: number) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      try {
        setLoading(true);
        setError(null);

        // Импортируем функцию динамически
        const { fetchWeatherByCoords } = await import('@/shared/api/weather');
        const data = await fetchWeatherByCoords(lat, lon);

        if (isMounted) {
          if (data) {
            setWeather(data);
          } else {
            setError('Не удалось загрузить данные о погоде');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Ошибка при загрузке погоды');
          console.error('Weather loading error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    // Обновляем каждые 30 минут
    const interval = setInterval(loadWeather, 30 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [lat, lon]);

  return { weather, loading, error };
}

