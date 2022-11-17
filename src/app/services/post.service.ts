import { Injectable } from '@angular/core';
import { catchError, mapTo, of, Subject, tap, throwError } from 'rxjs';
import { Post } from '../models/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.services';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  post$ = new Subject<Post[]>();

  constructor(private http: HttpClient,
    private auth: AuthService) {
  }

  getPosts() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.auth.getToken());
    this.http.get<Post[]>('http://localhost:3000/api/post', {
      headers
    }).pipe(
      tap(posts => this.post$.next(posts)
      ),

      catchError(error => {
        console.error(error.error.message);
        return of([]);
      })
    ).subscribe();
  }

  getPostById(id: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.get<Post>('http://localhost:3000/api/post/' + id, { headers }).pipe(
      catchError(error => throwError(() => error.error.message))
    );
  }

  likePost(id: string, like: boolean) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.post<{ message: string }>(
      'http://localhost:3000/api/post/' + id + '/like',
      { userId: this.auth.getUserId(), like: like ? 1 : 0 },
      { headers }
    ).pipe(
      mapTo(like),
      catchError(error => throwError(() => error.error.message))
    );
  }

  createPost(post: Post, image: File) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.auth.getToken());
    const data = new FormData();
    data.append('userId', post.userId);
    data.append('username', post.username);
    data.append('title', post.title);
    data.append('file', image);
    return this.http.post<{ message: string }>('http://localhost:3000/api/post', data, { headers }).pipe(
      tap(() => this.getPosts()),
      catchError(error => throwError(() => error.error.message))
    );
  }

  modifyPost(id: string, post: Post, image: string | File) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.auth.getToken());
    const data = new FormData();
    data.append('userId', post.userId);
    data.append('username', post.username);
    data.append('title', post.title);
    data.append('likers', JSON.stringify(post.likers));
    data.append('file', typeof image === 'object' ? image : '');
    return this.http.put<{ message: string }>('http://localhost:3000/api/post/' + id, data, { headers }).pipe(
      catchError(error => throwError(() => error.error.message))
    );
  }

  deletePost(id: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.auth.getToken());
    return this.http.delete<{ message: string }>(`http://localhost:3000/api/post/${id}`, { headers }).pipe(
      catchError(error => throwError(() => error.error.message))
    );
  }
}
