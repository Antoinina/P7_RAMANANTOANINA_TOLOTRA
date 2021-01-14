import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

  account = {
    id: '_1',
    imageUrl:'../assets/pdp.jpg',
    firstname:'John',
    lastname:'Doe',
    job:'Chef de Projet IT',
    email:'johndoe@groupomania.com',
    password:'cocoJojo'
  }
    
}
