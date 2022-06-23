import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userUrl = 'http://localhost:3000/api/user';
  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken = '';
  private userId = '';

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>(this.userUrl + '/signup', user);
  }

  /*   getToken() {
      return this.authToken;
    }
  
    getUserId() {
      return this.userId;
    }
  
    loginUser(email: string, password: string) {
      return this.http.post<{ userId: string, token: string }>(this.userUrl + '/login', { email: email, password: password }).pipe(
        tap(({ userId, token }) => {
          this.userId = userId;
          this.authToken = token;
          this.isAuth$.next(true);
        })
      );
    }
  
    logout() {
      this.authToken = '';
      this.userId = '';
      this.isAuth$.next(false);
      this.router.navigate(['login']);
    } */
} 
