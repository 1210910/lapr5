import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";


@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <div class="container" onclick="onclick">
          <div class="top"></div>
          <div class="bottom"></div>
          <div class="center">
              <img class="brand-logo" src="/assets/login.svg" alt="logo" aria-hidden="true">
              <input type="email" placeholder="username" />
              <input type="password" placeholder="password" />
              <button class="btn" (click)="onclick()">Sign In</button>
              <button class="btn" routerLink="/signup">Sign Up</button>
              <h2>&nbsp;</h2>
          </div>
      </div>
  `,
  styleUrls: ["./login.component.css"]
})

export class LoginComponent {

  constructor() {
  }


  onclick() {

    if (document.getElementsByTagName("input")[0].value == "admin" && document.getElementsByTagName("input")[1].value == "admin") {
      alert("Login Successful");
      window.location.href = "/admin";
    }
    if (document.getElementsByTagName("input")[0].value == "campus" && document.getElementsByTagName("input")[1].value == "admin") {
      alert("Login Successful");
      window.location.href = "/home";
    }
    if (document.getElementsByTagName("input")[0].value == "task" && document.getElementsByTagName("input")[1].value == "admin") {
      alert("Login Successful");
      window.location.href = "/taskManager";
    }
    if (document.getElementsByTagName("input")[0].value == "fleet" && document.getElementsByTagName("input")[1].value == "admin") {
      alert("Login Successful");
      window.location.href = "/homeFleet";
    }
    if (document.getElementsByTagName("input")[0].value == "user" && document.getElementsByTagName("input")[1].value == "admin") {
      alert("Login Successful");
      window.location.href = "/homeUser";
    }


  }
}
