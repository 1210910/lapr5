import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { RobotService } from "../services/robot.service";
import {Robotinfo} from "./robot-info/robotinfo";

@Component({
  selector: "app-robot-enable-disable",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <header class="brand-name">
        <nav>
          <ul class="menuItems">
            <li>
              <a [routerLink]="['/robot']">
                <img class="brand-logo" src="/assets/logoRobot.svg" alt="logo" aria-hidden="true">
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </section>
    <section>
      <div class="card-container">
        <div *ngFor="let robot of robots" class="card">
          <div class="card-content">
          <img class="robot-image" src="/assets/robot.png" alt="robot-image" aria-hidden="true">           
            <div class="robot-name">{{ robot.name }}</div>
            <div class="robot-status">Enabled: {{ robot.enabled }}</div>
          </div>
          <div class="card-button">
            <button class="cd-btn main-action" (click)="toggleRobotStatus(robot.code, robot.enabled === true)">
              Toggle Status
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./robotEnableDisable.component.css"]

})

export class RobotEnableDisableComponent implements OnInit{
  robotService: RobotService = inject(RobotService);
  robots: Robotinfo[]=[];
  constructor() {
   
  }

  ngOnInit() {
    this.listRobot();
  }

  public listRobot() {
    this.robotService.listAllRobots()
      .then((robots: Robotinfo[]) => {
        this.robots = robots;
      })
      .catch((error) => {
        console.error("Erro ao listar robôs:", error);
      });
  }
  public toggleRobotStatus(robotCode: string, enable: boolean) {
    this.robotService.toggleRobotStatus(robotCode, enable)
      .then(() => {
        // Atualizar a lista de robôs após a alteração bem-sucedida do status
        location.reload();
        alert("Robot status changed successfully")
      })
      .catch(() => {
        console.error(`Erro ao tentar alterar o status do robô ${robotCode}.`);
      });
  }
}
