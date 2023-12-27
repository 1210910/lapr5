import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
//import { UserService } from "../services/user.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="cd-intro">
      <div class="cd-intro-content bouncy">
        <h1>Please wait...</h1>
        <p>You're being redirected...</p>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //userService: UserService = inject(UserService);
  user: any = {};

  /*ngOnInit() {
    this.authService.idTokenClaims$.subscribe((claims) => {
      if (claims) localStorage.setItem("token", claims.__raw);
      this.userService.profile().then((profile) => {
        console.log(profile);
        this.user = { ...this.user, ...profile };
      }).catch((err) => {
        console.log(err);
      });
    });
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }*/

  constructor() {

  }

}
