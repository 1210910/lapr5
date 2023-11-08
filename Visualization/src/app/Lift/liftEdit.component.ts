import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FloorInfoComponent} from "../Floor/floor-info/floor-info.component";
import {HousingLocation} from "../houselocation";
import {HousingService} from "../housing.service";
import routes from "../routes";

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
                    <input type="text" required>
                    <div class="underline"></div>
                    <label for="">Building Code</label>
                  </div>
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
                        <a [routerLink]="['/lift']"><input type="submit" value="submit" (click)="editBuilding()" > </a>
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

export class LiftEditComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingLocationList = this.housingService.housingLocationList;
    this.filteredLocationList = this.housingLocationList;
  }

  editBuilding(){

    const code = document.getElementsByTagName("input")[0].value;
    const name = document.getElementsByTagName("input")[1].value;
    const length = document.getElementsByTagName("input")[2].value;
    const width = document.getElementsByTagName("input")[3].value;
    const description = document.getElementsByTagName("textarea")[0].value;


    if (this.housingService.createBuilding(code , name , length , width , description)){

      alert("Building edited successfully");

    }else {
      alert("Building Creation Failed");
    }




  }

}
