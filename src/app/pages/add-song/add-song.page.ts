import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
//import geolocation from capacitor

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.page.html',
  styleUrls: ['./add-song.page.scss'],
})
export class AddSongPage implements OnInit {
  private song: Song = {
    _id: '',
    title: '',
    artist: '',
    date: new Date(),
    photo: '',
    duration: 0,
    location: {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
    },
    user: '',
  };

  private user: string = '';
  private photo: string = '';
  private latitude: number = 0;
  private longitude: number = 0;
  private accuracy: number = 0;
  private duration: number = 0;
  private title: string = '';
  private artist: string = '';
  private date: Date = new Date();
  private location: any = {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getUser();
  }

  getUser() {
    this.user = this.authService.getUser();
    console.log('USUARIO:' + this.user);
  }
}
