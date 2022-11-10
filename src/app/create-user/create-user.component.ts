import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  private user = new User();
  userForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private router: Router,
    private userService: AuthService
  ) { }

  ngOnInit(): void {
  }

  validCreate() {
    this.user.username = this.userForm.value.username;
    this.user.email = this.userForm.value.email;
    this.user.password = this.userForm.value.password;

    this.userService.createUser(this.user).subscribe(message => {
      console.log(message);

      this.router.navigate(["/login"])
    });
  }

}
