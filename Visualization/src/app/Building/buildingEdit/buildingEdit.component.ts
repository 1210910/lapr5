import { Component, inject } from '@angular/core';
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

export class BuildingEditComponent {
  buildingService: BuildingService = inject(BuildingService);
  buildings: BuildingInfo[];
  selectedBuilding: any;

  constructor() {
    this.buildings = [];
    this.listbuildings();
  }

  editBuilding() {

    const code = this.selectedBuilding.code;
    const name = document.getElementsByTagName("input")[0].value;
    const description = document.getElementsByTagName("textarea")[0].value;
    const length = Number(document.getElementsByTagName("input")[1].value);
    const width = Number(document.getElementsByTagName("input")[2].value);

    console.log("Lenght" + length)
    console.log("WITH" + width)

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

    if (Object.keys(editedData).length > 0) {
      this.buildingService.editBuilding(editedData).then((result) => {
        alert("Building edited");
        console.log("Resultado : " + result)
      }).catch((err) => {
        alert("Building edition failed");
      });
    } else {
      alert("No changes to update");
    }
  }

  public listbuildings() {
    this.buildingService.listAllBuildings()
      .then((response: any) => {
        const b = JSON.parse(response);
        const buildingsArray: BuildingInfo[] = b.map((building: any) => {
          return {
            code: building.code,
            name: building.name,
            description: building.description,
            maxLength: building.maxLength,
            maxWidth: building.maxWidth
          };
        });
        this.buildings = buildingsArray;
        console.log("TGTTGGTGT")
        console.log(this.buildings)

      })
      .catch((error) => {
        console.error("Error listing buildings: ", error);
      });
  }

}
