import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PassagewayService } from "../../services/passageway.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FloorInfo} from "../../Floor/floor-info/floorinfo";
import {FloorService} from "../../services/floor.service";

@Component({
  selector: "app-passageway-create",
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './passagewayCreate.component.html',
  styleUrls: ["./passagewayCreate.component.css"]

})

export class PassagewayCreateComponent {
  passagewayService: PassagewayService = inject(PassagewayService);
  selectedFloor1: any;
  selectedFloor2: any;
  floors: FloorInfo[];
  floorService: FloorService = inject(FloorService);

  constructor() {
    this.floors = [];
  }

    ngOnInit() {
        this.listFloors();
    }

  createPassageway() {
    const floor1 = this.selectedFloor1.floorCode;
    const floor2 = this.selectedFloor2.floorCode;
    const description = document.getElementsByTagName("textarea")[0].value;

    if (floor1 == "" || floor2 == "") {
      alert("Please fill in all fields");
      return;

    }
    this.passagewayService.createPassageway(floor1, floor2, description).then(() => {

      alert("Passageway created");

    }).catch((error) => {
      alert("Passageway not created: " + error);
    });

  }

  public listFloors() {
    this.floorService.listFloors()
        .then((response: any) => {
          const responseJson = JSON.parse(response);
          const floorsArray: FloorInfo[] = responseJson.map((floor: any) => {
            return {
              floorCode: floor.floorCode,
              floorNumber: floor.floorNumber,
              length:floor.length,
              width: floor.width,
              description: floor.description
            };
          });
          this.floors = floorsArray;
        })
        .catch((error) => {
          console.error("Error listing floors", error);
        });
  };

}
