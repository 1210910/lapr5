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
                      <li><a [routerLink]="['/home']">
                          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
                      </a></li>
                      <li><a [routerLink]="['/robotCreate']" data-item='Create'>Create</a></li>
                      <li><a [routerLink]="['/robotList']" data-item='List'>List</a></li>
                      <li><a [routerLink]="['/robotDisable']" data-item='Disable'>Disable</a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="cd-intro">
        <div class="cd-intro-content bouncy">
          <h1>Passageway</h1>
          <p>With this feature you can: Create, list and disable robots</p>
        </div>
      </section>
  `,
  styleUrls: ["./robot.component.css"]

})

export class RobotComponent {
  constructor() {}
}
