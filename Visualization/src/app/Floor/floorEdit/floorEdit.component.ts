import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

import {FloorService} from "../../services/floor.service";
import {BuildingInfo} from "../../Building/building-info/buildingInfo";
import {FloorInfo} from "../floor-info/floorinfo";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-building-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './floorEdit.component.html',
  styleUrls: ["../floorCreate/floorCreate.component.css"]

})

export class FloorEditComponent {
  floors: FloorInfo[];
  floorService: FloorService = inject(FloorService);
  selectedFloor: any;

  constructor() {
    this.floors = [];
  }

    ngOnInit() {
        this.listFloors();
    }

  editFloor() {

    const code = this.selectedFloor.floorCode;
    const floorNumber = Number(document.getElementsByTagName("input")[1].value);
    const length = Number(document.getElementsByTagName("input")[2].value);
    const width = Number(document.getElementsByTagName("input")[3].value);
    const description = document.getElementsByTagName("textarea")[0].value;


    this.floorService.editFloor(code, floorNumber, length, width, description).then(() => {

      alert("Floor edited");

    }).catch((err) => {
      alert(err);
    });
  }

  public listFloors() {
      this.floorService.listFloors()
          .then((response: any) => {
            const responseJson = JSON.parse(response);
            const floorsArray: FloorInfo[] = responseJson.map((floor: any) => {
              return {
                floorCode: floor.floorCode,
                floorNumber: floor.floorNumber,
                length:floor.length,
                width: floor.width,
                description: floor.description
              };
            });
            this.floors = floorsArray;
          })
          .catch((error) => {
            console.error("Error listing floors", error);
          });
    };


}
