import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'profil-user',
  templateUrl: './profil.component.html',
  styles: [
  ]
})
export class ProfilComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  deconnexion() {
    this.router.navigate(['/login'])
  }

}
