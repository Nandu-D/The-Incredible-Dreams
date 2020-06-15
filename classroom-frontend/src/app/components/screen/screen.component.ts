import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { BackgroundComponent } from '../../backgroundDialog/background.component';
import { RegisterLoginLogoutService } from 'src/app/services/register-logon-logout/register-login-logout.service';
import { Router } from '@angular/router';
import { BackgroundImageService } from 'src/app/services/background-image/background-image.service';
import { ApiResponse } from 'src/app/models/api.response.model';
import { ImageDetailModel } from 'src/app/models/image.details.model';
import { NotesService } from 'src/app/services/notes/notes.service';
import { NotesRequestModel } from 'src/app/models/notes.request.model';

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

    this.notesService.getNotes().subscribe(
      (response: ApiResponse) => {
        this.notes = response.message;
      }
    );
  }

  constructor(public dialog: MatDialog, 
    private registerLoginLogoutServcie: RegisterLoginLogoutService,
    private router: Router, 
    private backgroundService: BackgroundImageService,
    private notesService: NotesService) {}

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
    this.notesService.toggleNotesOpenInLocalStorage(this.text_drag_drop_visible, "");
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
  }

  toggleGroupDragDropVisibility() {
    this.group_drag_drop_visible = !this.group_drag_drop_visible;
  }
}
