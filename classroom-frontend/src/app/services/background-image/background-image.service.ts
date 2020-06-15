import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/models/api.response.model';
import { SaveBackgroundRequest } from 'src/app/models/save.background.request.model';

@Injectable({
  providedIn: 'root'
})
export class BackgroundImageService {

  constructor(private http: HttpClient) { }

  getImageDetails() {
    return this.http.get('http://localhost:8080/api/data/imageUrls');
  }

  saveImageUrl(imageUrl: string) {
    const saveBackgroundRequest: SaveBackgroundRequest
      = {
        backgroundUrl: imageUrl
      };
    return this.http.post('http://localhost:8080/api/data/setBackground',
      saveBackgroundRequest)
    .subscribe((res: ApiResponse) => {
      console.log("got the message" + res.message);
    });
  }

  getSavedImageUrl() {
    return this.http.get("http://localhost:8080/api/data/getSavedBackground");
  }
}
