export interface Place {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  image: string;
  category?: 'city' | 'island' | 'beach' | 'temple' | 'other';
}

export type PlaceId = Place['id'];

