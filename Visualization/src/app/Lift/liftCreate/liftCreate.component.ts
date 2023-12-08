import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {LiftService} from "../../services/lift.service"
@Component({
    selector: 'app-floor-create',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './liftCreate.component.html',
    styleUrls: ["./liftCreate.component.css"]
})

export class LiftCreateComponent {

    liftService: LiftService = inject(LiftService);

    constructor() {
    }

   createLift(){

     const buildingCode = document.getElementsByTagName("input")[0].value;
     const floors = document.getElementsByTagName("input")[1].value;
     const brand = document.getElementsByTagName("input")[2].value;
     const model = document.getElementsByTagName("input")[3].value;
        const serialNumber = document.getElementsByTagName("input")[5].value;
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

}
