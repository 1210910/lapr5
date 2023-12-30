import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-fleet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/']">
              <img class="brand-logo" src="/assets/logoFleet.svg" alt="logo" aria-hidden="true">
            </a></li>
            <li><a [routerLink]="['/fleet']" data-item='Fleet'>Fleet</a></li>
            <li><a [routerLink]="['/robot']" data-item='Robot'>Robot</a></li>
            <li><a [routerLink]="['/robotType']" data-item='RobotType'>RobotType</a></li>
            <li >
              <div class="search-box">
                <button class="btn-search" type="button" ><i class="fa fa-search" aria-hidden="true"></i></button>
                <input type="text" class="input-search" placeholder="Filter by city" #filter   >
              </div>
            </li>
          </ul>
        </nav>
      </header>

    </section>
    <section class="cd-intro">
      <div class="cd-intro-content bouncy">
        <h1>Fleet Management App</h1>
        <p>Manage your fleet with ease</p>
        <div class="action-wrapper">
          <a [routerLink]="['/aboutUs']" class="cd-btn main-action">About Us</a>
          <a href="https://moodle.isep.ipp.pt/pluginfile.php/325421/mod_resource/content/1/LAPR5-regras-gerais-funcionamento.v2.pdf" target="_blank" class="cd-btn">Learn More</a>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeFleetComponent {

  //<app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>


  constructor() {

  }








}
