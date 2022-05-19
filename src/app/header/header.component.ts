import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
<header class="back_midnightblue">
    <div class="center">
      <img src="/assets/img/icon-left-font-monochrome-white.png" alt="testetst">
    </div>
</header>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
