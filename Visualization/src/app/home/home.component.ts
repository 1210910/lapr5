import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { UserService } from "../services/user.service";
import { AuthService, User } from "@auth0/auth0-angular";

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
  user: any
  role: string = "";

  ngOnInit() {
    this.authService.idTokenClaims$.subscribe((claims) => {
      if (claims) localStorage.setItem("token", claims.__raw);
      this.userService.profile().then((user) => {
        console.log(user);
        // @ts-ignore
        this.role = user.role;
        // @ts-ignore
        this.user = { ...this.user, ...user };
        this.redirect();
      }).catch((err) => {
        console.log(err);
      });
    });
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  constructor(private authService: AuthService) { }

  redirect() {
    switch (this.role) {
      case "Campus manager":
        window.location.href = "/campusManager";
        break;
      case "Admin":
        window.location.href = "/admin";
        break;
      case "User":
        window.location.href = "/homeUser";
        break;
      case "Fleet manager":
        window.location.href = "/homeFleet";
        break;
      case "Task manager":
        window.location.href = "/taskManager";
        break;
      default:
        break;
    }

  }

}
