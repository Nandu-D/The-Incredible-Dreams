import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  toggleGroupsOpenInLocalStorage(isVisible: boolean) {
    localStorage.setItem("isGroupsVisible", isVisible ? "true" : "false");
  }

  getGroupsVisibilityLocalStorage(): boolean {
    return (localStorage.getItem("isGroupsVisible") === "true") ? true : false;
  }
}
