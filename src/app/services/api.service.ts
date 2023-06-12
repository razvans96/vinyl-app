import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:3000'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getSongs() {
    const url = `${this.apiUrl}/api/song`;
    return this.http.get(url);
  }

  postSong(data: any) {
    const url = `${this.apiUrl}/api/song`;
    return this.http.post(url, data);
  }

  searchSongs(query: string) {
    const url = `${this.apiUrl}/api/song/search/${query}`;
    return this.http.get(url);
  }

  // Agrega otros métodos según tus necesidades
}
