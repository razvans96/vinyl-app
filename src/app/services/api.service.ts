import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from '../models/song.model';
import { Comment } from '../models/comment.model';
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

  async searchSpotifySongs(query: string): Promise<Song[]> {
    let response = await fetch(`${this.apiUrl}/spotifySearch${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    // return element songs from response
    return await response.json();
  }

  async getSong(id: string): Promise<Song> {
    let response = await fetch(`${this.apiUrl}/song/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  async searchSongs(query: string): Promise<Song[]> {
    let response = await fetch(`${this.apiUrl}/song${query}`, {
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
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(song),
    });
    return await response.json();
  }

  async deleteSong(id: string): Promise<Song> {
    let response = await fetch(`${this.apiUrl}/song/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    return await response.json();
  }

  async getComments(songId: string): Promise<Comment[]> {
    let response = await fetch(`${this.apiUrl}/song/${songId}/comment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
}
