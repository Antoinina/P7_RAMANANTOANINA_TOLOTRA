import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from '../services/articles.service';
import { Article } from '../models/Article.model';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles = null;
  currentUser;


  constructor(private articleService: ArticleService,
                private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {


      this.articleService.getAll()
        .pipe(first())
        .subscribe(articles => this.articles = articles);
        this.currentUser = this.authService.getAuthentifiedUser();
  }

  deleteArticle(id: any) {
    const article = this.articles.find(x => x.id === id);
    article.isDeleting = true;
    this.articleService.delete(id)
        .pipe(first())
        .subscribe(() => this.articles = this.articles.filter(x => x.id !== id));
}

userLike(id: any){
  const newArticle = this.articles.find(x => x.id === id);
  newArticle.likes++;
  this.articleService.userLike(id, newArticle)
    .pipe(first())
    .subscribe();
}

modifyArticle(id: any){

}

}
