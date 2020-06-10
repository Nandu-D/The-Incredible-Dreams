import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { BackgroundComponent } from '../../backgroundDialog/background.component';
import { RegisterLoginLogoutService } from 'src/app/services/register-logon-logout/register-login-logout.service';
import { Router } from '@angular/router';

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

  constructor(public dialog: MatDialog, 
    private registerLoginLogoutServcie: RegisterLoginLogoutService,
    private router: Router) {}

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

  logout() {
    this.registerLoginLogoutServcie.logout();
    this.router.navigate(['/home'], {queryParams: {'logout_success': 'true'}});
  }
 
}
