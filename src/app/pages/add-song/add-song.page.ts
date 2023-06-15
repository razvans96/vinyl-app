import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Geolocation } from '@capacitor/geolocation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    location: {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
    },
    user: '',
  };

  private userId: string = '';
  private latitude: number = 0;
  private longitude: number = 0;
  private accuracy: number = 0;

  songForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getCurrentPosition();
    this.songForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      date: ['', Validators.required],
      photo: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.getUserId();
  }

  getUserId() {
    this.userId = this.authService.getUserId();
    console.log('USUARIO:' + this.userId);
  }

  addSong() {
    if (this.songForm.valid) {
      this.song = {
        _id: '',
        title: this.songForm.value.title,
        artist: this.songForm.value.artist,
        date: this.songForm.value.date,
        photo: this.songForm.value.photo,
        location: {
          latitude: this.latitude,
          longitude: this.longitude,
          accuracy: this.accuracy,
        },
        user: this.userId,
      };
      console.log(this.song);
      try {
        this.apiService.postSong(this.song).then(response => {
          console.log(response);
          this.router.navigate(['/home']);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    this.accuracy = coordinates.coords.accuracy;
    console.log('LATITUD: ' + this.latitude);
    console.log('LONGITUD: ' + this.longitude);
    console.log('PRECISIÓN: ' + this.accuracy);
  }
}
