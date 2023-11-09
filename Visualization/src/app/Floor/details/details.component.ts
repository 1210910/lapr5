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
        <h2 class="listing-heading">{{floorInfo?.floorCode}}</h2>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this Floor</h2>
        <ul>
          <li>Max length: {{floorInfo?.length}}</li>
          <li>Max width: {{floorInfo?.width}}</li>
          <li>Number: {{floorInfo?.floorNumber}}</li>
          <li>Building ID: {{floorInfo?.buildingID}}</li>
          <li>Description: {{floorInfo?.description}}</li>
        </ul>
      </section>
    </article>
     </section>
  `,
  styleUrls: ['./details.component.css']
})
export class FloorDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  floorService = inject(FloorService);
  floorInfo:  FloorInfo| undefined;


  constructor() {
    const floorId = this.route.snapshot.params['id'];
    this.floorInfo = this.floorService.getFloorByCode(floorId);
  }



}
