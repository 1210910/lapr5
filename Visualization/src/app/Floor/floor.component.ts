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
                      <li><a [routerLink]="['/campusManager']">
                          <img class="brand-logo" src="/assets/logoFloor(2).svg" alt="logo" aria-hidden="true">
                      </a></li>
                      <li><a [routerLink]="['/floorCreate']" data-item='Create'>Create</a></li>
                      <li><a [routerLink]="['/floorEdit']" data-item='Edit'>Edit</a></li>
                      <li><a [routerLink]="['/floorList']" data-item='List'>List</a></li>

                  </ul>
              </nav>
          </header>

      </section>
      <section class="cd-intro">
        <div class="cd-intro-content bouncy">
          <h1>Floor</h1>
          <p>With this feature you can: Create, edit and list  floors</p>
        </div>
      </section>
  `,
  styleUrls: ["./floor.component.css"]

})

export class FloorComponent {


    constructor() {

    }








}
