import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Comment } from '../models/Comment.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class CommentService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    getAll() {
        return this.http.get<Comment[]>('http://localhost:3000/api/comments');
    }

    publishComment(data: Comment){
        const comment = { ...data, userId: this.authService.getAuthentifiedUser().userId };
        console.log('comment', comment);
        return this.http.post('http://localhost:3000/api/comments', comment);
    }

    delete(id: any) {
        return this.http.delete(`http://localhost:3000/api/comments/${id}`);
    }
}