import { Injectable } from '@angular/core';
import { catchError, mapTo, of, Subject, tap, throwError } from 'rxjs';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.services';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  post$ = new Subject<Post[]>();

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  getPosts() {
    this.http.get<Post[]>('http://localhost:3000/api/post').pipe(
      tap(posts => this.post$.next(posts)
      ),

      catchError(error => {
        console.error(error.error.message);
        return of([]);
      })
    ).subscribe();
  }

  getPostById(id: string) {
    return this.http.get<Post>('http://localhost:3000/api/post/' + id).pipe(
      catchError(error => throwError(() => error.error.message))
    );
  }

  likePost(id: string, like: boolean) {
    return this.http.post<{ message: string }>(
      'http://localhost:3000/api/post/' + id + '/like',
      { userId: this.auth.getUserId(), like: like ? 1 : 0 }
    ).pipe(
      mapTo(like),
      catchError(error => throwError(() => error.error.message))
    );
  }

  createPost(post: Post, image: File) {
    const data = new FormData();
    data.append('userId', post.userId);
    data.append('username', post.username);
    data.append('title', post.title);
    data.append('file', image);
    return this.http.post<{ message: string }>('http://localhost:3000/api/post', data).pipe(
      tap(() => this.getPosts()),
      catchError(error => throwError(() => error.error.message))
    );
  }

  modifyPost(id: string, post: Post, image: string | File) {
    const data = new FormData();
    data.append('userId', post.userId);
    data.append('username', post.username);
    data.append('title', post.title);
    data.append('likers', JSON.stringify(post.likers));
    data.append('file', typeof image === 'object' ? image : '');
    return this.http.put<{ message: string }>('http://localhost:3000/api/post/' + id, data).pipe(
      catchError(error => throwError(() => error.error.message))
    );
  }

  deletePost(id: string) {
    return this.http.delete<{ message: string }>(`http://localhost:3000/api/post/${id}`).pipe(
      catchError(error => throwError(() => error.error.message))
    );
  }
}
