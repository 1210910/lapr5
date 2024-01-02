import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RobotService } from "../../services/robot.service";
import { RobotInfo } from "../robot-info/robotinfo";

@Component({
  selector: 'app-robot-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `

      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/robotList']">
              <img class="brand-logo" src="/assets/logoRobot.svg" alt="logo" aria-hidden="true">
            </a></li>
          </ul>
        </nav>
      </header>
      <section>
        <article>

          <section class="listing-description">
            <h2 class="listing-heading">{{robotInfo?.name}}</h2>
          </section>
          <section class="listing-features">
            <h2 class="section-heading">About this Robot</h2>
            <ul>
              <li>Code: {{robotInfo?.code}}</li>
              <li>Type: {{robotInfo?.type}}</li>
              <li>Enabled: {{robotInfo?.enabled}}</li>
              <li>Description: {{robotInfo?.description}}</li>
            </ul>
          </section>
        </article>
      </section>
  `,
  styleUrls: ['./details.component.css']
})
export class RobotDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  robotService = inject(RobotService);
  robotInfo:  RobotInfo| undefined;

  ngOnInit() {
    if (localStorage.getItem("role") !== "Fleet manager") {
      window.location.href = "/";
    }
  }

  constructor() {
    const robotCode = this.route.snapshot.params['code'];
    this.robotInfo = this.robotService.getRobotByCode(robotCode);
  }



}
