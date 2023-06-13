import { Component, OnInit } from '@angular/core';
import { Song } from '../models/song.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  songs: Song[] = []; // Array to store the list of songs
  searchTitle: string = '';
  searchArtist: string = '';
  searchDate: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getAllSongs();
  }

  getAllSongs() {
    this.apiService.getSongs().then((songs: Song[]) => {
      this.songs = songs;
      console.log(this.songs);
    });
  }

  searchSongs() {
    //check if the search fields are empty and if they are, don't add them to the query
    let query = '?';
    if (this.searchTitle != '') {
      query += `title=${this.searchTitle}&`;
    }
    if (this.searchArtist != '') {
      query += `artist=${this.searchArtist}&`;
    }
    if (this.searchDate != '') {
      query += `date=${this.searchDate}&`;
    }
    console.log(query);
    this.apiService.searchSongs(query).then((songs: Song[]) => {
      this.songs = songs;
    });
  }

  cleanFilters() {
    this.searchTitle = '';
    this.searchArtist = '';
    this.searchDate = '';
    this.getAllSongs();
  }

  goToLogin() {}

  goToRegister() {}
}
