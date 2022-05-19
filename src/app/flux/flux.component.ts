import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flux',
  templateUrl: './flux.component.html',
  styles: [
  ]
})
export class FluxComponent implements OnInit {

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
