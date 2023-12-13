import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {LiftService} from "../../services/lift.service"
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BuildingInfo} from "../../Building/building-info/buildingInfo";
import {BuildingService} from "../../services/building.service";
@Component({
    selector: 'app-floor-create',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
    templateUrl: './liftCreate.component.html',
    styleUrls: ["./liftCreate.component.css"]
})

export class LiftCreateComponent {

    liftService: LiftService = inject(LiftService);
    buildingService: BuildingService = inject(BuildingService);
    selectedBuilding: any;
    buildings: BuildingInfo[];

    constructor() {
        this.buildings = [];
    }

    ngOnInit() {
        this.listBuildings();
    }

   createLift(){

        const buildingCode = this.selectedBuilding;
        const floors = document.getElementsByTagName("input")[0].value;
        const brand = document.getElementsByTagName("input")[1].value;
        const model = document.getElementsByTagName("input")[2].value;
        const serialNumber = document.getElementsByTagName("input")[3].value;
        const description = document.getElementsByTagName("textarea")[0].value;

        if (floors == "" || buildingCode == "" ){
            alert("Please fill the required options");
            return;
        }
        const floorsArray = floors.split(',').map(value => value.trim());

        this.liftService.createLift(floorsArray, brand, model, buildingCode, serialNumber, description).then((result) => {
            alert("Lift Created");

        }).catch((error) => {
            alert("Fail: " + error);
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
    }

}
