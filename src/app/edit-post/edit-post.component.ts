import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../services/post.service';
import { Post } from '../models/post';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: 'edit-post.component.html',
  styleUrls: ['edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  @Input() post!: Post;
  @Output() editPostEvent = new EventEmitter<Post>();

  postForm!: FormGroup;
  mode!: string;
  errorMsg!: string;
  imagePreview!: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private posts: PostsService,
  ) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title),
      image: new FormControl(this.post.imageUrl)
    });

  }

  onSubmit() {
    const updatedPost: Post = {
      ...this.post,
      title: this.postForm.get('title')?.value,
      imageUrl: this.postForm.get('image')?.value
    }
    this.editPostEvent.emit(updatedPost);
    window.location.reload();
  }

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.postForm.get('image')!.setValue(file);
    this.postForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
