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

  constructor(public dialog: MatDialog, 
    private registerLoginLogoutServcie: RegisterLoginLogoutService,
    private router: Router, 
    private backgroundService: BackgroundImageService,
    private notesService: NotesService,
    private randomParticipantService: RandomParticipantService,
    private groupsService: GroupsService) {}

  ngOnInit(): void {
    console.log('in screen');
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
        console.log("get Names: " + response.names);
        this.participantsArray = response.names;
        this.participants = this.participantsArray.join("\n");
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
    console.log("participants change");
   const prevLength = this.participantsArray.length;
   const eachParticipantArray = this.participants.split("\n");
   this.participantsArray = eachParticipantArray.filter(value => value);
   const currentLength = this.participantsArray.length;
   console.log("prev len: " + prevLength + " current len: " + currentLength);
   if(currentLength != prevLength) {
     const namesRequestModel: NamesRequestModel = {
       names: this.participantsArray
     };
     console.log("for api call " + namesRequestModel.names);
     this.randomParticipantService.saveNames(namesRequestModel);
   }
  }

  chooseRandom() {
    const randomStudent = this.participantsArray[Math.floor(Math.random() * this.participantsArray.length)];
    this.openRandomParticipantDialog(randomStudent);
    this.randomHeading = "- " + randomStudent;
  }

  groupChange(grouplist: string) {
    console.log("group\n" + grouplist);
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
}
