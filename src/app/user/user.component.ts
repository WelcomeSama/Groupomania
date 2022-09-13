import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {
  @Input() user!: User;
  post!: number;
  comment!: number;
  myId!: number;
  myIsAdmin!: boolean;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  deconnexion() {
    this.router.navigate(['/login'])
  }

  flux() {
    this.router.navigate(['/flux'])
  }


}
