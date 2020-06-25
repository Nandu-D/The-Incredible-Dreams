import { Component, OnInit } from '@angular/core';
import { RegisterPostRequest } from 'src/app/models/register.post.request.model';
import { Router } from '@angular/router';
import { RegisterLoginLogoutService } from 'src/app/services/register-logon-logout/register-login-logout.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage = "";
  firstname = "";
  lastname = "";
  email = "";
  password = "";
  confirmpassword = "";

  requestBody: RegisterPostRequest;

  constructor(private registerbackendcallservice: RegisterLoginLogoutService,
    private router: Router) { 

  }

  ngOnInit(): void {
  }

  register() {
    this.errorMessage = "";
    this.requestBody = new RegisterPostRequest();
    if (this.firstname === "" || this.lastname === "" || this.email === "" || this.password === "" || this.confirmpassword === "") {
      this.errorMessage = "Please enter all the details";
    } else {
      const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      const isEmailValid = regexp.test(this.email);
      if (isEmailValid) {
        if (!(this.password === this.confirmpassword)) {
          this.errorMessage = "Password does not match. Please try again";
        }
      } else {
        this.errorMessage = "Please enter a valid email";
      }
    }

    if (this.errorMessage === "") {
      this.requestBody = {
        name : this.firstname + " " + this.lastname,
        email : this.email,
        password : this.password
      }

      this.registerbackendcallservice.registerUser(this.requestBody).subscribe(
        (response) => {
          this.router.navigate(['../home'], {queryParams: {register_success: true}});
        },
        (error) => {
          this.errorMessage = "An error occured. Please try again";
          this.router.navigate(['../home'], {queryParams: {register_success: false}});
        }
      );
    }
  }
}
