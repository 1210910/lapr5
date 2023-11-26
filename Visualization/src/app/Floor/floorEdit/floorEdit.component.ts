import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

import {FloorService} from "../../services/floor.service";

@Component({
  selector: 'app-building-edit',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './floorEdit.component.html',
  styleUrls: ["../floorCreate/floorCreate.component.css"]

})

export class FloorEditComponent {

  floorService: FloorService = inject(FloorService);

  constructor() {

  }

  editFloor(){

    const code = document.getElementsByTagName("input")[0].value;
    const floorNumber = Number(document.getElementsByTagName("input")[1].value);
    const length = Number(document.getElementsByTagName("input")[2].value);
    const width = Number(document.getElementsByTagName("input")[3].value);
    const description = document.getElementsByTagName("textarea")[0].value;


    this.floorService.editFloor(code , floorNumber , length , width , description).then(() => {

      alert("Floor edited");

    }).catch(() => {
      alert("Floor edition failed");
    });



  }

}
