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
    console.log("login start");
    if (this.email === "" || this.password === "") {
      this.errorMessage = "Invalid input"
    } else {
      this.errorMessage = "";
    }
    if (this.errorMessage === "") {
      console.log("login api call");
      this.loginPostRequest = {
        email: this.email,
        password: this.password
      }
      this.registerLoginLogoutService.loginUser(this.loginPostRequest)
        .subscribe(
          (response: LoginResponse) => {
            console.log("login response" + response);
            console.log('token ' + response.accessToken);
            this.registerLoginLogoutService.saveTokenInLocalStorage(response.accessToken);
            this.router.navigate(['../screen']);
          },
          error => {
            console.log("error in login status :\n" + Object.getOwnPropertyNames(error) 
              + "\nstatus " + error.status + " : text: " + error.statusText);
            this.errorMessage = "An error occured. Please try again";
          }
      );
    }
  }

}
