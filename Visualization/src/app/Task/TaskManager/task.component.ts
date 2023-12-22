import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FloorInfoComponent} from "../../Floor/floor-info/floor-info.component";
import {HousingLocation} from "../../houselocation";
import {HousingService} from "../../housing.service";

@Component({
  selector: 'app-building',
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
                      <li><a [routerLink]="['/actionTask']" data-item='Task Request Actions'>Task Request Actions</a></li>

                      <li><a [routerLink]="['/getAllTask']" data-item='List Task Request'>List Task Request</a></li>
                      <li><a [routerLink]="['/listAllTask']" data-item='List Task'>List Task</a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="cd-intro">
        <div class="cd-intro-content bouncy">
          <h1>Campus</h1>
          <p>With this feature you can: Approve, reject, list tasks and task requests</p>
        </div>
      </section>
  `,
  styleUrls: ["./building.component.css"]

})

export class TaskComponent {

    constructor() {

    }








}
