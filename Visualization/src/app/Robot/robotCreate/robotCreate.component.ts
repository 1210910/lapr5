import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { RobotService } from "../../services/robot.service";

@Component({
  selector: "app-robot-create",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './robotCreate.component.html',
  styleUrls: ["./robotCreate.component.css"]

})

export class RobotCreateComponent {
  robotService: RobotService = inject(RobotService);

  constructor() {

  }

  createRobot() {
    const code = document.getElementsByTagName("input")[0].value;
    const name = document.getElementsByTagName("input")[1].value;
    const type = document.getElementsByTagName("input")[2].value;
    const description = document.getElementsByTagName("textarea")[0].value;

    if (code == '' || name == '' || type == '' || description == '') {
      alert("Please fill all the fields");
      return;
    }
    this.robotService.createRobot(code, name, type, description).then(() => {
        alert("Robot created");
    }).catch((error) => {
      alert("Robot not created: " + error);
    });

  }
}
