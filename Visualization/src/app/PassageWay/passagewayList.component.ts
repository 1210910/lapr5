import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

import {HousingLocation} from "../houselocation";
import {HousingService} from "../housing.service";
import routes from "../routes";
import {HousingLocationComponent} from "./passageway-info/housing-location.component";

@Component({
  selector: 'app-floor-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HousingLocationComponent],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/passageway']">
                          <img class="brand-logo" src="/assets/logoPassageway.svg" alt="logo" aria-hidden="true">
                      </a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="body">
        <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
          </section>
  `,
  styleUrls: ["./passagewayCreate.component.css"]

})

export class PassagewayListComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingLocationList = this.housingService.housingLocationList;
    this.filteredLocationList = this.housingLocationList;
  }



}
