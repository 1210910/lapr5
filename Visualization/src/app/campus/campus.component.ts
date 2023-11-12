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
                          <img class="brand-logo" src="/assets/logoBuilding(1).svg" alt="logo" aria-hidden="true">
                      </a></li>
                      <li><a [routerLink]="['/loadMap']" data-item='Load Floor Map'>Load Floor Map</a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="cd-intro">
        <div class="cd-intro-content bouncy">
          <h1>Campus</h1>
          <p>With this feature you can: Load floor Map</p>
        </div>
      </section>
  `,
  styleUrls: ["./building.component.css"]

})

export class CampusComponent{

    constructor() {

    }








}
