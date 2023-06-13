import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Song } from '../models/song.model';

describe('ApiService', () => {
  //create a mock of the ApiService
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /**
  it('should return an array of songs', () => {
    service.getSongs().then((songs: Song[]) => {
      expect(songs).toBeTruthy();
      expect(songs.length).toBeGreaterThan(0);
    });
  });
   */
});
