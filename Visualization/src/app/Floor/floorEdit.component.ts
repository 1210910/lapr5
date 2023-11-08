import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {HousingLocationComponent} from "./floor-info/housing-location.component";
import {HousingLocation} from "../houselocation";
import {HousingService} from "../housing.service";
import routes from "../routes";

@Component({
  selector: 'app-building-edit',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/floor']">
                          <img class="brand-logo" src="/assets/logoFloor(2).svg" alt="logo" aria-hidden="true">
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
                    <label for="">Floor Code to edit</label>
                  </div>
                  <div class="input-data">
                    <input type="text" >
                    <div class="underline"></div>
                    <label for="">Floor Number</label>
                  </div>
                </div>
                <div class="form-row">
                  <div class="input-data">
                    <input type="text" >
                    <div class="underline"></div>
                    <label for="">Length</label>
                  </div>
                  <div class="input-data">
                    <input type="text" >
                    <div class="underline"></div>
                    <label for="">Width</label>
                  </div>
                </div>
                <div class="form-row">
                  <div class="input-data">
                    <input type="text" >
                    <div class="underline"></div>
                    <label for="">Building Code</label>
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
                        <a [routerLink]="['/building']"><input type="submit" value="submit" (click)="editBuilding()" > </a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
          </div>
          </section>
  `,
  styleUrls: ["./floorCreate.component.css"]

})

export class FloorEditComponent {
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
