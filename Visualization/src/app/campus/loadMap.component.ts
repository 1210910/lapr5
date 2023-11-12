import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FloorInfoComponent} from "../Floor/floor-info/floor-info.component";
import {HousingLocation} from "../houselocation";
import {HousingService} from "../housing.service";
import routes from "../routes";
import {LoaderService} from "../services/loader.service";

@Component({
    selector: 'app-building-create',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
      <section>
          <header class="brand-name">

              <nav>
                  <ul class="menuItems">
                      <li><a [routerLink]="['/campus']">
                          <img class="brand-logo" src="/assets/logoCampus.svg" alt="logo" aria-hidden="true">
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
                          <label for="">FloorCode</label>
                      </div>
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Rooms (Code,positionX,positionY;)</label>
                      </div>
                  </div>
                  <div class="form-row">
                      <div class="input-data">
                          <input type="text" required>
                          <div class="underline"></div>
                          <label for="">Lift(elevatorCode,positionX,positionY;)</label>
                      </div>

                  </div>
                  <div class="form-row">
                      <div class="input-data textarea">
                          <div class="form-row submit-btn">
                              <div class="input-data">
                                  <div class="inner"></div>
                                  <a [routerLink]="['/campus']"><input type="submit" value="submit" (click)="load()" > </a>
                              </div>
                          </div>
                        </div>
                    </div>
              </form>
          </div>
          </section>
  `,
    styleUrls: ["./buildingCreate.component.css"]

})

export class LoadMapComponent{
  loaderService: LoaderService= inject(LoaderService);

    constructor() {

    }

   load(){

        const code = document.getElementsByTagName("input")[0].value;
        const rooms = document.getElementsByTagName("input")[1].value;
        const lift = document.getElementsByTagName("input")[2].value;





       this.loaderService.load(code,rooms,lift).then((result) => {
           alert("Map loaded");
       }).catch((error) => {
           alert("Map not loaded");
       });





   }

}
