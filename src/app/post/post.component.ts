import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../models/post';

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

  onClickPost() {
    this.postEvent.emit(this.post);
  }

  deletePost() {
    this.deletPostEvent.emit(this.post);
  }

  editPost(){
    this.editPostEvent.emit(this.post);
  }

}
