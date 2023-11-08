import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FloorInfoComponent} from "./floor-info/floor-info.component";
import {HousingLocation} from "../houselocation";
import {HousingService} from "../housing.service";
import routes from "../routes";
import {FloorService} from "../services/floor.service";
import {FloorInfo} from "./floor-info/floorinfo";

@Component({
  selector: 'app-building-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FloorInfoComponent],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/floor']">
                          <img class="brand-logo" src="/assets/logoFloor(2).svg" alt="logo" aria-hidden="true">
                      </a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="body">
        <app-floor-info *ngFor="let FloorInfo of housingLocationList" [housingLocation]="FloorInfo"></app-floor-info>
          </section>
  `,
  styleUrls: ["./floorCreate.component.css"]

})

export class FloorListComponent{
  housingLocationList: FloorInfo[] = [];
  housingService: FloorService = inject(FloorService);

  constructor() {
    this.housingService.listFloors().then((result) => {
      this.housingService.floorList(result);

      this.housingLocationList = this.housingService.FloorList;

    }
    );

  }







}
