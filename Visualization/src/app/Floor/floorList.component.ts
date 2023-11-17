import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FloorInfoComponent} from "./floor-info/floor-info.component";
import {FloorService} from "../services/floor.service";
import {FloorInfo} from "./floor-info/floorinfo";
import { PassagewayService } from "../services/passageway.service";

@Component({
  selector: 'app-building-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FloorInfoComponent],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/floor']">
                          <img class="brand-logo" src="/assets/logoFloor(2).svg" alt="logo" aria-hidden="true">
                      </a></li>
                    <li>
                      <div class="search-box">
                        <input type="text" class="input-search" placeholder="Building's floors with passageway" #filter>
                        <button class="btn-search" type="button" (click)="CallMethod(filter.value)">
                          <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </li>
                  </ul>
              </nav>
          </header>

      </section>

      <section class="list-container">
        <div class="body">
        <app-floor-info *ngFor="let FloorInfo of floorList" [floorInfo]="FloorInfo"></app-floor-info>
        </div>
      </section>

  `,
  styleUrls: ["./floorCreate.component.css"]

})

export class FloorListComponent{
  floorList: FloorInfo[] = [];
  floorService: FloorService = inject(FloorService);
  passagewayService: PassagewayService = inject(PassagewayService);

  constructor() {
    this.floorService.listFloors().then((result) => {
      this.floorService.floorList(result);
      this.floorList = this.floorService.FloorList;
    });

    this.passagewayService.listPassageways().then((result) => {
        this.passagewayService.passagewayList(result);
      }
    );

  }

  CallMethod(value: string) {
    this.floorService.floorListWithPassagewaysFromABuilding(this.passagewayService.PassagewayList, value);
    this.floorList = this.floorService.FloorList;
  }





}
