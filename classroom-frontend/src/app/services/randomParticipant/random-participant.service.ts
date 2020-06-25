import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NamesRequestModel } from 'src/app/models/names.request.model';
import { ApiResponse } from 'src/app/models/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class RandomParticipantService {

  constructor(private http: HttpClient) { }

  saveNames(namesRequestModel: NamesRequestModel) {
    return this.http.post('http://localhost:8080/api/data/saveNames',namesRequestModel)
      .subscribe(
        (response: ApiResponse) => {
          return true;
        }
      );
  }

  getNames() {
    return this.http.get("http://localhost:8080/api/data/getNames");
  }
  
  toggleRandomOpenInLocalStorage(isVisible: boolean) {
    localStorage.setItem("isRandomVisible", isVisible ? "true" : "false");
  }
  
  getRandomVisibilityLocalStorage(): boolean {
    return (localStorage.getItem("isRandomVisible") === "true") ? true : false;
  } 
}
