import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {LiftInfoComponent} from "./lift-info/lift-info.component";
import {LiftInfo} from "./lift-info/liftinfo";
import {LiftService} from "../services/lift.service";

@Component({
  selector: 'app-floor-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LiftInfoComponent],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/lift']">
                          <img class="brand-logo" src="/assets/logoLift.svg" alt="logo" aria-hidden="true">
                      </a></li>
                    <li>Lift by building
                      <div class="search-box">
                        <input type="text" class="input-search" placeholder="Lift..." #lift>
                        <button class="btn-search" type="button" (click)="CallMethod(lift.value)">
                          <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </li>
                  </ul>
              </nav>
          </header>

        <section class="list-container">
          <div class="body">
            <app-lift-info *ngFor="let LiftInfo of liftList" [liftInfo]="LiftInfo"></app-lift-info>
          </div>
        </section>
      </section>
  `,
  styleUrls: ["./liftCreate.component.css"]

})

export class LiftListComponent {
  liftList: LiftInfo[] = [];
  liftService: LiftService = inject(LiftService);

  constructor() {
    this.liftService.listLifts().then((result) => {
      this.liftService.liftList(result)
      this.liftList = this.liftService.LiftList;
    });
  }

  CallMethod(building: string) {
    this.liftService.listLifts().then((result) => {
      this.liftService.liftListFromABuilding(result, building);
      this.liftList = this.liftService.LiftList;
    });
  }


}
