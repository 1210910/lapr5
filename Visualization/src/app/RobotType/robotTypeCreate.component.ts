import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { RobotTypeService } from "../services/robotType.service";

@Component({
  selector: "app-robot-create",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <header class="brand-name">

        <nav>
          <ul class="menuItems">
            <li><a [routerLink]="['/robotType']">
              <img class="brand-logo" src="/assets/logoRobotType.svg" alt="logo" aria-hidden="true">
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
              <label for="">Robot Type Code</label>
            </div>
            <div class="input-data">
              <input type="text" required>
              <div class="underline"></div>
              <label for="">Brand</label>
            </div>
          </div>
          <div class="form-row">
            <div class="input-data">
              <input type="text" required>
              <div class="underline"></div>
              <label for="">model</label>
            </div>
            <div class="input-data">
              <input type="text" required>
              <div class="underline"></div>
              <label for="">taskTypeCode</label>
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
                  <a [routerLink]="['/robotType']"><input type="submit" value="submit" (click)="createRobotType()"> </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  `,
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

    if (code === "" || brand === "" || model === "" || taskTypeCode === "" || description === "") {
      alert("Please fill all the fields");
      return;
    }

    this.robotService.createRobotType(code, brand,model,taskTypeCode,description).then(() => {
        alert("Robot created");
    }).catch(() => {
      alert("Robot not created");
    });

  }
}
