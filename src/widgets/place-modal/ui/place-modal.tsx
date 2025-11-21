'use client';

import Image from 'next/image';
import { Modal } from '@/shared/ui/modal';
import { Place } from '@/shared/types';

interface PlaceModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlaceModal = ({ place, isOpen, onClose }: PlaceModalProps) => {
  if (!place) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        {/* Изображение */}
        <div className="relative w-full h-64 bg-gray-200">
          <Image
            src={place.image}
            alt={place.name}
            fill
            className="object-cover rounded-t-2xl"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>

        {/* Контент */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {place.name}
          </h2>
          
          {place.category && (
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
              {getCategoryLabel(place.category)}
            </span>
          )}

          <p className="text-lg text-gray-700 leading-relaxed">
            {place.description}
          </p>

          {/* Координаты (опционально) */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Координаты: {place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Вспомогательная функция для перевода категорий
function getCategoryLabel(category: Place['category']): string {
  const labels: Record<NonNullable<Place['category']>, string> = {
    city: 'Город',
    island: 'Остров',
    beach: 'Пляж',
    temple: 'Храм',
    other: 'Другое',
  };
  return labels[category] || 'Место';
}

