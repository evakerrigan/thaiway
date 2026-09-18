export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
}

export type PlaceCategory = 'city' | 'island' | 'beach' | 'temple' | 'other';

export interface Place {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  image?: string;
  category?: PlaceCategory;
  /** Провинция или регион — показывается в чипах карточки. */
  province?: string;
  /** Ранг в списке «11 лучших мест». 1 — лучшее. Если задан — место отображается на странице /top-places. */
  rank?: number;
  /** Развёрнутое описание для статьи на /top-places. */
  fullDescription?: string;
  /** Галерея фото и видео. */
  media?: MediaItem[];
  /** Ссылка на Google Maps. */
  googleMapsUrl?: string;
}

export type PlaceId = Place['id'];
