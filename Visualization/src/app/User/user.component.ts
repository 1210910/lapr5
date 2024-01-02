import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-building",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/homeUser']">
              <img class="brand-logo" src="/assets/logoUser.svg" alt="logo" aria-hidden="true">
            </a></li>
            <li><a [routerLink]="['/dataCopy']" data-item="Data Copy">Data Copy</a></li>
            <li><a [routerLink]="['/editData']" data-item="Edit your Data">Edit Your Data</a></li>
            <li><a [routerLink]="['/deleteAccount']" data-item="Delete Account"> Delete Account</a></li>
          </ul>
        </nav>
      </header>

    </section>
    <section class="cd-intro">
      <div class="cd-intro-content bouncy">
        <h1>User Data</h1>
        <p>With this feature you can: Edit/Rectify your data or ask for a copy of them</p>
      </div>
    </section>
  `,
  styleUrls: ["./user.component.css"]

})

export class UserComponent {

  ngOnInit() {
    if (localStorage.getItem("role") !== "User") {
      window.location.href = "/";
    }
  }

  constructor() {
  }

}
