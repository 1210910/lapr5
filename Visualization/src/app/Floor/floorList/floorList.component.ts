import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FloorInfoComponent} from "../floor-info/floor-info.component";
import {FloorService} from "../../services/floor.service";
import {FloorInfo} from "../floor-info/floorinfo";
import { PassagewayService } from "../../services/passageway.service";

@Component({
  selector: 'app-building-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FloorInfoComponent],
  templateUrl: './floorList.component.html',
  styleUrls: ["../floorCreate/floorCreate.component.css"]

})

export class FloorListComponent implements OnInit{
  floorList: FloorInfo[] = [];
  floorService: FloorService = inject(FloorService);
  passagewayService: PassagewayService = inject(PassagewayService);

  constructor() {
  }

  ngOnInit() {
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

  CallMethod1(building: string) {
    this.floorService.listFloors().then((result) => {
      this.floorService.floorListFromABuilding(result, building);
      this.floorList = this.floorService.FloorList;
    });
  }


}
