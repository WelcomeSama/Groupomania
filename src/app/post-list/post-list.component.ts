import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/post.service';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.css']
})
export class PostListComponent implements OnInit {

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
