import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {LiftService} from "../../services/lift.service";
import {LiftInfo} from "../lift-info/liftinfo";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FloorInfo} from "../../Floor/floor-info/floorinfo";


@Component({
  selector: 'app-floor-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './liftEdit.component.html',
  styleUrls: ["../liftCreate/liftCreate.component.css"]

})

export class LiftEditComponent {
  liftService: LiftService = inject(LiftService);
  selectedLift: any;
  lifts: LiftInfo[];

  constructor() {
    this.lifts = [];
  }

    ngOnInit() {
        this.listLifts();
    }

  editLift(){

    const code = this.selectedLift.code;
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

  public listLifts() {
    this.liftService.listLifts()
        .then((response: any) => {
          const responseJson = JSON.parse(response);
          const liftsArray: LiftInfo[] = responseJson.map((lift: any) => {
            return {
              code: lift.code,
              buildingCode: lift.buildingCode,
              floors: lift.floors,
              brand: lift.brand,
              model: lift.model,
              serialNumber: lift.serialNumber,
              description: lift.description
            };
          });
          this.lifts = liftsArray;
        })
        .catch((error) => {
          console.error("Error listing floors", error);
        });
  };



}
