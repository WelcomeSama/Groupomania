import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/post.service';
import { Post, PostList } from '../models/post';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.css']
})
export class PostListComponent implements OnInit {

  posts: PostList[] = [];
  errorMsg!: string;
  userId!: string;
  likePending!: boolean;
  liked!: boolean;

  constructor(
    private postService: PostsService,
    private router: Router) { }

  ngOnInit() {
    this.postService.post$.subscribe((posts) => {
      this.posts = posts.map(post => ({
        post, 
        isEditing: false,
      }));
    });
    this.postService.getPosts();
  }

  handleClickOnPost(post: Post) {
    console.log(post);
  }

  deletePost(post: Post) {
    console.log('delete post');
    this.postService.deletePost(post._id).subscribe((data) => {
      console.log('retrun from delete: ', data);
      this.postService.getPosts();
    })
  }

  switchEditPost(post:Post){
    const postlist = this.posts.find(p => p.post._id === post._id);
    if(postlist){
      postlist.isEditing = true;
    }
  }

}
