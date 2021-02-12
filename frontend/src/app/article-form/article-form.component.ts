import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { Article } from '../models/Article.model';
import { ArticleService } from '../services/articles.service';
import { AlertService } from '../services/alert.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  articleForm: FormGroup;
  submitted = false;
  loading = false;
  article: Article;
  errorMsg: string;
  user: User;

  constructor(private articles: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      publication: ['', Validators.required]
    });

  }

  get f() { return this.articleForm.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.articleForm.invalid) {
      return;
    }

    this.loading = true;

    this.articles.publishArticle(this.articleForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
            this.alertService.success('Publication réussie', { keepAfterRouteChange: true });
            this.router.navigate(['/articles'], { relativeTo: this.route });
        },
        error: error => {
            this.alertService.error(error);
            this.loading = false;
        }
      });
  }

  templateArticleForm = [
    {
      imageUrl: 'https://cdn.shopify.com/s/files/1/2430/8823/files/1.jpg?v=1588688635',
      name: 'Jean R.',
      job: 'Assistant Directeur'
    }
  ]

}
