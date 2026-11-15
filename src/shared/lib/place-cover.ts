import { MediaItem, Place } from '@/shared/types';

/** Обложка места: первое фото, иначе первое видео, иначе `image`. */
export function getPlaceCover(place: Place): MediaItem | null {
  if (place.media && place.media.length > 0) {
    return place.media.find((m) => m.type === 'image') ?? place.media[0];
  }
  if (place.image) {
    return { type: 'image', src: place.image };
  }
  return null;
}
