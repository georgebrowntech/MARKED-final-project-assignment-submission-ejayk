import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = '';
  adminLogin: boolean;

  Login() {
    this.adminLogin = true;
    sessionStorage.setItem('isLoggedIn', '' + this.adminLogin);
  }

  Logout() {
    this.adminLogin = false;
    sessionStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return (sessionStorage.getItem('isLoggedIn') === 'true');
  }

  constructor(private http: HttpClient) {
    this.adminLogin = false;
  }
}