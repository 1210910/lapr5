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
            <li>From building...
              <div class="search-box">
                <input type="text" class="input-search" placeholder="From building..." #buildingFrom>
              </div>
            </li>
            <li>To building...
              <div class="search-box">
                <input type="text" class="input-search" placeholder="To building..." #buildingTo>
              </div>
            </li>
            <li>Floor...
              <div class="search-box">
                <input type="text" class="input-search" placeholder="Floor..." #floor>
              </div>
            </li>
            <li>Search
              <button class="btn-search" type="button"
                      (click)="CallMethod(buildingFrom.value, buildingTo.value, floor.value)">
                <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              </button>
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

  CallMethod(buildingFrom: string, buildingTo: string, floor: string) {
    if (floor === "" && buildingFrom !== "" && buildingTo !== "") {
      this.passagewayService.listPassageways().then((result) => {
          this.passagewayService.passagewayListBetween2Buldings(result, this.floorService.FloorList, buildingFrom, buildingTo);
          this.passagewayList = this.passagewayService.PassagewayList;
        }
      );
    } else {
      if (floor !== "" && buildingFrom === "" && buildingTo === "") {
        this.passagewayService.listPassageways().then((result) => {
            this.passagewayService.passagewayListFromAFloor(result, floor);
            this.passagewayList = this.passagewayService.PassagewayList;
          }
        );
      } else {
        if (floor === "" && buildingFrom !== "" && buildingTo === "") {
          this.passagewayService.listPassageways().then((result) => {
              this.passagewayService.passagewayListFromABuilding(result, this.floorService.FloorList, buildingFrom);
              this.passagewayList = this.passagewayService.PassagewayList;
            }
          );
        }
      }
    }
  }

}
