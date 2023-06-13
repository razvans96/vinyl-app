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
    this.apiService.getSongs().subscribe(
      response => {
        this.songs = response as any[];
        console.log(this.songs); // Aquí puedes realizar la lógica adicional que necesites con los datos de las canciones
      },
      error => {
        console.error('Error al obtener las canciones:', error);
      }
    );
  }

  searchSongs() {
    const query = `?title=${this.searchTitle}&artist=${this.searchArtist}&date=${this.searchDate}`; // Construye la consulta con los parámetros
    this.apiService.searchSongs(query).subscribe(response => {
      this.songs = response as any[];
      console.log(this.songs); // Aquí puedes realizar la lógica adicional que necesites con los datos de las canciones
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
