import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FloorInfoComponent} from "../Floor/floor-info/floor-info.component";
import {HousingLocation} from "../houselocation";
import {HousingService} from "../housing.service";

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
                          <img class="brand-logo" src="/assets/logoRooms.svg" alt="logo" aria-hidden="true">
                      </a></li>
                      <li><a [routerLink]="['/roomCreate']" data-item='Create'>Create</a></li>
                      <li><a [routerLink]="['/roomEdit']" data-item='Edit'>Edit</a></li>
                      <li><a [routerLink]="['/roomList']" data-item='List'>List</a></li>

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
    housingLocationList: HousingLocation[] = [];
    housingService: HousingService = inject(HousingService);
    filteredLocationList: HousingLocation[] = [];

    constructor() {
        this.housingLocationList = this.housingService.housingLocationList;
        this.filteredLocationList = this.housingLocationList;
    }








}
