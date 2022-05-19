import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.css' ]
})
export class LoginComponent implements OnInit {

  name: string;
  password: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/flux'])
  }

  createUser() {
    this.router.navigate(['/createUser']);
  }

}