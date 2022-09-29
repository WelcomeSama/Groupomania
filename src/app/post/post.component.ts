import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'post-component',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.css'],
})

export class PostComponent {
  @Input() post!: Post;
  @Output() postEvent = new EventEmitter<Post>();
  @Output() deletPostEvent = new EventEmitter<Post>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }

  onClickPost() {
    this.postEvent.emit(this.post);
  }

  deletePost() {
    this.deletPostEvent.emit(this.post);
  }

  goToEditPost() {
    this.router.navigate(['/editPost']);
  }
}
