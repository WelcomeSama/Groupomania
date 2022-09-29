import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { PostsService } from '../services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: 'edit-post.component.html',
  styleUrls: ['edit-post.component.css'],
})
export class EditPostComponent {
  post: Post;
  @Output() postEvent = new EventEmitter<Post>();

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.postService.post$.subscribe((post) => {
      this.post = post;
    });
    this.postService.getPostById(post.id);
  }




}
