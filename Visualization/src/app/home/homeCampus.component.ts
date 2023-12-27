import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-campus-home',
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
            <li><a [routerLink]="['/campus']" data-item='Campus'>Campus</a></li>
            <li><a [routerLink]="['/building']" data-item='Buildings'>Buildings</a></li>
            <li><a [routerLink]="['/floor']" data-item='Floors'>Floors</a></li>
            <li><a [routerLink]="['/passageway']" data-item='Passageway'>Passageway</a></li>
            <li><a [routerLink]="['/room']" data-item='Rooms'>Rooms</a></li>
            <li><a [routerLink]="['/lift']" data-item='Lift'>Lift</a></li>
          </ul>
        </nav>
      </header>
    </section>
    
    <section class="cd-intro">
      <div class="cd-intro-content bouncy">
        <h1>Campus Management App</h1>
        <p>Manage your campus with ease</p>
        <div class="action-wrapper">
          <a [routerLink]="['/aboutUs']" class="cd-btn main-action">About Us</a>
          <a href="https://moodle.isep.ipp.pt/pluginfile.php/325421/mod_resource/content/1/LAPR5-regras-gerais-funcionamento.v2.pdf" target="_blank" class="cd-btn">Learn More</a>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.css']
})

export class HomeCampusComponent {
  constructor() {

  }

}
