import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageResponseModel } from '../models/Image.response.model';

@Injectable({
  providedIn: 'root'
})
export class BackgroundImageService {

  constructor(private http: HttpClient) { }

  getImageDetails() {
    return this.http.get('http://localhost:8080/api/imageUrls');
  }
}
