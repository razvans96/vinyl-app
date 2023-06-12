export interface Song {
  id: string;
  title: string;
  artist: string;
  date: Date;
  photo: string;
  duration: number;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  user: string;
}
