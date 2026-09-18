import type { MediaItem, Place, PlaceCategory } from '@/shared/types';

const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  city: 'Город',
  island: 'Остров',
  beach: 'Пляж',
  temple: 'Храм',
  other: 'Место',
};

export function getCategoryLabel(category?: PlaceCategory): string {
  return category ? CATEGORY_LABELS[category] : CATEGORY_LABELS.other;
}

/** Обложка места: первое фото из галереи, иначе `image`, иначе первое видео. */
export function getPlaceCover(place: Place): MediaItem | null {
  if (place.media && place.media.length > 0) {
    const firstImage = place.media.find((m) => m.type === 'image');
    if (firstImage) return firstImage;
    return place.media[0];
  }
  if (place.image) {
    return { type: 'image', src: place.image, alt: place.name };
  }
  return null;
}

/** Подпись вида «10 фото», «7 видео» или «3 фото и 1 видео». */
export function getMediaSummary(place: Place): string | null {
  const media = place.media ?? [];
  const photos = media.filter((m) => m.type === 'image').length;
  const videos = media.filter((m) => m.type === 'video').length;
  if (!photos && !videos) return null;
  const parts: string[] = [];
  if (photos) parts.push(`${photos} фото`);
  if (videos) parts.push(`${videos} видео`);
  return parts.join(' и ');
}

/** Ссылка на маршрут: своя ссылка Google Maps, иначе навигация по координатам. */
export function getDirectionsUrl(place: Place): string {
  if (place.googleMapsUrl) return place.googleMapsUrl;
  const { lat, lng } = place.coordinates;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}
