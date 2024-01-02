import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PassagewayService } from "../../services/passageway.service";
import { FloorInfo } from "../../Floor/floor-info/floorinfo";
import { PassagewayInfo } from "../passageway-info/passagewayinfo";
import { FloorService } from "../../services/floor.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-passageway-edit",
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: "./passagewayEdit.component.html",

  styleUrls: ["../passagewayCreate/passagewayCreate.component.css"]

})

export class PassagewayEditComponent {
  passagewayService: PassagewayService = inject(PassagewayService);
  floorService: FloorService = inject(FloorService);
  selectedPassageway: any;
  selectedFloor1: any;
  selectedFloor2: any;
  passageways: PassagewayInfo[];
  floors: FloorInfo[];


  constructor() {
    this.passageways = [];
    this.floors = [];
  }

  ngOnInit() {
    if (localStorage.getItem("role") !== "Campus manager") {
      window.location.href = "/";
    } else {
      this.listPassageways();
      this.listFloors();
    }
  }

  async editPassageway() {
    const passageCode = this.selectedPassageway.passageCode;
    const floor1 = this.selectedFloor1.floorCode;
    const floor2 = this.selectedFloor2.floorCode;
    const description = document.getElementsByTagName("textarea")[0].value;

    if ((floor1 == "" && floor2 !== "") || (floor1 !== "" && floor2 == "")) {
      alert("Please fill both floors or leave both empty");
      return;
    }

    this.passagewayService.editPassageway(passageCode, floor1, floor2, description).then(() => {
      alert("Passageway edited successfully");
    }).catch((error) => {
      alert("Passageway not edited: " + error);
    });


  }


  public listPassageways() {
    this.passagewayService.listPassageways()
      .then((response: any) => {
        const responseJson = JSON.parse(response);
        const passagewaysArray: PassagewayInfo[] = responseJson.map((passageway: any) => {
          return {
            passageCode: passageway.passageCode,
            floor1: passageway.floor1,
            floor2: passageway.floor2,
            description: passageway.description
          };
        });
        this.passageways = passagewaysArray;
      })
      .catch((error) => {
        console.error("Error listing passageways", error);
      });
  };

  public listFloors() {
    this.floorService.listFloors()
      .then((response: any) => {
        const responseJson = JSON.parse(response);
        const floorsArray: FloorInfo[] = responseJson.map((floor: any) => {
          return {
            floorCode: floor.floorCode,
            floorNumber: floor.floorNumber,
            length: floor.length,
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
