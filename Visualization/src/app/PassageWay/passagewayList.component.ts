import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PassagewayService } from "../services/passageway.service";
import { FloorService } from "../services/floor.service";
import { PassagewayInfoComponent } from "./passageway-info/passageway-info.component";
import { PassagewayInfo } from "./passageway-info/passagewayinfo";

@Component({
  selector: "app-passageway-list",
  standalone: true,
  imports: [CommonModule, RouterLink, PassagewayInfoComponent],
  template: `
    <section>
      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/passageway']">
              <img class="brand-logo" src="/assets/logoPassageway.svg" alt="logo" aria-hidden="true">
            </a></li>
            <li>
              <div class="search-box">
                <button class="btn-search" type="button" (click)="CallMethod(filter.value)">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
                <input type="text" class="input-search" placeholder="'Building 1'-'Building 2'" #filter>
              </div>
            </li>
          </ul>
        </nav>
      </header>

    </section>
    <section class="body">
      <app-passageway-info *ngFor="let passagewayInfo of passagewayList" [passagewayInfo]="passagewayInfo">
      </app-passageway-info>
    </section>
  `,
  styleUrls: ["./passagewayCreate.component.css"]

})

export class PassagewayListComponent {
  passagewayList: PassagewayInfo[] = [];
  passagewayService: PassagewayService = inject(PassagewayService);
  floorService: FloorService = inject(FloorService);

  constructor() {
    this.passagewayService.listPassageways().then((result) => {
        this.passagewayService.passagewayList(result);
        this.passagewayList = this.passagewayService.PassagewayList;
      }
    );

    this.floorService.listFloors().then((result) => {
        this.floorService.floorList(result);
      }
    );
  }

  CallMethod(value: string) {
    if (value.includes("-")) {
      let values = value.split("-");
      const building1 = values[1];
      const building2 = values[2];

      this.passagewayService.listPassageways().then((result) => {
          this.passagewayService.passagewayListBetween2Buldings(result, this.floorService.FloorList, building1, building2);
          this.passagewayList = this.passagewayService.PassagewayList;
        }
      );
    }
    else {
      if (value.length === 2) {
        this.passagewayService.listPassageways().then((result) => {
            this.passagewayService.passagewayListFromAFloor(result, value);
            this.passagewayList = this.passagewayService.PassagewayList;
          }
        );
      }
      else {
        this.passagewayService.listPassageways().then((result) => {
            this.passagewayService.passagewayListFromABuilding(result, this.floorService.FloorList, value);
            this.passagewayList = this.passagewayService.PassagewayList;
          }
        );
      }
    }
  }

}
