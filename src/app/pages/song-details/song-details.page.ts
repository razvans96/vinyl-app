import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song.model';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.page.html',
  styleUrls: ['./song-details.page.scss'],
})
export class SongDetailsPage implements OnInit {
  song: Song = {
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

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.apiService.getSong(id).then((song: Song) => {
          this.song = song;
          console.log(this.song);
        });
        console.log('Song ID:', id);
      }
    });
  }
}
