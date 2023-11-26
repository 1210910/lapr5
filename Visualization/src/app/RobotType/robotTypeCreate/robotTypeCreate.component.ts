import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { RobotTypeService } from "../../services/robotType.service";

@Component({
  selector: "app-robot-create",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './robotTypeCreate.component.html',
  styleUrls: ["./robotTypeCreate.component.css"]

})

export class RobotTypeCreateComponent {
  robotService: RobotTypeService = inject(RobotTypeService);

  constructor() {

  }

  createRobotType() {
    const code = document.getElementsByTagName("input")[0].value;
    const brand = document.getElementsByTagName("input")[1].value;
    const model = document.getElementsByTagName("input")[2].value;
    const taskTypeCode = document.getElementsByTagName("input")[3].value;
    const description = document.getElementsByTagName("textarea")[0].value;

    if (code === "" || brand === "" || model === "" || taskTypeCode === "") {
      alert("Please fill all the fields");
      return;
    }

    this.robotService.createRobotType(code, brand,model,taskTypeCode,description).then(() => {
        alert("Robot type created");
    }).catch(() => {
      alert("Robot type not created");
    });

  }
}
