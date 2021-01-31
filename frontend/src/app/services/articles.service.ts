import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Article } from '../models/Article.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class ArticlesService {
    articles$ = new Subject<Article[]>();

    constructor(private http: HttpClient,
        private auth: AuthService) {}

    getArticles() {
        this.http.get('http://localhost:3000/api/articles').subscribe(
            (articles: Article[]) => {
                this.articles$.next(articles);
            },
            (error) => {
                this.articles$.next([]);
                console.error(error);
            }
        );
    }
}