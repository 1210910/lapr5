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
                      <li><a [routerLink]="['/home']">
                          <img class="brand-logo" src="/assets/logoLift.svg" alt="logo" aria-hidden="true">
                      </a></li>
                      <li><a [routerLink]="['/liftCreate']" data-item='Create'>Create</a></li>
                      <li><a [routerLink]="['/liftEdit']" data-item='Edit'>Edit</a></li>
                      <li><a [routerLink]="['/liftList']" data-item='List'>List</a></li>

                  </ul>
              </nav>
          </header>

      </section>
      <section class="cd-intro">
        <div class="cd-intro-content bouncy">
          <h1>Lift</h1>
          <p>With this feature you can: Create, edit and list  lift</p>
        </div>
      </section>
  `,
  styleUrls: ["./lift.component.css"]

})

export class LiftComponent {


    constructor() {

    }








}
