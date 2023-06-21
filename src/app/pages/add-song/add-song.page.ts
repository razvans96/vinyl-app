import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Geolocation } from '@capacitor/geolocation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    photobase64: '',
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

  //create attribute photo to store the photo in base64
  private photo: string = '';

  songForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getCurrentPosition();
    this.songForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      date: ['', Validators.required],
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
        photobase64: this.photo,
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

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    if (image) {
      this.readAsBase64(image);
    }
  }

  async readAsBase64(cameraPhoto: any) {
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    this.photo = (await this.convertBlobToBase64(blob)) as string;
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async getCurrentPosition() {
    if (navigator.geolocation) {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.accuracy = coordinates.coords.accuracy;
      console.log('LATITUD: ' + this.latitude);
      console.log('LONGITUD: ' + this.longitude);
      console.log('PRECISIÓN: ' + this.accuracy);
    } else {
      console.log('No geolocation available');
    }
  }

  isPhotoEmpty() {
    return this.photo === '';
  }
}
