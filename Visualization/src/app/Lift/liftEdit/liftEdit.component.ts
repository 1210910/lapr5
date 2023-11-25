import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

import routes from "../../routes";
import {LiftService} from "../../services/lift.service";
import {BuildingInfo} from "../../Building/building-info/buildingInfo";


@Component({
  selector: 'app-floor-edit',
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
                  Insert Data
              </div>
              <form action="#">
                <div class="form-row">
                  <div class="input-data">
                    <input type="text" required>
                    <div class="underline"></div>
                    <label for="">Lift Code to edit</label>
                  </div>
                  <div class="input-data">
                    <input type="text" >
                    <div class="underline"></div>
                    <label for="">floors(seperated by commas)</label>
                  </div>
                </div>
                <div class="form-row">
                  <div class="input-data">
                    <input type="text" >
                    <div class="underline"></div>
                    <label for="">brand</label>
                  </div>
                  <div class="input-data">
                    <input type="text" >
                    <div class="underline"></div>
                    <label for="">model</label>
                  </div>
                </div>
                <div class="form-row">
                  <div class="input-data">
                    <input type="text" >
                    <div class="underline"></div>
                    <label for="">Serial Number</label>
                  </div>
                </div>
                <div class="form-row">
                  <div class="input-data textarea">
                    <textarea rows="8" cols="80" ></textarea>
                    <br />
                    <div class="underline"></div>
                    <label for="">Description</label>
                    <br />
                    <div class="form-row submit-btn">
                      <div class="input-data">
                        <div class="inner"></div>
                        <a [routerLink]="['/lift']"><input type="submit" value="submit" (click)="editLift()" > </a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
          </div>
          </section>
  `,
  styleUrls: ["../liftCreate/liftCreate.component.css"]

})

export class LiftEditComponent {
  liftService: LiftService = inject(LiftService);

  constructor() {
  }

  editLift(){

    const code = document.getElementsByTagName("input")[0].value;
    const floors = document.getElementsByTagName("input")[1].value;
    const brand = document.getElementsByTagName("input")[2].value;
    const model = document.getElementsByTagName("input")[3].value;
    const serialNumber = document.getElementsByTagName("input")[4].value;
    const description = document.getElementsByTagName("textarea")[0].value;

    const floorsArray = floors!.split(',').map(value => value.trim());


    this.liftService.editLift(code , floorsArray , brand , model, serialNumber, description).then(()=>
    {
      alert("Lift edited successfully");

    }).catch((error) => {
      alert("Lift edited Failed");
    });

  }

}
