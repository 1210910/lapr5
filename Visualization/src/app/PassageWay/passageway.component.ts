import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {HousingLocationComponent} from "../Floor/floor-info/housing-location.component";
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
                          <img class="brand-logo" src="/assets/logoPassageway.svg" alt="logo" aria-hidden="true">
                      </a></li>
                      <li><a [routerLink]="['/passagewayCreate']" data-item='Create'>Create</a></li>
                      <li><a [routerLink]="['/passagewayEdit']" data-item='Edit'>Edit</a></li>
                      <li><a [routerLink]="['/passagewayList']" data-item='List'>List</a></li>

                  </ul>
              </nav>
          </header>

      </section>
      <section class="cd-intro">
        <div class="cd-intro-content bouncy">
          <h1>Passageway</h1>
          <p>With this feature you can: Create, edit and list  passageway</p>
        </div>
      </section>
  `,
  styleUrls: ["./passageway.component.css"]

})

export class PassagewayComponent {
    housingLocationList: HousingLocation[] = [];
    housingService: HousingService = inject(HousingService);
    filteredLocationList: HousingLocation[] = [];

    constructor() {
        this.housingLocationList = this.housingService.housingLocationList;
        this.filteredLocationList = this.housingLocationList;
    }








}
