import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { LiftService } from '../../services/lift.service';
import { LiftInfo } from '../lift-info/liftinfo';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `

      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/liftList']">
              <img class="brand-logo" src="/assets/logoLift.svg" alt="logo" aria-hidden="true">
            </a></li>
          </ul>
        </nav>
      </header>
      <section>
    <article>

      <section class="listing-description">
        <h2 class="listing-heading">{{liftInfo?.code}}</h2>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this Lift</h2>
        <ul>
          <li>Building Code: {{liftInfo?.buildingCode}}</li>
          <li>Floors: {{liftInfo?.floors}}</li>
          <li>Brand: {{liftInfo?.brand}}</li>
          <li>Model: {{liftInfo?.model}}</li>
          <li>Serial Number: {{liftInfo?.serialNumber}}</li>
          <li>Description: {{liftInfo?.description}}</li>
        </ul>
      </section>
    </article>
     </section>
  `,
  styleUrls: ['./details.component.css']
})
export class LiftDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  liftService = inject(LiftService);
  liftInfo: LiftInfo | undefined;


  constructor() {
    const liftCode = this.route.snapshot.params['id'];
    this.liftInfo = this.liftService.getLiftByCode(liftCode);
  }



}
