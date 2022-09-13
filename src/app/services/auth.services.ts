import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userUrl = 'http://localhost:3000/api/user';
  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken = '';

  constructor(private http: HttpClient,
    private router: Router) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
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
    return this.http.post<{ user: { userId: string, token: string } }>(this.userUrl + '/login', { email: email, password: password }).pipe(
      tap(({ user }) => {
        localStorage.setItem('userId', user.userId);
        this.authToken = user.token;
        // TODO 2022-09-13 BGO : let check the isAuth next seems to be buged
        // this.isAuth$.next(true);
      })
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(this.userUrl + `/${userId}`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    })
  }

  logout() {
    this.authToken = '';
    localStorage.setItem('userId', '');
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }
} 
