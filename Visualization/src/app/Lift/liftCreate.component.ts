import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {LiftService} from "../services/lift.service"
@Component({
    selector: 'app-floor-create',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/lift']">
                          <img class="brand-logo" src="/assets/logoLift.svg" alt="logo" aria-hidden="true">
                      </a></li>
                  </ul>
              </nav>
          </header>

      </section>
      <section class="body">
          <div class="container">
              <div class="text">
                  Insert Lift Data
              </div>
              <form action="#">
                  <div class="form-row">
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Lift Code</label>
                      </div>
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Floors(seperated by commas)</label>
                      </div>
                  </div>
                  <div class="form-row">
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Brand</label>
                      </div>
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Model</label>
                      </div>
                  </div>
                  <div class="form-row">
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Building Code</label>
                      </div>
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Serial Number</label>
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
                                  <a [routerLink]="['/lift']"><input type="submit" value="submit" (click)="createLift()" > </a>
                              </div>
                          </div>
                      </div>
                  </div>
              </form>
          </div>
          </section>
  `,
    styleUrls: ["./liftCreate.component.css"]

})

export class LiftCreateComponent {

    liftService: LiftService = inject(LiftService);


    constructor() {

    }

   createLift(){

        const code = document.getElementsByTagName("input")[0].value;
        const floors = document.getElementsByTagName("input")[1].value;
        const brand = document.getElementsByTagName("input")[2].value;
        const model = document.getElementsByTagName("input")[3].value;
        const buildingCode = document.getElementsByTagName("input")[4].value;
        const serialNumber = document.getElementsByTagName("input")[5].value;
        const description = document.getElementsByTagName("textarea")[0].value;

        if (code == "" || floors == "" || buildingCode == "" ){
            alert("Please fill the required options");
            return;
        }
        const floorsArray = floors.split(',').map(value => value.trim());

        this.liftService.createLift(code, floorsArray, brand, model, buildingCode, serialNumber, description).then((result) => {
            alert("Lift Created");

        }).catch((error) => {
            alert("Fail: " + error);
        });

   }

}
