import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-robot',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/homeFleet']">
                          <img class="brand-logo" src="/assets/logoRobotType.svg" alt="logo" aria-hidden="true">
                      </a></li>
                      <li><a [routerLink]="['/robotTypeCreate']" data-item='Create'>Create</a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="cd-intro">
        <div class="cd-intro-content bouncy">
          <h1>Robot</h1>
          <p>With this feature you can: Create, list and disable robots</p>
        </div>
      </section>
  `,
  styleUrls: ["./robotType.component.css"]

})

export class RobotTypeComponent {

  ngOnInit() {
    if (localStorage.getItem("role") !== "Fleet manager") {
      window.location.href = "/";
    }
  }

  constructor() {}
}
