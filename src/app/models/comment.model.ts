export interface Comment {
  _id: string;
  author: string;
  rating: number;
  comment: string;
  location: {
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
  };
  song: string;
}
