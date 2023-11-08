import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { HousingService } from '../../housing.service';
import { HousingLocation } from '../../houselocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `

      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/buildingList']">
              <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
            </a></li>
          </ul>
        </nav>
      </header>
      <section>
    <article>

      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this Building</h2>
        <ul>
          <li>Max length: {{housingLocation?.maxLength}}</li>
          <li>Max width: {{housingLocation?.maxWidth}}</li>
          <li>Description: {{housingLocation?.description}}</li>
        </ul>
      </section>
    </article>
     </section>
  `,
  styleUrls: ['./details.component.css']
})
export class BuildingDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;


  constructor() {
    const housingLocationId = this.route.snapshot.params['id'];
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }



}
