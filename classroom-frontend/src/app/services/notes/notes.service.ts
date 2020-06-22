import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotesRequestModel } from 'src/app/models/notes.request.model';
import { ApiResponse } from 'src/app/models/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  saveNotes(notesRequestModel: NotesRequestModel) {
    return this.http.post('http://localhost:8080/api/data/saveNotes',
      notesRequestModel).subscribe(
        (response: ApiResponse) => {
          console.log("got notes response: " + response.message);
        }
      );
  }

  toggleNotesOpenInLocalStorage(isVisible: boolean) {
    localStorage.setItem("isNotesVisible", isVisible ? "true" : "false");
  }

  getNotesVisibilityLocalStorage(): boolean {
    return (localStorage.getItem("isNotesVisible") === "true") ? true : false;
  }

  getNotes() {
    return this.http.get("http://localhost:8080/api/data/getNotes");
  }
}
