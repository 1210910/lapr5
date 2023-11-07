import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {HousingLocationComponent} from "../Building/building-info/housing-location.component";
import {HousingLocation} from "../houselocation";
import {HousingService} from "../housing.service";
import routes from "../routes";

@Component({
  selector: 'app-building-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HousingLocationComponent],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/building']">
                          <img class="brand-logo" src="/assets/logoBuilding(1).svg" alt="logo" aria-hidden="true">
                      </a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="body">
        <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
          </section>
  `,
  styleUrls: ["./buildingCreate.component.css"]

})

export class BuildingListComponent{
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingLocationList = this.housingService.housingLocationList;
    this.filteredLocationList = this.housingLocationList;
  }



}
