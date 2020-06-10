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
    this.requestBody = new RegisterPostRequest();
    console.log("register clicked");
    if (!(this.password === this.confirmpassword)) {
      this.errorMessage = "Password does not match. Please try again";
    } else {
      this.errorMessage = "";
    }

    if (this.errorMessage === "") {
      this.requestBody = {
        name : this.firstname + " " + this.lastname,
        email : this.email,
        password : this.password
      }
      console.log(this.requestBody);

      this.registerbackendcallservice.registerUser(this.requestBody).subscribe(
        (response) => {
          console.log("response" + response);
          this.router.navigate(['../home'], {queryParams: {register_success: true}});
        },
        (error) => {
          console.log("register error\n" + error);
          this.errorMessage = "An error occured. Please try again";
          this.router.navigate(['../home'], {queryParams: {register_success: false}});
        }
      );
    }
  }
}
