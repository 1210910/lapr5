import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { BuildingService } from '../../services/building.service';
import { BuildingInfo } from '../building-info/buildingInfo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-building-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './buildingEdit.component.html',
  styleUrls: ["./buildingEdit.component.css"]

})

export class BuildingEditComponent implements OnInit{
  buildingService: BuildingService = inject(BuildingService);
  buildings: BuildingInfo[];
  selectedBuilding: any;

  constructor() {
    this.buildings = [];
  }

  ngOnInit() {
    this.listBuildings();
  }

  editBuilding() {

    const code = this.selectedBuilding.code;
    const name = document.getElementsByTagName("input")[0].value;
    const description = document.getElementsByTagName("textarea")[0].value;
    const length = Number(document.getElementsByTagName("input")[1].value);
    const width = Number(document.getElementsByTagName("input")[2].value);

    const editedData: any = {};
    if (code !== "") {
      editedData['code'] = code;
    }
    if (name !== "") {
      editedData['name'] = name;
    }
    if (description !== "") {
      editedData['description'] = description;
    }
    if (length !== 0) {
      editedData['maxLength'] = length;
    }
    if (width !== 0) {
      editedData['maxWidth'] = width;
    }
    if (Object.keys(editedData).length > 1) {
      this.buildingService.editBuilding(editedData).then((result) => {
        alert("Building edited");
      }).catch((err) => {
        alert("Building edition failed");
      });
    } else {
      alert("No changes to update");
    }
  }

  public listBuildings() {
    this.buildingService.listAllBuildings()
      .then((response: any) => {
        const responseJson = JSON.parse(response);
        const buildingsArray: BuildingInfo[] = responseJson.map((building: any) => {
          return {
            code: building.code,
            name: building.name,
            description: building.description,
            maxLength: building.maxLength,
            maxWidth: building.maxWidth
          };
        });
        this.buildings = buildingsArray;
      })
      .catch((error) => {
        console.error("Error listing buildings", error);
      });
  }

}
