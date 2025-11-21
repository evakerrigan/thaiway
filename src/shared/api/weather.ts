/**
 * API конфигурация для получения погоды
 * Используется OpenWeatherMap API
 */

export const WEATHER_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '',
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  lang: 'ru',
  units: 'metric', // Цельсий
} as const;

// Координаты Бангкока
export const BANGKOK_COORDS = {
  lat: 13.736717,
  lon: 100.523186,
} as const;

// Типы данных погоды
export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  city: string;
}

export interface WeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
}

/**
 * Получить погоду по координатам
 */
export async function fetchWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData | null> {
  try {
    const { apiKey, baseUrl, lang, units } = WEATHER_CONFIG;
    
    if (!apiKey) {
      console.warn('OpenWeather API key not set');
      return null;
    }

    const url = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}&units=${units}`;
    
    const response = await fetch(url, {
      next: { revalidate: 1800 }, // Кэш на 30 минут
    });

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data: WeatherResponse = await response.json();

    return {
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
    };
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    return null;
  }
}

/**
 * Получить погоду в Бангкоке
 */
export async function fetchBangkokWeather(): Promise<WeatherData | null> {
  return fetchWeatherByCoords(BANGKOK_COORDS.lat, BANGKOK_COORDS.lon);
}

/**
 * Получить URL иконки погоды
 */
export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

