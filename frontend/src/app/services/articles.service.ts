import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/Article.model';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/api/articles';

@Injectable({
    providedIn: 'root'
})

export class ArticleService {

    constructor(private http: HttpClient) {}

    getAll(){
        this.http.get<Article[]>(baseUrl);
    }

    createArticle(data: any): Observable<any>{
        return this.http.post(baseUrl, data);
    }

    updateArticle(id: any, data: any): Observable<any>{
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    deleteArticle(id: any): Observable<any>{
        return this.http.delete(`${baseUrl}/${id}`);
    }
}