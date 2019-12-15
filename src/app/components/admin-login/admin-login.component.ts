import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(
    private authService: AuthService, 
    private location: Location,
    private router: Router) { }

  ngOnInit() {
  }

  Login(f: NgForm){
      if (this.username == 'admin' && this.password == 'admin') {
        this.authService.Login();
        this.router.navigateByUrl('');
      }

  }

}