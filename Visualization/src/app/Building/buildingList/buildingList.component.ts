import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { BuildingInfoComponent } from "../building-info/building-info.component";
import { BuildingInfo } from "../building-info/buildingInfo";
import routes from "../../routes";
import { BuildingService } from '../../services/building.service';


@Component({
  selector: 'app-building-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BuildingInfoComponent],
  templateUrl: './buildingList.component.html',
  styleUrls: ["./buildingList.component.css"]

})

export class BuildingListComponent implements OnInit {
  buildingListInfo: BuildingInfo[] = [];
  buildingService: BuildingService = inject(BuildingService);

  constructor() {
  }

  ngOnInit() {
    this.buildingService.listAllBuildings().then((result) => {
      console.log("result "+ result)
      this.buildingService.buildingList(result);
      this.buildingListInfo = this.buildingService.buildingListInfo;
    });
  }


  CallMethod(value: string) {
    let params: string = "";
    if (value.startsWith("min:")) {
      let values = value.split(";");
      for (let i = 0; i < values.length; i++) {
        console.log(values[i].split(":")[1])
        params += values[i].split(":")[1] + "/";
      }
    }

    this.buildingService.listBuildings(params).then((result) => {
      this.buildingService.buildingList(result);

      this.buildingListInfo = this.buildingService.buildingListInfo;

    });
  }



}
