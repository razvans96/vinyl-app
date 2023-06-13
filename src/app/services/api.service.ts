import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from '../models/song.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async getSongs(): Promise<Song[]> {
    let response = await fetch(`${this.apiUrl}/song`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  async searchSongs(query: string): Promise<Song[]> {
    let response = await fetch(`${this.apiUrl}/song/search${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  async postSong(song: Song): Promise<Song> {
    let response = await fetch(`${this.apiUrl}/song`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(song),
    });
    return await response.json();
  }
}
