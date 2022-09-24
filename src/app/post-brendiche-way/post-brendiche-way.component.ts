import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'post-brendiche',
  templateUrl: 'post-brendiche-way.component.html',
  styleUrls: ['post-brendiche-way.css']
})
export class PostBrendicheWay {
  @Input() post!: Post;
  @Output() postEvent = new EventEmitter<Post>();


  onClickPost(){
    return this.postEvent.emit(this.post);
  }
}
