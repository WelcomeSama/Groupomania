import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/post.service';
import { Post } from '../models/post';
import { AuthService } from '../services/auth.services';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.css']
})
export class NewPostComponent implements OnInit {

  postForm!: FormGroup;
  mode!: string;
  post!: Post;
  errorMsg!: string;
  imagePreview!: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private posts: PostsService,
    private auth: AuthService) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        if (!params['id']) {
          this.mode = 'new';
          this.initEmptyForm();
          return EMPTY;
        } else {
          this.mode = 'edit';
          return this.posts.getPostById(params['id'])
        }
      }),
      tap(post => {
        if (post) {
          this.post = post;
          this.initModifyForm(post);
        }
      }),
      catchError(error => this.errorMsg = JSON.stringify(error))
    ).subscribe();

  }


  goToFlux() {
    this.router.navigate(['/flux']);
  }

  initEmptyForm() {
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      image: [null],
    });
  }

  initModifyForm(post: Post) {
    this.postForm = this.formBuilder.group({
      title: [post.title, Validators.required],
      image: [post.imageUrl]
    });
    this.imagePreview = this.post.imageUrl;
  }

  onSubmit() {
    const newPost = new Post();
    newPost.title = this.postForm.get('title')!.value;
    newPost.userId = this.auth.getUserId();
    console.log('new post created', newPost);
    if (this.mode === 'new') {
      this.posts.createPost(newPost, this.postForm.get('image')!.value).pipe(
        tap(({ message }) => {
          //window.location.reload();
        }),
        catchError(error => {
          console.error(error);
          this.errorMsg = error.message;
          return EMPTY;
        })
      ).subscribe();
    } else if (this.mode === 'edit') {
      this.posts.modifyPost(this.post._id, newPost, this.postForm.get('image')!.value).pipe(
        tap(({ message }) => {
          console.log(message);
          this.router.navigate(['/flux']);
        }),
        catchError(error => {
          console.error(error);
          this.errorMsg = error.message;
          return EMPTY;
        })
      ).subscribe();
    }
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

