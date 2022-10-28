import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../models/post';
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
  @Output() editPostEvent = new EventEmitter<Post>();
  @Output() likePostEvent = new EventEmitter<Post>();


  constructor(private authService: AuthService) {
  }

  get isLiked(): boolean {
    return this.post?.likers.some((l) => l === this.authService.getUserId())
  }

  get isOwner(): boolean {
    return this.post.userId === this.authService.getUserId();
  }

  /*  
   || this.authService.getAdmin()

  get isAdmin(): boolean {
      return this.post.userId === this.authService.getAdmin;
    }  */

  onClickPost() {
    this.postEvent.emit(this.post);
  }

  deletePost() {
    this.deletPostEvent.emit(this.post);
  }

  editPost() {
    this.editPostEvent.emit(this.post);
  }

  likePost() {
    const idx = this.post.likers.indexOf(this.authService.getUserId())
    if (idx === -1) {
      this.post.likers.push(this.authService.getUserId())
    } else {
      this.post.likers.splice(idx, 1);
    }
    this.likePostEvent.emit(this.post);
  }

}
