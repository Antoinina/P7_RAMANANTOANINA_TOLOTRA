import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { ArticleService } from '../services/articles.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  form: FormGroup;

  constructor(private accountService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute) { }

  account;
  currentUser;
  loading = false;
  pictureProfil = true;
  article;
  userSelected;

  //Convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.userSelected = JSON.parse(localStorage.getItem('userSelected'));
    this.account = this.accountService.getUserById(this.route.snapshot.params.userId, this.userSelected);

    this.currentUser = this.accountService.getAuthentifiedUser();
    
    //To show profile picture or avatar
    if (this.account.imageUrl !== null){
      this.pictureProfil = true;
    } else {
      this.pictureProfil = false;
    }

    this.form = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      imageUrl: [null],
      arriveDate: [null],
      biographie: [null]
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
  newPwd = false;
  newProfil = false;

  changeProfil() {
    this.newProfil = true;
    return this.newProfil;
  }

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.get('imageUrl').setValue(file);
  }

  onSubmitProfil() {
    const formData = new FormData();
    formData.append('imageUrl', this.form.get('imageUrl').value);
    formData.append('jobTitle', this.form.get('jobTitle').value);
    formData.append('biographie', this.form.get('biographie').value);
    formData.append('arriveDate', this.form.get('arriveDate').value);

    this.accountService.update(formData, this.accountService.getAuthentifiedUser().userId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.router.navigate(['/home'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  onDeleteProfil(){
    this.accountService.delete(this.accountService.getAuthentifiedUser().userId)
      .pipe(first())
      .subscribe();
  }

}
