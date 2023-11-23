import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FloorInfoComponent} from "../floor-info/floor-info.component";
import {HousingLocation} from "../../houselocation";
import {FloorService} from "../../services/floor.service";
import routes from "../../routes";


@Component({
    selector: 'app-building-create',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './floorCreate.component.html',
    styleUrls: ["./floorCreate.component.css"]

})

export class FloorCreateComponent {

    floorService: FloorService = inject(FloorService);


    constructor() {

    }

   createFloor(){

        const code = document.getElementsByTagName("input")[0].value;
        const name = Number(document.getElementsByTagName("input")[1].value);
        const length = Number(document.getElementsByTagName("input")[2].value);
        const width = Number(document.getElementsByTagName("input")[3].value);
        const description = document.getElementsByTagName("textarea")[0].value;
        const buildingCode = document.getElementsByTagName("input")[4].value;
        if (code == "" || name == null || length == null || width == null || description == ""){
            alert("Please fill in all fields");
            return;

        }
     this.floorService.createFloor(code , name , length , width , description, buildingCode).then((result) => {

       alert("Floor created");

     }).catch((err) => {
       alert("Floor not created");
     });

   }

}
