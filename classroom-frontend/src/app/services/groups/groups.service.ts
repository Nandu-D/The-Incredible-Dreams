import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupsModel } from 'src/app/models/groups.model';
import { ApiResponse } from 'src/app/models/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  saveGroups(groupsModel: GroupsModel[]) {
    return this.http.post('http://localhost:8080/api/data/saveGroups', groupsModel)
      .subscribe(
        (response: ApiResponse) => {
          console.log("save groups response: " + response.message);
        }
      );
  }

  getGroups() {
    return this.http.get("http://localhost:8080/api/data/getGroups");
  }

  toggleGroupsOpenInLocalStorage(isVisible: boolean) {
    localStorage.setItem("isGroupsVisible", isVisible ? "true" : "false");
  }

  getGroupsVisibilityLocalStorage(): boolean {
    return (localStorage.getItem("isGroupsVisible") === "true") ? true : false;
  }
}
