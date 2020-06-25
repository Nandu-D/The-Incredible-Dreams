import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPostRequest } from 'src/app/models/register.post.request.model';
import { LoginPostRequest } from 'src/app/models/login.post.request.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginLogoutService {

  constructor(private http: HttpClient) { }

  loginUser(body: LoginPostRequest) {
    return this.http.post('http://localhost:8080/api/auth/login', body);
  }

  registerUser(body: RegisterPostRequest) {
    return this.http.post('http://localhost:8080/api/auth/signup', body);
  }

  saveTokenInLocalStorage(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }
}
