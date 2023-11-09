import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BuildingService } from 'src/app/services/building.service';
import { BuildingInfo } from '../building-info/buildingInfo';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `

      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/buildingList']">
              <img class="brand-logo" src="/assets/logoBuilding(1).svg" alt="logo" aria-hidden="true">
            </a></li>
          </ul>
        </nav>
      </header>
      <section>
    <article>

      <section class="listing-description">
        <h2 class="listing-heading">{{building?.name}}</h2>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this Building</h2>
        <ul>
          <li>Code: {{building?.code}}</li>
          <li>Max length: {{building?.maxLength}}</li>
          <li>Max width: {{building?.maxWidth}}</li>
          <li>Description: {{building?.description}}</li>
        </ul>
      </section>
    </article>
     </section>
  `,
  styleUrls: ['./details.component.css']
})
export class BuildingDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  buildingService = inject(BuildingService);
  building: BuildingInfo | undefined;


  constructor() {
    const buildingCode = this.route.snapshot.params['id'];
    this.building = this.buildingService.getBuildingByCode(buildingCode);
  }



}
