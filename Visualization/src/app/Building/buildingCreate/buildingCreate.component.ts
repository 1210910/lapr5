import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { BuildingService } from '../../services/building.service';

@Component({
    selector: 'app-building-create',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './buildingCreate.component.html',
    styleUrls: ["./buildingCreate.component.css"]

})

export class BuildingCreateComponent {

    buildingService: BuildingService = inject(BuildingService);

    constructor() {

    }

    public async createBuilding(): Promise<void> {

        const code = document.getElementsByTagName("input")[0].value;
        const name = document.getElementsByTagName("input")[1].value;
        const description = document.getElementsByTagName("textarea")[0].value;
        const length = Number(document.getElementsByTagName("input")[2].value);
        const width = Number(document.getElementsByTagName("input")[3].value);

        if (code == "" || name == "" || length == null || width == null || description == "") {
            alert("Please fill in all fields");
            return;
        }

        this.buildingService.createBuilding(code, name, description, length, width).then((result) => {
            alert("Building Created");

        }).catch((error) => {
            alert("Fail: " + error);
        });
    }
}
