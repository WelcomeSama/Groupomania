import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, tap, Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userUrl = 'http://localhost:3000/api/user';
  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
    private router: Router) {
    if (this.authToken !== '') this.isAuth$.next(true);
  }

  httpHeader = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }

  get authToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  createUser(user: User) {
    return this.http.post<User>(this.userUrl + '/signup', user);
  }

  getToken() {
    return this.authToken;
  }

  getUserId(): string {
    return localStorage.getItem('userId') ?? '';
  }

  getUsername(): string {
    return localStorage.getItem('username') ?? '';
  }

  /*   getAdmin() {
      let userId = localStorage.getItem('userId');
  
      return this.http.get(
        'http://localhost:3000/api/user/get-user/' + userId
      ).pipe(
        catchError(error => throwError(() => error.error.message))
      );
    } */




  getMyInfo(): Observable<any> {
    return this.http.get(this.userUrl + `/${sessionStorage.getItem('userId')}`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    })
  }

  getCountOfUser(userId: number): Observable<any> {
    return this.http.get(this.userUrl + `/${userId}` + '/count', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    })
  }


  loginUser(email: string, password: string) {
    let data = this.http.post<{ user: { userId: string, username: string, token: string } }>(this.userUrl + '/login', { email: email, password: password }).pipe(
      tap(({ user }) => {
        console.log(user);
        localStorage.setItem('userId', user.userId);
        localStorage.setItem('username', user.username);
        localStorage.setItem('token', user.token);
        this.isAuth$.next(true);
      })
    );

    return data;
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(this.userUrl + `/${userId}`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    })
  }

  logout() {
    localStorage.setItem('userId', '');
    localStorage.setItem('username', '');
    localStorage.setItem('token', '');
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }
} 
