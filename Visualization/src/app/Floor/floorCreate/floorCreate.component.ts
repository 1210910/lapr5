import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FloorService } from "../../services/floor.service";
import { BuildingInfo } from "../../Building/building-info/buildingInfo";
import { BuildingService } from "../../services/building.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@Component({
    selector: 'app-building-create',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
    templateUrl: './floorCreate.component.html',
    styleUrls: ["./floorCreate.component.css"]

})

export class FloorCreateComponent {
    buildingService: BuildingService = inject(BuildingService);
    buildings: BuildingInfo[];
    floorService: FloorService = inject(FloorService);
    selectedBuilding: any;


    constructor() {
        this.buildings = [];
    }

  ngOnInit() {
    if (localStorage.getItem("role") !== "Campus manager") {
      window.location.href = "/";
    } else {
      this.listBuildings();
    }
  }

   createFloor(){

     const buildingCode = this.selectedBuilding.code;
     const number = Number(document.getElementsByTagName("input")[1].value);
     const length = Number(document.getElementsByTagName("input")[2].value);
     const width = Number(document.getElementsByTagName("input")[3].value);
     const description = document.getElementsByTagName("textarea")[0].value;
        if (number == null || length == null || width == null || buildingCode == "" || buildingCode == undefined){
            alert("Please fill in all fields");
            return;

        }
     this.floorService.createFloor(number , length , width , description, buildingCode).then((result) => {

       alert("Floor created");

     }).catch((err) => {
       alert(err);
     });

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
    };

}

