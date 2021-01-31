import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
