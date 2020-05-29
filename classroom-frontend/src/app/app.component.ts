import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { BackgroundComponent } from './backgroundDialog/background.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'classroom-frontend';
  backgroundResult;
  backgroundUrl;

  constructor(public dialog: MatDialog) {}

  openDialog() {
      const dialogConfig = new MatDialogConfig();

      const dialogRef = this.dialog.open(BackgroundComponent, {maxWidth: '80vw'});

      dialogRef.afterClosed().subscribe(result => {
        this.backgroundResult = result;
        if (result == null) {
          console.log("No need to change background");
        } else {
          console.log("Change background " + result.fullimageurl
            + "description " + result.description);
            this.backgroundUrl = result.fullimageurl;
        }
      });
  }

  backgroundUrl1() {
    if (this.backgroundResult == null) {
      return "";
    } else {
      return 'url('+this.backgroundResult.fullimageurl+')';
    }
  }
}
