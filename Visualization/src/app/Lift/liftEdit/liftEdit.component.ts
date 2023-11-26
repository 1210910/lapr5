import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {LiftService} from "../../services/lift.service";


@Component({
  selector: 'app-floor-edit',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './liftEdit.component.html',
  styleUrls: ["../liftCreate/liftCreate.component.css"]

})

export class LiftEditComponent {
  liftService: LiftService = inject(LiftService);

  constructor() {
  }

  editLift(){

    const code = document.getElementsByTagName("input")[0].value;
    const floors = document.getElementsByTagName("input")[1].value;
    const brand = document.getElementsByTagName("input")[2].value;
    const model = document.getElementsByTagName("input")[3].value;
    const serialNumber = document.getElementsByTagName("input")[4].value;
    const description = document.getElementsByTagName("textarea")[0].value;

    const floorsArray = floors!.split(',').map(value => value.trim());


    this.liftService.editLift(code , floorsArray , brand , model, serialNumber, description).then(()=>
    {
      alert("Lift edited successfully");

    }).catch(() => {
      alert("Lift edited Failed");
    });

  }

}
