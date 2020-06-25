import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { BackgroundComponent } from '../../dialogs/backgroundDialog/background.component';
import { RegisterLoginLogoutService } from 'src/app/services/register-logon-logout/register-login-logout.service';
import { Router } from '@angular/router';
import { BackgroundImageService } from 'src/app/services/background-image/background-image.service';
import { ApiResponse } from 'src/app/models/api.response.model';
import { ImageDetailModel } from 'src/app/models/image.details.model';
import { NotesService } from 'src/app/services/notes/notes.service';
import { NotesRequestModel } from 'src/app/models/notes.request.model';
import { RandomParticipantService } from 'src/app/services/randomParticipant/random-participant.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { RandomParticipantComponent } from 'src/app/dialogs/randomParticipantDialog/random-participant/random-participant.component';
import { NamesRequestModel } from 'src/app/models/names.request.model';
import { GroupsComponent } from 'src/app/dialogs/groupsDialog/groups/groups.component';
import { GroupsModel } from 'src/app/models/groups.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  backgroundResult: ImageDetailModel;
  backgroundUrl: string;
  text_drag_drop_visible: boolean;
  group_drag_drop_visible: boolean;
  random_drag_drop_visible: boolean;
  notes: string;
  participants: string = "";
  randomHeading: string;
  participantsArray: string[] = [];
  maxNoInAGroup = 3;
  groupsList: GroupsModel[]; 

  constructor(public dialog: MatDialog, 
    private registerLoginLogoutServcie: RegisterLoginLogoutService,
    private router: Router, 
    private backgroundService: BackgroundImageService,
    private notesService: NotesService,
    private randomParticipantService: RandomParticipantService,
    private groupsService: GroupsService,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.text_drag_drop_visible = false;
    this.backgroundService.getSavedImageUrl().subscribe(
      (result: ApiResponse) => {
        if (result.success) {
          if (!(result.message === "")) {
            this.backgroundUrl = result.message;
          }
        }        
      }
    );

    this.text_drag_drop_visible = this.notesService.getNotesVisibilityLocalStorage();
    this.random_drag_drop_visible = this.randomParticipantService.getRandomVisibilityLocalStorage();
    this.group_drag_drop_visible = this.groupsService.getGroupsVisibilityLocalStorage();

    this.notesService.getNotes().subscribe(
      (response: ApiResponse) => {
        this.notes = response.message;
      }
    );

    this.randomParticipantService.getNames().subscribe(
      (response: NamesRequestModel) => {
        this.participantsArray = response.names;
        this.participants = this.participantsArray.join("\n");
      }
    );

    this.groupsService.getGroups().subscribe(
      (response: GroupsModel[]) => {
        this.groupsList = response;
      }
    );
  }

  openDialog() {
      const dialogConfig = new MatDialogConfig();

      const dialogRef = this.dialog.open(BackgroundComponent, {maxWidth: '80vw'});

      dialogRef.afterClosed().subscribe(result => {
        this.backgroundResult = result;
        if (result != null) {
            this.backgroundUrl = result.fullimageurl;
            this.backgroundService.saveImageUrl(this.backgroundUrl);
        }
      });
  }

  logout() {
    this.registerLoginLogoutServcie.logout();
    this.router.navigate(['/home'], {queryParams: {'logout_success': 'true'}});
  }
 
  toggleTextDragDropVisibility() {
    this.text_drag_drop_visible = !this.text_drag_drop_visible;
    this.notesService.toggleNotesOpenInLocalStorage(this.text_drag_drop_visible);
  }

  noteChange() {
    console.log(this.notes);
    const notesRequest: NotesRequestModel = {
      notes: this.notes
    }
    this.notesService.saveNotes(notesRequest);
  }

  toggleRandomDragDropVisibility() {
    this.random_drag_drop_visible = !this.random_drag_drop_visible;
    this.randomParticipantService.toggleRandomOpenInLocalStorage(this.random_drag_drop_visible);
  }

  participantsChange(partticipantslist: string) {
   const prevLength = this.participantsArray.length;
   const eachParticipantArray = this.participants.split("\n");
   this.participantsArray = eachParticipantArray.filter(value => value);
   const currentLength = this.participantsArray.length;
   if(currentLength != prevLength) {
     const namesRequestModel: NamesRequestModel = {
       names: this.participantsArray
     };
     this.randomParticipantService.saveNames(namesRequestModel);
   }
  }

  chooseRandom() {
    const eachParticipantArray = this.participants.split("\n");
    this.participantsArray = eachParticipantArray.filter(value => value);
    const randomStudent = this.participantsArray[Math.floor(Math.random() * this.participantsArray.length)];
    this.openRandomParticipantDialog(randomStudent);
    this.randomHeading = "- " + randomStudent;

    const namesRequestModel: NamesRequestModel = {
      names: this.participantsArray
    };
    this.randomParticipantService.saveNames(namesRequestModel);
  }

  selectGroups() {
    const eachParticipantArray = this.participants.split("\n");
    this.participantsArray = eachParticipantArray.filter(value => value);

    const groups = {};
    const noOfGroups = Math.ceil(this.participantsArray.length / this.maxNoInAGroup);

    let tempArray = [...this.participantsArray];
    for (let i = 0; i < noOfGroups; i++) {
      groups[i] = [];
      for (let j = 0; (j < this.maxNoInAGroup && tempArray.length > 0); j++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        groups[i].push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
      }
    }

    if (this.participantsArray.length > 0) {
      const namesRequestModel: NamesRequestModel = {
        names: this.participantsArray
      };

      this.groupsList = [];
      for (let i in groups) {
        const groupname = "Group " + (+i + 1);
        const groupModel: GroupsModel = {
          groupName: groupname,
          members: groups[i]
        };
        this.groupsList.push(groupModel);
      }

      this.http.post('http://localhost:8080/api/data/saveNames',namesRequestModel)
      .subscribe(
        (response: ApiResponse) => {
          this.groupsService.saveGroups(this.groupsList);  
        }
      );

      this.openGroupsDialog();
    }
  }

  toggleGroupDragDropVisibility() {
    this.group_drag_drop_visible = !this.group_drag_drop_visible;
    this.groupsService.toggleGroupsOpenInLocalStorage(this.group_drag_drop_visible);
  }

  openRandomParticipantDialog(name: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      name: name
    };
    const dialogRef = this.dialog.open(RandomParticipantComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {}
    );
  }

  openGroupsDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      groups: this.groupsList
    };
    const dialogRef = this.dialog.open(GroupsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {}
    );   
  }
  
  isGroupsAlreadyThere() {
    if (this.groupsList) {
      if (this.groupsList.length > 0) {
        return true;
      }
    }
    return false;
  } 

  getMatFormFieldStyles() {
    const styles = {
      'width': this.isGroupsAlreadyThere() ? '60px' : '100px'
    }
    return styles;
  }
}
