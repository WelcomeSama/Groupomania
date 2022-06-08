import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: [ './nav.css' ]
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  deconnexion() {
    this.router.navigate(['/login'])
  }

  user(){
    this.router.navigate(['/user'])
  }

}
