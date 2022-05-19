import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styles: [
  ]
})
export class NewPostComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToFlux() {
    this.router.navigate(['/flux']);
  }
}
