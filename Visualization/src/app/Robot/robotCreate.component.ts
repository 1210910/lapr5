import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { RobotService } from "../services/robot.service";

@Component({
  selector: "app-robot-create",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/robot']">
              <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
            </a></li>
          </ul>
        </nav>
      </header>

    </section>
    <section class="body">
      <div class="container">
        <div class="text">
          Insert Data
        </div>
        <form action="#">
          <div class="form-row">
            <div class="input-data">
              <input type="text" required>
              <div class="underline"></div>
              <label for="">Robot Code</label>
            </div>
            <div class="input-data">
              <input type="text" required>
              <div class="underline"></div>
              <label for="">Name</label>
            </div>
          </div>
          <div class="form-row">
            <div class="input-data">
              <input type="text" required>
              <div class="underline"></div>
              <label for="">Type</label>
            </div>

          </div>

          <div class="form-row">
            <div class="input-data textarea">
              <textarea rows="8" cols="80" required></textarea>
              <br />
              <div class="underline"></div>
              <label for="">Description</label>
              <br />
              <div class="form-row submit-btn">
                <div class="input-data">
                  <div class="inner"></div>
                  <a [routerLink]="['/robot']"><input type="submit" value="submit" (click)="createRobot()"> </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  `,
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
    }).catch(() => {
      alert("Robot not created");
    });

  }
}
