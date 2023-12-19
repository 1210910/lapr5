import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-building',
   standalone: true,
    imports: [CommonModule, RouterLink],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/homeFleet']">
                          <img class="brand-logo" src="/assets/logoFleet.svg" alt="logo" aria-hidden="true">
                      </a></li>
                      <li><a [routerLink]="['/getPath']" data-item='Get Path'>Get Path</a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="cd-intro">
        <div class="cd-intro-content bouncy">
          <h1>Campus</h1>
          <p>With this feature you can: Get a robot planed path</p>
        </div>
      </section>
  `,
  styleUrls: ["./building.component.css"]

})

export class FleetComponent {

}
