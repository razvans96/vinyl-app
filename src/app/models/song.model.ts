export interface Song {
  _id: string;
  title: string;
  artist: string;
  date: Date;
  photo: string;
  photobase64: string;
  location: {
    latitude: number | undefined;
    longitude: number | undefined;
    accuracy: number | undefined;
  };
  user: string;
}
