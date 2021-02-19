import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  account;
  users = null;
  loading = false;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.account = this.authService.getAuthentifiedUser();

    if (this.account.email === 'admin@groupomania.fr'){
      this.authService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
    }
  }

  onDeleteUser(){
    this.authService.deleteUserAdmin(this.account.userId)
      .pipe(first())
      .subscribe(
        
      );
  }

}
