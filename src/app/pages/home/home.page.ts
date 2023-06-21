import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor, Plugins } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  songs: Song[] = []; // Array to store the list of songs
  spotifySongs: Song[] = []; // Array to store the list of songs
  searchTitle: string = '';
  searchArtist: string = '';
  searchDate: string = '';
  searchExec: boolean = false;
  showSpotify: boolean = false;
  latitude: number | undefined;
  longitude: number | undefined;
  accuracy: number | undefined;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllSongs();
  }

  ionViewWillEnter() {
    this.getLocation();
    this.cleanFilters();
    this.searchExec = false;
    this.showSpotify = false;
  }

  getAllSongs() {
    this.apiService.getSongs().then((songs: Song[]) => {
      this.songs = songs;
      console.log(this.songs);
    });
  }

  convertFromBase64(base64: string): Promise<Blob> {
    return fetch(base64)
      .then(res => res.blob())
      .catch(err => {
        console.error('Error converting from base64:', err);
        return Promise.reject(err);
      });
  }

  search() {
    this.searchSongs();
    this.searchExec = true;
    this.checkSpotifySearch();
    if (this.showSpotify) {
      this.searchSpotifySongs();
    }
  }

  checkSpotifySearch() {
    if (this.isLoggedIn() && this.searchExec) {
      this.showSpotify = true;
    } else {
      this.showSpotify = false;
    }
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
      console.log(this.songs);
    });
  }

  searchSpotifySongs() {
    let query = '?q=';
    if (this.searchTitle != '') {
      query += `track:${this.searchTitle} `;
    }
    if (this.searchArtist != '') {
      query += `artist:${this.searchArtist} `;
    }
    if (this.searchDate != '') {
      // add the year from date to the query
      query += `year:${this.searchDate.substring(0, 4)} `;
    }
    console.log(query);
    this.apiService.searchSpotifySongs(query).then((songs: Song[]) => {
      this.spotifySongs = songs;
      console.log(this.spotifySongs);
    });
  }
  cleanFilters() {
    this.searchTitle = '';
    this.searchArtist = '';
    this.searchDate = '';
    this.searchExec = false;
    this.showSpotify = false;
    this.getAllSongs();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  goToAddSong() {
    this.router.navigate(['/add-song']);
  }

  goToSongDetails(id: string) {
    this.router.navigate([`/song/${id}`]);
  }
  addSong(song: Song) {
    console.log('New song:', song);
    song.user = this.authService.getUserId();
    song.location = Object.create(null);
    song.location.latitude = this.latitude;
    song.location.longitude = this.longitude;
    song.location.accuracy = this.accuracy;
    this.apiService.postSong(song).then((song: Song) => {
      console.log('New song', song);
      this.search();
    });
  }

  async getLocation() {
    if (Capacitor.isNativePlatform()) {
      // Estamos en una aplicación móvil

      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.accuracy = coordinates.coords.accuracy;
      console.log(
        'Current position:',
        this.latitude,
        this.longitude,
        this.accuracy
      );
    } else {
      // Estamos en un navegador
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.accuracy = position.coords.accuracy;
            console.log(
              'Current position:',
              this.latitude,
              this.longitude,
              this.accuracy
            );
          },
          error => {
            console.log('Error getting location:', error);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }
  }
}
