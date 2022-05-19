import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styles: [
  ]
})
export class CreateUserComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validCreate() {
    this.router.navigate(['/login'])
  }

}
