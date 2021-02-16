import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Article } from '../models/Article.model';
import { AuthService } from './auth.service';

const baseUrl = 'http://localhost:3000/api/articles';

@Injectable({
    providedIn: 'root'
})

export class ArticleService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    /*getAll(){
        this.http
        .get(baseUrl)
        .subscribe(
            (articles: Article[]) => {
                this.articles$.next(articles);
                console.log("Récupération réussie");
            },
            (error) => {
                this.articles$.next([]);
                console.log("Erreur survenue" + error);
            }
        )

    }*/
    getAll() {
        return this.http.get<Article[]>('http://localhost:3000/api/articles');
    }

    publishArticle(data: Article){
        const article = { ...data, userId: this.authService.getAuthentifiedUser().userId };
        console.log('article', article);
        return this.http.post('http://localhost:3000/api/articles', article);
    }

    delete(id: any) {
        return this.http.delete(`http://localhost:3000/api/articles/${id}`);
    }

    userLike(id: any, data: Article){
        const userId = this.authService.getAuthentifiedUser().userId;
        return this.http.post(`http://localhost:3000/api/articles/${id}/like/${userId}`, data);
    }
}