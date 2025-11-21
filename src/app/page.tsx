'use client';

import { useState } from 'react';
import { Container } from '@/shared/ui/container';
import { YandexMap } from '@/widgets/yandex-map';
import { PlaceModal } from '@/widgets/place-modal';
import { WeatherWidget } from '@/widgets/weather-widget';
import { PLACES } from '@/shared/data';
import { Place } from '@/shared/types';

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Небольшая задержка перед очисткой данных для плавной анимации
    setTimeout(() => {
      setSelectedPlace(null);
    }, 300);
  };

  return (
    <Container className="py-12">
      {/* Виджет погоды в правом верхнем углу */}
      <div className="fixed top-24 right-8 z-40 w-72">
        <WeatherWidget />
      </div>

      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-gray-900">Страница 1</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Добро пожаловать на главную страницу! Кликните на маркеры на карте, чтобы узнать больше о местах Таиланда.
        </p>
        <div className="mt-8">
          <YandexMap 
            width={1000} 
            height={1000} 
            places={PLACES}
            onPlaceClick={handlePlaceClick}
            showBorders={true}
            showRoute={true}
            routePlaceIds={[
              'bangkok',
              'phitsanulok',
              'ayutthaya',
              'lopburi',
              'nakhonsawan',
              'chiangrai',
              'chiangmai',
              'mae-ya-waterfall',
            ]}
          />
        </div>
      </div>

      <PlaceModal
        place={selectedPlace}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Container>
  );
}
