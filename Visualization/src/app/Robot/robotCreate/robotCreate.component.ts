import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { RobotService } from "../../services/robot.service";
import { RobotTypeService } from "../../services/robotType.service";
import { FloorInfo } from "../../Floor/floor-info/floorinfo";
import { FormsModule } from "@angular/forms";
import { RobotTypeInfo } from "../../RobotType/robottype-info/robotTypeInfo";

@Component({
  selector: "app-robot-create",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./robotCreate.component.html",
  styleUrls: ["./robotCreate.component.css"]

})

export class RobotCreateComponent {
  robotService: RobotService = inject(RobotService);
  robotTypeService: RobotTypeService = inject(RobotTypeService);
  selectedRobotType: any;
  robotTypes: RobotTypeInfo[];

  constructor() {
    this.robotTypes = [];
  }

  ngOnInit() {
    if (localStorage.getItem("role") !== "Fleet manager") {
      window.location.href = "/";
    } else
      this.listRobotTypes();
  }

  createRobot() {
    const code = document.getElementsByTagName("input")[0].value;
    const name = document.getElementsByTagName("input")[1].value;
    const type = this.selectedRobotType.type;
    const description = document.getElementsByTagName("textarea")[0].value;

    if (code == "" || name == "" || type == "" || description == "") {
      alert("Please fill all the fields");
      return;
    }
    this.robotService.createRobot(code, name, type, description).then(() => {
      alert("Robot created");
    }).catch((error) => {
      alert("Robot not created: " + error);
    });

  }

  public listRobotTypes() {
    this.robotTypeService.listRobotTypes()
      .then((response: any) => {
        const responseJson = JSON.parse(response);
        const robotTypesArray: RobotTypeInfo[] = responseJson.map((robotType: any) => {
          return {
            code: robotType.code,
            brand: robotType.brand,
            model: robotType.model,
            description: robotType.description,
            taskTypeCode: robotType.taskTypeCode
          };
        });
        this.robotTypes = robotTypesArray;
      })
      .catch((error) => {
        console.error("Error listing robotTypes", error);
      });
  };

}
