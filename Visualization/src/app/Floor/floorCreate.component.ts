import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FloorInfoComponent} from "./floor-info/floor-info.component";
import {HousingLocation} from "../houselocation";
import {FloorService} from "../services/floor.service";
import routes from "../routes";


@Component({
    selector: 'app-building-create',
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
                          <label for="">Floor Code</label>
                      </div>
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Floor Number</label>
                      </div>
                  </div>
                  <div class="form-row">
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Length</label>
                      </div>
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Width</label>
                      </div>
                    </div>
                      <div class="form-row">
                      <div class="input-data">
                        <input type="text" required>
                        <div class="underline"></div>
                        <label for="">Building Code</label>
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
                                  <a [routerLink]="['/floor']"><input type="submit" value="submit" (click)="createFloor()" > </a>
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

export class FloorCreateComponent {

    floorService: FloorService = inject(FloorService);


    constructor() {

    }

   createFloor(){

        const code = document.getElementsByTagName("input")[0].value;
        const name = Number(document.getElementsByTagName("input")[1].value);
        const length = Number(document.getElementsByTagName("input")[2].value);
        const width = Number(document.getElementsByTagName("input")[3].value);
        const description = document.getElementsByTagName("textarea")[0].value;
        const buildingCode = document.getElementsByTagName("input")[4].value;
        if (code == "" || name == null || length == null || width == null || description == ""){
            alert("Please fill in all fields");
            return;

        }
     this.floorService.createFloor(code , name , length , width , description, buildingCode).then((result) => {

       alert("Floor created");

     }).catch((err) => {
       alert("Floor not created");
     });

   }

}
