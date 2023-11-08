import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { FloorService } from '../../services/floor.service';
import { FloorInfo } from '../floor-info/floorinfo';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `

      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/floorList']">
              <img class="brand-logo" src="/assets/logoFloor(2).svg" alt="logo" aria-hidden="true">
            </a></li>
          </ul>
        </nav>
      </header>
      <section>
    <article>

      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.floorCode}}</h2>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this Floor</h2>
        <ul>
          <li>Max length: {{housingLocation?.length}}</li>
          <li>Max width: {{housingLocation?.width}}</li>
          <li>Number: {{housingLocation?.floorNumber}}</li>
          <li>Building ID: {{housingLocation?.buildingID}}</li>
          <li>Description: {{housingLocation?.description}}</li>
        </ul>
      </section>
    </article>
     </section>
  `,
  styleUrls: ['./details.component.css']
})
export class FloorDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(FloorService);
  housingLocation:  FloorInfo| undefined;


  constructor() {
    const housingLocationId = this.route.snapshot.params['id'];
    this.housingLocation = this.housingService.getFloorByCode(housingLocationId);
  }



}
