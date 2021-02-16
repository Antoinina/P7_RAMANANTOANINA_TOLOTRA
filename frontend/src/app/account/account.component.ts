import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private authService: AuthService) { }

  account;

  ngOnInit(): void {
    this.account = this.authService.getAuthentifiedUser();
  }

  onSubmit(form:NgForm){
    console.log(form.value);
  }

  pictureProfil = true;
  newPwd=false;
  newProfil=false;

  changePwd(){
    this.newPwd=true;
    return this.newPwd;
  }

  changeProfil(){
    this.newProfil=true;
    return this.newProfil;
  }
    
}
