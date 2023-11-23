import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {RobotInfoComponent} from "../robot-info/robot-info.component";
import {RobotInfo} from "../robot-info/robotinfo";
import {RobotService} from "../../services/robot.service";
import {FloorInfoComponent} from "../../Floor/floor-info/floor-info.component";


@Component({
    selector: 'app-robot-list',
    standalone: true,
  imports: [CommonModule, RouterLink, RobotInfoComponent, FloorInfoComponent],
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
      <section class="list-container">
        <div class="body">
      <section>
        <div class="card-container">
          <div *ngFor="let robot of robotList" class="card">
            <div class="card-content">
            </div>
          </div>
        </div>
      </section>
          <app-robot-info *ngFor="let RobotInfo of robotList" [robotInfo]="RobotInfo"></app-robot-info>
        </div>
      </section>

  `,
    styleUrls: ["../robotCreate/robotCreate.component.css"]

})

export class RobotListComponent {
    robotList: RobotInfo[] = [];
    robotService: RobotService = inject(RobotService);

    constructor() {
    }

    ngOnInit() {
        this.listRobot();
    }

    public listRobot() {
        this.robotService.listAllRobots()
            .then((robots: RobotInfo[]) => {
                this.robotList = robots;
                this.robotService.RobotList = robots;
            })
            .catch((error) => {
                console.error("Erro ao listar robôs:", error);
            });
    }

}
