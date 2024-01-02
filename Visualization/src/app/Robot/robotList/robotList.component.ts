import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { RobotInfoComponent } from "../robot-info/robot-info.component";
import { RobotInfo } from "../robot-info/robotinfo";
import { RobotService } from "../../services/robot.service";
import { FloorInfoComponent } from "../../Floor/floor-info/floor-info.component";


@Component({
  selector: "app-robot-list",
  standalone: true,
  imports: [CommonModule, RouterLink, RobotInfoComponent, FloorInfoComponent],
  templateUrl: "./robotList.component.html",
  styleUrls: ["../robotCreate/robotCreate.component.css"]

})

export class RobotListComponent {
  robotList: RobotInfo[] = [];
  robotService: RobotService = inject(RobotService);

  constructor() {
  }

  ngOnInit() {
    if (localStorage.getItem("role") !== "Fleet manager") {
      window.location.href = "/";
    } else
      this.robotService.listAllRobots().then((result) => {
        this.robotService.robotList(result);
        this.robotList = this.robotService.RobotList;
      });
  }
}
