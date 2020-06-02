import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { BackgroundComponent } from '../../backgroundDialog/background.component';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  backgroundResult;
  backgroundUrl;

  ngOnInit(): void {
    console.log('in screen')
  }

  constructor(public dialog: MatDialog) {}

  openDialog() {
      const dialogConfig = new MatDialogConfig();

      const dialogRef = this.dialog.open(BackgroundComponent, {maxWidth: '80vw'});

      dialogRef.afterClosed().subscribe(result => {
        this.backgroundResult = result;
        if (result != null) {
            this.backgroundUrl = result.fullimageurl;
        }
      });
  }
}
