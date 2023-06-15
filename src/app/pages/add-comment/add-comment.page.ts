import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.page.html',
  styleUrls: ['./add-comment.page.scss'],
})
export class AddCommentPage implements OnInit {
  private comment: Comment = {
    _id: '',
    comment: '',
    song: '',
    author: '',
    rating: 0,
    location: {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
    },
  };

  private songId: string = '';
  private latitude: number = 0;
  private longitude: number = 0;
  private accuracy: number = 0;

  commentForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCurrentPosition();
    this.getSongId();
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      rating: ['', Validators.required],
      author: ['', Validators.required],
    });
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

  getSongId() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.songId = id;
        console.log('Song ID:', id);
      }
    });
  }

  addComment() {
    if (this.commentForm.valid) {
      this.comment = {
        _id: '',
        comment: this.commentForm.value.comment,
        song: this.songId,
        author: this.commentForm.value.author,
        rating: this.commentForm.value.rating,
        location: {
          latitude: this.latitude,
          longitude: this.longitude,
          accuracy: this.accuracy,
        },
      };
      console.log(this.comment);
      this.apiService.postComment(this.comment).then(response => {
        console.log(response);
        this.router.navigate(['/song/' + this.songId]);
      });
    }
  }
}
