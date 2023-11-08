import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../houselocation';
import { HousingService } from '../housing.service';
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/']">
              <img class="brand-logo" src="/assets/logoCampus.svg" alt="logo" aria-hidden="true">
            </a></li>
            <li><a [routerLink]="['/']" data-item='Campus'>Campus</a></li>
            <li><a [routerLink]="['/building']" data-item='Buildings'>Buildings</a></li>
            <li><a [routerLink]="['/floor']" data-item='Floors'>Floors</a></li>
            <li><a [routerLink]="['/passageway']" data-item='Passageway'>Passageway</a></li>
            <li><a [routerLink]="['/room']" data-item='Rooms'>Rooms</a></li>
            <li><a [routerLink]="['/lift']" data-item='Lift'>Lift</a></li>
            <li >
              <div class="search-box">
                <button class="btn-search" type="button" (click)="filterResults(filter.value)"><i class="fa fa-search" aria-hidden="true"></i></button>
                <input type="text" class="input-search" placeholder="Filter by city" #filter   >
              </div>
            </li>
          </ul>
        </nav>
      </header>

    </section>
    <section class="cd-intro">
      <div class="cd-intro-content bouncy">
        <h1>Campus Management App</h1>
        <p>Manage your campus with ease</p>
        <div class="action-wrapper">
          <a href="#0" class="cd-btn main-action">About Us</a>
          <a href="https://moodle.isep.ipp.pt/pluginfile.php/325421/mod_resource/content/1/LAPR5-regras-gerais-funcionamento.v2.pdf" target="_blank" class="cd-btn">Learn More</a>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //<app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>

  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingLocationList = this.housingService.housingLocationList;
    this.filteredLocationList = this.housingLocationList;
  }






  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

}
