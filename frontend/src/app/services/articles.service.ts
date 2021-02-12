import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Article } from '../models/Article.model';

const baseUrl = 'http://localhost:3000/api/articles';

@Injectable({
    providedIn: 'root'
})

export class ArticleService {

    constructor(private http: HttpClient) {}

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
        return this.http.post('http://localhost:3000/api/articles', data);
    }

    delete(id: string) {
        return this.http.delete(`http://localhost:3000/api/articles/${id}`)
    }
}