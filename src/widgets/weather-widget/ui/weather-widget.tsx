'use client';

import Image from 'next/image';
import { useWeather } from '@/shared/hooks';
import { BANGKOK_COORDS, getWeatherIconUrl } from '@/shared/api';

interface WeatherWidgetProps {
  className?: string;
}

export const WeatherWidget = ({ className = '' }: WeatherWidgetProps) => {
  const { weather, loading, error } = useWeather(BANGKOK_COORDS.lat, BANGKOK_COORDS.lon);

  if (loading) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="text-gray-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Бангкок</p>
            <p className="text-xs text-gray-400">Данные недоступны</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm opacity-90 mb-1">📍 {weather.city}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold">{weather.temp}</span>
            <span className="text-2xl">°C</span>
          </div>
          <p className="text-sm opacity-90 mt-1 capitalize">
            {weather.description}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 relative">
            <Image
              src={getWeatherIconUrl(weather.icon)}
              alt={weather.description}
              fill
              className="object-contain drop-shadow-lg"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-sm">
        <div>
          <p className="opacity-75">Ощущается</p>
          <p className="font-semibold">{weather.feels_like}°C</p>
        </div>
        <div>
          <p className="opacity-75">Влажность</p>
          <p className="font-semibold">{weather.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

