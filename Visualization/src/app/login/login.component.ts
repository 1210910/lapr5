import { Component } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [RouterLink],
  templateUrl: "./login.component.html",
  standalone: true,
  styleUrls: ["./login.component.css"]
})

export class LoginComponent {

  constructor(private auth: AuthService) {const redirectUri = window.location.origin;
    console.log(redirectUri);
  }



  signIn() {
    this.auth.loginWithRedirect({
      appState: {
        target: '/home'
      }
    });
  }
}
