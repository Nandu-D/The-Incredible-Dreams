import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RegisterLoginLogoutService } from '../services/register-logon-logout/register-login-logout.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private registerLoginLogoutService: RegisterLoginLogoutService,
    private router: Router) {}

  canActivate() {
    if (this.registerLoginLogoutService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false; 
    }
  }
}
