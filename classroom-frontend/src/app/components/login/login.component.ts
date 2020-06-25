import { Component, OnInit } from '@angular/core';
import { LoginPostRequest } from 'src/app/models/login.post.request.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginResponse } from 'src/app/models/login.response.model';
import { RegisterLoginLogoutService } from 'src/app/services/register-logon-logout/register-login-logout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message = "";
  isMessageHidden = false;
  errorMessage = "";
  email = "";
  password = "";
  loginPostRequest: LoginPostRequest;
  
  constructor(private registerLoginLogoutService: RegisterLoginLogoutService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.registerLoginLogoutService.isLoggedIn) {
      this.router.navigate(['../screen']);
    }
    this.route.queryParams.subscribe(
      params => {
        const registerStatus = params['register_success'];
        if (registerStatus != '') {
          this.isMessageHidden = false;
          if (registerStatus == "true") {
            this.message = "You are successfully registered";
          } else {
            this.isMessageHidden = true;
            this.message = ""; 
          }
        }
      }
    );
  }

  login() {
    this.errorMessage = "";
    if (this.email === "" || this.password === "") {
      this.errorMessage = "Please enter your email and password"
    } else {
      const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      const isEmailValid = regexp.test(this.email);
      if (!isEmailValid) {
        this.errorMessage = "Please enter a valid email";
      }
    }
    if (this.errorMessage === "") {
      this.loginPostRequest = {
        email: this.email,
        password: this.password
      }
      this.registerLoginLogoutService.loginUser(this.loginPostRequest)
        .subscribe(
          (response: LoginResponse) => {
            this.registerLoginLogoutService.saveTokenInLocalStorage(response.accessToken);
            this.router.navigate(['../screen']);
          },
          error => {
            this.errorMessage = "An error occured. Please try again";
          }
      );
    }
  }

}
