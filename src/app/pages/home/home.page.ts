import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
  user: string = '';
  searchExec: boolean = false;
  showSpotify: boolean = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllSongs();
    this.getUser();
  }

  ionViewWillEnter() {
    this.getUser();
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

  getUser() {
    this.user = this.authService.getUser();
    console.log('USUARIO:' + this.user);
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
      query += `title:${this.searchTitle} `;
    }
    if (this.searchArtist != '') {
      query += `author:${this.searchArtist} `;
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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToAddSong() {
    this.router.navigate(['/add-song']);
  }

  goToSongDetails(id: string) {
    this.router.navigate([`/song/${id}`]);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
