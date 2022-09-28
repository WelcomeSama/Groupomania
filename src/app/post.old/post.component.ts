import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/post.service';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  errorMsg!: string;
  userId!: string;
  likePending!: boolean;
  liked!: boolean;

  constructor(
    private postService: PostsService,
    private router: Router) { }

  ngOnInit() {
    this.postService.post$.subscribe((posts) => {
      this.posts = posts;
    });
    this.postService.getPosts();
  }

  onClickPost(id: string) {
    this.router.navigate(['post', id]);
  }

}
