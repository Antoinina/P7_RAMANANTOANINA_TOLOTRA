import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/User.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email, password) {
        return this.http.post<User>('http://localhost:3000/api/auth/login', { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    getAuthentifiedUser(){
        return JSON.parse(localStorage.getItem('user')).user;
    }


    register(user) {
        return this.http.post('http://localhost:3000/api/auth/signup', user)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userId', JSON.stringify(user['userId']));
            return user;
        }));
    }

    getAll() {
        return this.http.get<User[]>('http://localhost:3000/api/auth/users');
    }

    getUserById(id: any) {
        return this.http.get<User>(`http://localhost:3000/api/auth/profil/${id}`);
    }

    update(user,userId) {
        const authentifiedUser = this.getAuthentifiedUser();
        return this.http.put(`http://localhost:3000/api/auth/profil/${userId}`, user)
            .pipe(map(updatedUser => {
                // update stored user if the logged in user updated their own record
                const user =  {...authentifiedUser, ...updatedUser};
                localStorage.setItem('user', JSON.stringify({...JSON.parse(localStorage.getItem('user')),user}));
                return user;
            }));
    }

    delete(userId) {
        return this.http.delete(`http://localhost:3000/api/auth/profil/${userId}`)
            .pipe(map(user => {
                // auto logout if the logged in user deleted their own record
               
                    localStorage.removeItem('user');
                    this.userSubject.next(null);
                    this.router.navigate(['/sign']);
               
                return user;
            }));
    }

    deleteUserAdmin(userId) {
        return this.http.delete(`http://localhost:3000/api/auth/profil/${userId}`)
            .pipe(map(user => {
                // auto logout if the logged in user deleted their own record
               
                return user;
            }));
    }
}