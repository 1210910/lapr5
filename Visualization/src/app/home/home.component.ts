import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { UserService } from "../services/user.service";
import { AuthService } from "@auth0/auth0-angular";

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

  userService: UserService = inject(UserService);
  user: any = {};

  ngOnInit() {
    /*this.authService.idTokenClaims$.subscribe((claims) => {
      if (claims) localStorage.setItem("token", claims.__raw);
      this.userService.user().then((user) => {
        console.log(user);
        this.user = { ...this.user, ...user };
      }).catch((err) => {
        console.log(err);
      });
    });
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });*/
  }

  constructor(private authService: AuthService) { }

}
