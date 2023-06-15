import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Song } from '../../models/song.model';
import { Comment } from '../../models/comment.model';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    location: {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
    },
    user: '',
  };
  comments: Comment[] = [];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadSong();
  }

  loadSong() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.apiService.getSong(id).then((song: Song) => {
          this.song = song;
          this.getComments();
          console.log(this.song);
        });
        console.log('Song ID:', id);
      }
    });
  }

  getComments() {
    this.apiService.getComments(this.song._id).then((comments: Comment[]) => {
      this.comments = comments;
      console.log(this.comments);
    });
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  deleteSong() {
    //ask confirmation before deleting song
    if (window.confirm('Are you sure you want to delete the song?')) {
      this.apiService.deleteSong(this.song._id).then((song: Song) => {
        console.log(song);
        this.router.navigate(['/home']);
      });
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  goToAddComment() {
    this.router.navigate(['/add-comment', this.song._id]);
  }
}
