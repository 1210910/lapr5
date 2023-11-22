import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PassagewayService } from "../../services/passageway.service";
import { FloorService } from "../../services/floor.service";
import { PassagewayInfoComponent } from "../passageway-info/passageway-info.component";
import { PassagewayInfo } from "../passageway-info/passagewayinfo";

@Component({
  selector: "app-passageway-list",
  standalone: true,
  imports: [CommonModule, RouterLink, PassagewayInfoComponent],
  templateUrl: './passagewayList.component.html',
  styleUrls: ["../passagewayCreate/passagewayCreate.component.css"]

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
