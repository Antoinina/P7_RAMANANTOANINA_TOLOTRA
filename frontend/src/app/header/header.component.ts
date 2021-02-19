import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: User;
  isShown = false;
  account;

  constructor(private router: Router,
              private accountService: AuthService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.account = this.accountService.getAuthentifiedUser();
  }


  seeProfile() {
    const userId = localStorage.getItem('userId');
    this.router.navigate(['/profil', userId]);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

}
