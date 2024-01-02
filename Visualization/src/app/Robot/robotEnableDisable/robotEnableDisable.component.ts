import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { RobotService } from "../../services/robot.service";
import { RobotInfo } from "../robot-info/robotinfo";

@Component({
  selector: "app-robot-enable-disable",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./robotEnableDisable.component.html",
  styleUrls: ["./robotEnableDisable.component.css"]

})

export class RobotEnableDisableComponent implements OnInit {
  robotService: RobotService = inject(RobotService);
  robots: RobotInfo[] = [];

  constructor() {

  }

  ngOnInit() {
    if (localStorage.getItem("role") !== "Fleet manager") {
      window.location.href = "/";
    } else
      this.robotService.listAllRobots().then((result) => {
        this.robotService.robotList(result);
        this.robots = this.robotService.RobotList;
      });
  }

  public async toggleRobotStatus(robotCode: string, enable: boolean): Promise<void> {
    this.robotService.toggleRobotStatus(robotCode, enable)
      .then(() => {
        // Update robots list
        location.reload();
        alert("Robot status Changed successfully");
      })
      .catch(() => {
        console.error(`Erro ao tentar alterar o status do robô ${robotCode}`);
      });
  }
}
