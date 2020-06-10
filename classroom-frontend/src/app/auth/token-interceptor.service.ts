import { Injectable, Injector } from '@angular/core';
import { RegisterLoginLogoutService } from '../services/register-logon-logout/register-login-logout.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector: Injector){}
  intercept(req, next) {
    let authService = this.injector.get(RegisterLoginLogoutService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
      }
    )
    return next.handle(tokenizedReq)
  }
}
