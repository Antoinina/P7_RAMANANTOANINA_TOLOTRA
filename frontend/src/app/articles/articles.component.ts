import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { ArticleService } from '../services/articles.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles = null;
  currentUser;
  account;
  pictureProfil = true;
  isShown = false;

  constructor(private articleService: ArticleService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.account = this.authService.getAuthentifiedUser();
    this.currentUser = this.authService.getAuthentifiedUser();

    //To show profile picture or avatar
    if (this.account.imageurl !== null) {
      this.pictureProfil = true;
    } else {
      this.pictureProfil = false;
    }

    this.articleService.getAll()
      .pipe(first())
      .subscribe(articles => this.articles = articles);
  }

  deleteArticle(id: any) {
    const article = this.articles.find(x => x.id === id);
    article.isDeleting = true;
    this.articleService.delete(id)
      .pipe(first())
      .subscribe(() => this.articles = this.articles.filter(x => x.id !== id));
  }

  userLike(id: any) {
    const newArticle = this.articles.find(x => x.id === id);
    newArticle.likes++;
    newArticle.likecountByTheUser++;
    this.articleService.userLike(id, newArticle)
      .pipe(first())
      .subscribe();
  }

  modifyArticle(id: any) {

  }

}
