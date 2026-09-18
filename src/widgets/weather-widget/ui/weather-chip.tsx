'use client';

import Image from 'next/image';
import { useWeather } from '@/shared/hooks';
import { BANGKOK_COORDS, getWeatherIconUrl } from '@/shared/api';

/**
 * Компактная погода для шапки: «Бангкок · +31°».
 * Если ключа API нет или запрос упал — ничего не показываем, чтобы не занимать место ошибкой.
 */
export const WeatherChip = ({ className = '' }: { className?: string }) => {
  const { weather, loading, error } = useWeather(BANGKOK_COORDS.lat, BANGKOK_COORDS.lon);

  if (loading) {
    return (
      <span
        className={`hidden h-8 w-28 animate-pulse rounded-full bg-surface-2 sm:block ${className}`}
        aria-hidden
      />
    );
  }

  if (error || !weather) return null;

  const sign = weather.temp > 0 ? '+' : '';

  return (
    <span
      className={`inline-flex h-8 items-center gap-1 rounded-full border border-line bg-surface pl-1 pr-3 text-sm font-semibold text-fg-2 ${className}`}
      title={`${weather.description}, ощущается как ${weather.feels_like}°`}
    >
      <Image
        src={getWeatherIconUrl(weather.icon)}
        alt=""
        width={28}
        height={28}
        className="h-7 w-7"
        unoptimized
      />
      <span className="hidden sm:inline">Бангкок ·</span>
      <span className="text-fg">
        {sign}
        {weather.temp}°
      </span>
    </span>
  );
};
