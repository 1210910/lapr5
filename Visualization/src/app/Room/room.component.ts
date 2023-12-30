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
                          <img class="brand-logo" src="/assets/logoRooms.svg" alt="logo" aria-hidden="true">
                      </a></li>
                      <li><a [routerLink]="['/roomCreate']" data-item='Create'>Create</a></li>

                  </ul>
              </nav>
          </header>

      </section>
      <section class="cd-intro">
        <div class="cd-intro-content bouncy">
          <h1>Room</h1>
          <p>With this feature you can: Create, edit and list  room</p>
        </div>
      </section>
  `,
  styleUrls: ["./room.component.css"]

})

export class RoomComponent {

    constructor() {
    }








}
